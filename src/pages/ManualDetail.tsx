import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageLayout from "@/components/PageLayout";
import { ArrowLeft, ChevronRight } from "lucide-react";
import ManualTreeNav from "@/components/ManualTreeNav";
import { useGetManualNodes } from "@/hooks/api/useGetManualNodes";
import { useGetManualDetail } from "@/hooks/api/useGetManualDetail";
import type { ManualEntry } from "@/types/manual";

const renderBlocks = (contentBlocks: unknown) => {
  if (!Array.isArray(contentBlocks)) return null;
  return (contentBlocks as { type?: string; children?: { text?: string }[] }[]).map(
    (block, i) => {
      if (block.type === "paragraph" && Array.isArray(block.children)) {
        return (
          <p key={i} className="mb-2 text-left">
            {block.children.map((child) => child.text).join("")}
          </p>
        );
      }
      return null;
    },
  );
};

const categoryLine = (cat: ManualEntry["largeCategory"]) =>
  cat ? `${cat.code} ${cat.title}` : null;

const ManualBreadcrumb = ({ entry }: { entry: ManualEntry }) => {
  const crumbs: { label: string; to?: string }[] = [{ label: "매뉴얼", to: "/manual" }];
  const large = categoryLine(entry.largeCategory);
  const medium = categoryLine(entry.mediumCategory);
  const small = categoryLine(entry.smallCategory);
  if (large) crumbs.push({ label: large });
  if (medium) crumbs.push({ label: medium });
  if (small) crumbs.push({ label: small });
  if (entry.subCategory?.trim()) crumbs.push({ label: entry.subCategory.trim() });
  crumbs.push({ label: entry.title });

  return (
    <nav aria-label="이동 경로" className="mb-3">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        {crumbs.map((crumb, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={`${i}-${crumb.label}`} className="flex items-center gap-1 min-w-0">
              {i > 0 ? <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50" aria-hidden /> : null}
              {last ? (
                <span className="text-foreground font-medium truncate" title={crumb.label}>
                  {crumb.label}
                </span>
              ) : crumb.to ? (
                <Link to={crumb.to} className="hover:text-foreground shrink-0">
                  {crumb.label}
                </Link>
              ) : (
                <span className="truncate" title={crumb.label}>
                  {crumb.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

const ManualDetail = () => {
  const { documentId } = useParams();
  const navigate = useNavigate();
  const { tree } = useGetManualNodes();
  const { node, loading } = useGetManualDetail(documentId ?? "");

  if (!documentId) {
    return (
      <PageLayout>
        <p>잘못된 경로입니다.</p>
      </PageLayout>
    );
  }

  if (loading || !node) {
    return (
      <PageLayout>
        <p className="text-center text-muted-foreground">불러오는 중…</p>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[280px_1fr] gap-4 mt-4">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-xl">매뉴얼 메뉴</CardTitle>
          </CardHeader>
          <CardContent>
            <ManualTreeNav tree={tree} activeDocumentId={documentId} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Button variant="ghost" className="w-fit mb-2 -ml-2" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4 mr-1" /> 뒤로
            </Button>
            <ManualBreadcrumb entry={node} />
            <div className="flex flex-wrap items-baseline gap-2">
              <CardTitle className="text-xl">{node.title}</CardTitle>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>대분류: {node.largeCategory ? `${node.largeCategory.code} ${node.largeCategory.title}` : "-"}</p>
              <p>중분류: {node.mediumCategory ? `${node.mediumCategory.code} ${node.mediumCategory.title}` : "-"}</p>
              <p>소분류: {node.smallCategory ? `${node.smallCategory.code} ${node.smallCategory.title}` : "-"}</p>
              <p>하위페이지: {node.subCategory || "-"}</p>
            </div>
          </CardHeader>
          <CardContent className="text-left">
            {Array.isArray(node.content) && node.content.length > 0 ? (
              <div className="prose prose-sm max-w-none">{renderBlocks(node.content)}</div>
            ) : (
              <p className="text-sm text-muted-foreground">상세 본문이 비어 있습니다.</p>
            )}
            <div className="mt-6">
              <Button variant="outline" asChild>
                <Link to="/manual">목차로</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default ManualDetail;
