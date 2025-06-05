import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useGetFAQList } from "@/hooks/api/useGetFAQList";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import PageLayout from "@/components/PageLayout";

const FAQ = () => {
  const { faqList } = useGetFAQList();

  return (
    <PageLayout>
      <Card className="w-full max-w-2xl mx-auto min-h-[400px] flex flex-col justify-center items-center">
        <CardHeader className="w-full text-center">
          <CardTitle className="text-2xl font-bold mb-6 text-center">FAQ</CardTitle>
        </CardHeader>
        <CardContent className="w-full flex flex-col items-center justify-center text-center grow h-full">
          <div className="w-[80%] max-w-lg mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqList.map((item) => (
                <AccordionItem value={String(item.id)} key={item.id}>
                  <AccordionTrigger className="text-center w-full justify-center">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-center w-full justify-center">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default FAQ;
