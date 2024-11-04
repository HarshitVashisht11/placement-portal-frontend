import PageContainer from "@/components/layout/page-container";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { searchParamsCache } from "@/lib/searchparams";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import EmployeeTable from "./employee-tables";
import { api } from "@/lib/api";

type TEmployeeListingPage = {};

export default async function EmployeeListingPage({}: TEmployeeListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get("page");
  const search = searchParamsCache.get("q");
  const branch = searchParamsCache.get("branch");
  const gender = searchParamsCache.get("gender");
  const pageLimit = searchParamsCache.get("limit");

  console.log("BRANCH", branch);

  let data;
  try {
    const base = "/admin/user";
    let url = base;
    if (page > 1) {
      if (url === base) {
        url += "?page=" + page;
      } else {
        url += "&page=" + page;
      }
    }

    if (gender) {
      let genderArgs = gender.split(".").join(",");
      if (url === base) {
        url += "?gender=" + genderArgs;
      } else {
        url += "&gender=" + genderArgs;
      }
    }

    if (branch) {
      let branchArgs = branch.split(".").join(",");
      if (url === base) {
        url += "?branch=" + branchArgs;
      } else {
        url += "&branch=" + branchArgs;
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
  // const data = await fakeUsers.getUsers(filters);
  // const getStudentsData = async () => {
  // };

  if (data == undefined) return null;

  const totalUsers = data.data.total_users ? data.data.total_users : 0;
  const employee: User[] = data.data.users ? data.data.users : [];

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Students (${totalUsers})`}
            description="Manage students (Server side table functionalities.)"
          />

          <Link
            href={"/admin/dashboard/employee/new"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        <EmployeeTable data={employee} totalData={totalUsers} />
      </div>
    </PageContainer>
  );
}
