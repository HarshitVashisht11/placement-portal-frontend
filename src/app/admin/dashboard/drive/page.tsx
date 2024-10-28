import { SearchParams } from "nuqs/parsers";
import PostNewDrive from "./_components/post";
// import ProfileViewPage from './_components/profile-view-page';

type pageProps = {
  searchParams: SearchParams;
};

export const metadata = {
  title: "Dashboard : Post a new Drive",
};

export default async function Page({ searchParams }: pageProps) {
  return <PostNewDrive />;
}
