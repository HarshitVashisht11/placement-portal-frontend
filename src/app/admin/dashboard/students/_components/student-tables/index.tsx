"use client";

import { DataTable } from "@/components/ui/table/data-table";
import { DataTableFilterBox } from "@/components/ui/table/data-table-filter-box";
import { DataTableResetFilter } from "@/components/ui/table/data-table-reset-filter";
import { DataTableSearch } from "@/components/ui/table/data-table-search";
import { columns } from "./columns";
import {
  BRANCH_OPTIONS,
  GENDER_OPTIONS,
  ROLE_OPTIONS,
  useStudentTableFilters,
} from "./use-student-table-filters";

export default function StudentTable({
  data,
  totalData,
}: {
  data: User[];
  totalData: number;
}) {
  const {
    genderFilter,
    setGenderFilter,
    branchFiter,
    setBranchFilter,
    roleFiter,
    setRoleFilter,
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    setPage,
    setSearchQuery,
  } = useStudentTableFilters();

  return (
    <div className="space-y-4 ">
      <div className="flex flex-wrap items-center gap-4">
        <DataTableSearch
          searchKey="name"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setPage={setPage}
        />
        <DataTableFilterBox
          filterKey="gender"
          title="Gender"
          options={GENDER_OPTIONS}
          setFilterValue={setGenderFilter}
          filterValue={genderFilter}
        />
        <DataTableFilterBox
          filterKey="branch"
          title="Branch"
          options={BRANCH_OPTIONS}
          setFilterValue={setBranchFilter}
          filterValue={branchFiter}
        />
        <DataTableFilterBox
          filterKey="role"
          title="Student Role"
          options={ROLE_OPTIONS}
          setFilterValue={setRoleFilter}
          filterValue={roleFiter}
        />
        <DataTableResetFilter
          isFilterActive={isAnyFilterActive}
          onReset={resetFilters}
        />
      </div>
      <DataTable columns={columns} data={data} totalItems={totalData} />
    </div>
  );
}
