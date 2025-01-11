import { SearchParams } from "nuqs/parsers";

import PageContainer from "@/components/layout/page-container";
import ManageRolesPage from "./_components/ManageRoles";
import { searchParamsCache } from "@/lib/searchparams";
// import ProfileViewPage from './_components/profile-view-page';

type pageProps = {
  searchParams: SearchParams;
};

export const metadata = {
  title: "Dashboard : Post a new Drive",
};

export default async function Page({ searchParams }: pageProps) {
  searchParamsCache.parse(searchParams);
  return (
    <PageContainer scrollable>
      <ManageRolesPage />
    </PageContainer>
  );
}
