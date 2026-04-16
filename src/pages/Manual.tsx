import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageLayout from "@/components/PageLayout";
import ManualTreeNav from "@/components/ManualTreeNav";
import { useGetManualNodes } from "@/hooks/api/useGetManualNodes";

const Manual = () => {
  const { tree, loading, error } = useGetManualNodes();
  return (
    <PageLayout>
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[280px_1fr] gap-4 mt-4">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-xl">매뉴얼 메뉴</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? <p className="text-sm text-muted-foreground">불러오는 중…</p> : null}
            {error ? <p className="text-sm text-destructive">API 오류가 발생했습니다.</p> : null}
            {!loading && !error ? <ManualTreeNav tree={tree} /> : null}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">매뉴얼 문서</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            좌측 사이드바에서 최하위 상세 문서를 선택하면 내용을 볼 수 있습니다.
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Manual;
