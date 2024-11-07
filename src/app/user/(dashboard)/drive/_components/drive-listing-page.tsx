import { fakeProducts } from "@/constants/mock-api";
import { searchParamsCache } from "@/lib/searchparams";
import { DataTable } from "@/components/ui/table/data-table";
import { api } from "@/lib/api";
import { columns } from "./columns";

type DriveListingPage = {};

export default async function DriveListingPage({}: DriveListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get("page");
  const search = searchParamsCache.get("q");
  const pageLimit = searchParamsCache.get("limit");

  // const filters = {
  //   page,
  //   limit: pageLimit,
  //   ...(search && { search }),
  //   ...(categories && { categories: categories }),
  // };

  let data;
  try {
    const base = "/user/drive";
    let url = base;
    if (page > 1) {
      if (url === base) {
        url += "?page=" + page;
      } else {
        url += "&page=" + page;
      }
    }

    if (search) {
      if (url === base) {
        url += "?q=" + search;
      } else {
        url += "&q=" + search;
      }
    }

    data = await api.get(url);
  } catch (error) {
    console.log(error);
  }

  if (data == undefined) return null;
  console.log(data.data);
  // const data = await fakeProducts.getProducts(filters);
  const totalProducts = data.data.total_drives ? data.data.total_drives : 0;
  const products: Drive[] = data.data.drives ? data.data.drives : [];

  return (
    <DataTable columns={columns} data={products} totalItems={totalProducts} />
  );
}
