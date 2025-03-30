import { SearchParams } from "nuqs/parsers";
import { DrivePostPage } from "../_components/DrivePostPage";
import PageContainer from "@/components/layout/page-container";

type pageProps = {
  searchParams: SearchParams;
};

export const metadata = {
  title: "Dashboard : Post a new Drive",
};

export default async function Page({ searchParams }: pageProps) {
  return (
    <PageContainer scrollable>
      <DrivePostPage />
    </PageContainer>
  );
}
