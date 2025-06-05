import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useGetNotices } from "@/hooks/api/useGetNotices";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import PageLayout from "@/components/PageLayout";

const Notices = () => {
  const { notices } = useGetNotices();
  const navigate = useNavigate();

  return (
    <PageLayout>
      <Card className="w-full max-w-2xl mx-auto min-h-[400px] flex flex-col justify-center items-center">
        <CardHeader className="w-full text-center">
          <CardTitle className="text-2xl font-bold mb-6 text-center">뉴스/공지사항</CardTitle>
        </CardHeader>
        <CardContent className="w-full flex flex-col items-center justify-center text-center grow h-full">
          <div className="w-[80%] max-w-lg mx-auto">
            <Table className="w-full text-center">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16 text-center">번호</TableHead>
                  <TableHead className="text-center">제목</TableHead>
                  <TableHead className="w-32 text-right">날짜</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {notices.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-center">{item.id}</TableCell>
                    <TableCell
                      className="text-blue-600 cursor-pointer hover:underline text-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/notice/${item.documentId}`);
                      }}
                    >
                      {item.title}
                    </TableCell>
                    <TableCell className="text-right">{item.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default Notices;
