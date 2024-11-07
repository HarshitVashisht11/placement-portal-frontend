"use client";
import { Product } from "@/constants/data";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Company Name",
  },
  {
    accessorKey: "linkedIn",
    header: "linkedIn",
  },
  {
    accessorKey: "website",
    header: "Website",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
