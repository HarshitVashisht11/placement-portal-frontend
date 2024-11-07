"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<Drive>[] = [
  {
    accessorKey: "name",
    header: "Company Name",
  },
  {
    accessorKey: "drive_date",
    header: "Date of Drive",
  },
  {
    accessorKey: "deadline",
    header: "Last Date to Apply",
  },
  {
    accessorKey: "location",
    header: "Job Location",
  },
  {
    accessorKey: "min_cgpa",
    header: "Minimum CGPA",
  },
  {
    accessorKey: "drive_duration",
    header: "Time of Drive",
  },
  {
    accessorKey: "roles",
    header: "Roles",
    cell: ({ value }: any) => {
      return value.map((role: Role) => role.title).join(", ");
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
