import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ChevronLeft, ChevronRight, List } from "lucide-react";
import { useGetNoticeDetail } from "@/hooks/api/useGetNoticeDetail";
import { useGetNotices } from "@/hooks/api/useGetNotices";
import PageLayout from "@/components/PageLayout";

const NoticeDetail = () => {
  const { documentId } = useParams();
  const navigate = useNavigate();

  // TODO: id가 없으면 NotFoundPage로 이동
  useEffect(() => {
    if (!documentId) {
      <div>Not Found</div>;
    }
  }, [documentId, navigate]);

  const { notice } = useGetNoticeDetail(documentId ?? "");
  const { notices } = useGetNotices();

  if (!notice) return <div>로딩중...</div>;
  const data = notice;

  // 현재 글의 인덱스 찾기 (documentId 기준)
  const idx = notices.findIndex((n) => n.documentId === documentId);
  const prev = idx > 0 ? notices[idx - 1] : null;
  const next = idx < notices.length - 1 ? notices[idx + 1] : null;

  // content blocks를 단순 텍스트로 변환
  const renderContent = (contentBlocks: any[]) => {
    if (!Array.isArray(contentBlocks)) return null;
    return contentBlocks.map((block, i) => {
      if (block.type === "paragraph" && Array.isArray(block.children)) {
        return (
          <p key={i} className="mb-2">
            {block.children.map((child: any) => child.text).join("")}
          </p>
        );
      }
      // 다른 block 타입이 있다면 추가 처리
      return null;
    });
  };

  return (
    <PageLayout>
      <Card className="w-full max-w-2xl mx-auto min-h-[400px] flex flex-col justify-center items-center">
        <CardHeader className="w-full text-center">
          <CardTitle className="text-2xl font-bold mb-6 text-center">공지 상세</CardTitle>
        </CardHeader>
        <CardContent className="w-full flex flex-col items-center justify-center text-center grow h-full">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center gap-2 mx-auto justify-center"
          >
            <ArrowLeft className="w-4 h-4" /> 뒤로가기
          </Button>
          <div className="w-[80%] max-w-lg mx-auto">
            <Card className="w-full flex flex-col items-center">
              <CardHeader className="w-full text-center flex flex-col items-center justify-center">
                <CardTitle className="text-xl text-center">{data.title}</CardTitle>
                <div className="text-sm text-gray-400 text-center">{data.createdAt}</div>
              </CardHeader>
              <CardContent className="w-full text-center flex flex-col items-center justify-center">
                <div className="py-4 w-full text-center">
                  {Array.isArray(data.content) ? (
                    renderContent(data.content)
                  ) : (
                    <p>{data.content}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="flex justify-between mt-8 gap-2 w-full">
            <Button
              variant="outline"
              onClick={() => prev && navigate(`/notice/${prev.documentId}`)}
              disabled={!prev}
              className="flex items-center gap-1 justify-center"
            >
              <ChevronLeft className="w-4 h-4" /> 이전 글
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/notice")}
              className="flex items-center gap-1 justify-center"
            >
              <List className="w-4 h-4" /> 목록
            </Button>
            <Button
              variant="outline"
              onClick={() => next && navigate(`/notice/${next.documentId}`)}
              disabled={!next}
              className="flex items-center gap-1 justify-center"
            >
              다음 글 <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default NoticeDetail;
