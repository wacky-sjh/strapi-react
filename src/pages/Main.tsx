import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import PageLayout from "@/components/PageLayout";

const Main = () => (
  <PageLayout>
    <Card className="w-full max-w-2xl mx-auto p-4 md:p-8 mt-4 flex flex-col items-center">
      <CardHeader className="w-full text-center">
        <CardTitle className="text-3xl font-bold text-center">메인 페이지</CardTitle>
      </CardHeader>
      <CardContent className="w-full flex flex-col items-center justify-center text-center">
        <p className="text-lg text-gray-700 text-center mb-6 w-full">여기는 메인 페이지입니다.</p>
      </CardContent>
    </Card>
  </PageLayout>
);
export default Main;
