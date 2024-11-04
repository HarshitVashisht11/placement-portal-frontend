"use client";
import { Product } from "@/constants/data";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Company Name",
  },
  {
    accessorKey: "hrName",
    header: "HR Name",
  },
  {
    accessorKey: "contactEmail",
    header: "Email",
  },
  {
    accessorKey: "contactNumber",
    header: "Number",
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
