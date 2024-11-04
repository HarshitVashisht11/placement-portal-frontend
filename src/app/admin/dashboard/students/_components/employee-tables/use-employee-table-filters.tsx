"use client";

import { searchParams } from "@/lib/searchparams";
import { useQueryState } from "nuqs";
import { useCallback, useMemo } from "react";

export const GENDER_OPTIONS = [
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
  { value: "OTHERS", label: "Others" },
];

export const BRANCH_OPTIONS = [
  { value: "Computer Science and Engineering", label: "CSE" },
  { value: "Electronics and Communication Engineering", label: "ECE" },
  { value: "Mechanical Engineering", label: "MECH" },
  { value: "Civil Engineering", label: "CIV" },
];

export const COUNTRY_OPTIONS = [
  { value: "USA", label: "USA" },
  { value: "INDIA", label: "INDIA" },
];

export function useEmployeeTableFilters() {
  const [searchQuery, setSearchQuery] = useQueryState(
    "q",
    searchParams.q
      .withOptions({ shallow: false, throttleMs: 1000 })
      .withDefault("")
  );

  const [genderFilter, setGenderFilter] = useQueryState(
    "gender",
    searchParams.gender.withOptions({ shallow: false }).withDefault("")
  );

  const [branchFiter, setBranchFilter] = useQueryState(
    "branch",
    searchParams.branch.withOptions({ shallow: false }).withDefault("")
  );

  const [page, setPage] = useQueryState(
    "page",
    searchParams.page.withDefault(1)
  );

  const resetFilters = useCallback(() => {
    setSearchQuery(null);
    setGenderFilter(null);
    setBranchFilter(null);

    setPage(1);
  }, [setSearchQuery, setGenderFilter, setBranchFilter, setPage]);

  const isAnyFilterActive = useMemo(() => {
    return !!searchQuery || !!genderFilter || !!branchFiter;
  }, [searchQuery, genderFilter, branchFiter]);

  return {
    searchQuery,
    setSearchQuery,
    genderFilter,
    setGenderFilter,
    branchFiter,
    setBranchFilter,
    page,
    setPage,
    resetFilters,
    isAnyFilterActive,
  };
}
