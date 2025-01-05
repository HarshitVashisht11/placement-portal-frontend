"use client";

import { fakeProducts } from "@/constants/mock-api";
import { searchParamsCache } from "@/lib/searchparams";
import { DataTable } from "@/components/ui/table/data-table";
import { api, auth_api } from "@/lib/api";
import { columns } from "./columns";
import { useEffect, useState } from "react";

type DriveListingPage = {};

export default function DriveListingPage({}: DriveListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  const [drives, setDrives] = useState<Drive[]>();
  const [totalDrives, setTotalDrives] = useState();

  // const filters = {
  //   page,
  //   limit: pageLimit,
  //   ...(search && { search }),
  //   ...(categories && { categories: categories }),
  // };
  useEffect(() => {
    async function GetDrives() {
      let data;
      try {
        const base = "/user/drive";
        let url = base;
        // if (page > 1) {
        //   if (url === base) {
        //     url += "?page=" + page;
        //   } else {
        //     url += "&page=" + page;
        //   }
        // }

        // if (search) {
        //   if (url === base) {
        //     url += "?q=" + search;
        //   } else {
        //     url += "&q=" + search;
        //   }
        // }

        data = await auth_api.get(url);
        if (data == undefined) return null;
        console.log(data.data);
        // const data = await fakeProducts.getProducts(filters);
        const totalDrives = data.data.total_drives ? data.data.total_drives : 0;

        setTotalDrives(totalDrives);
        const products: Drive[] = data.data.drives ? data.data.drives : [];
        setDrives(products);
      } catch (error) {
        console.log(error);
      }
    }

    GetDrives();
  }, []);

  if (!drives) return <DataTable columns={columns} data={[]} totalItems={0} />;

  return (
    <DataTable columns={columns} data={drives} totalItems={totalDrives || 0} />
  );
}
