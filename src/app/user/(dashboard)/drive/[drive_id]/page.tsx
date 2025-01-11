import PageContainer from "@/components/layout/page-container";
import { searchParamsCache, serialize } from "@/lib/searchparams";
import { SearchParams } from "nuqs/parsers";
import DrivePage from "../_components/view-drive";

export const metadata = {
  title: "View Placement Drive",
};

type pageProps = {
  searchParams: SearchParams;
};

export default async function Page({ searchParams }: pageProps) {
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams);

  // This key is used for invoke suspense if any of the search params changed (used for filters).
  const key = serialize({ ...searchParams });

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <DrivePage />
      </div>
    </PageContainer>
  );
}
