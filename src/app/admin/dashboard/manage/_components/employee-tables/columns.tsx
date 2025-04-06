"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "NAME",
  },
  {
    accessorKey: "email",
    header: "EMAIL",
  },
  {
    accessorKey: "rollnum",
    header: "ROLL NUMBER",
  },
  {
    accessorKey: "year_of_admission",
    header: "YEAR OF ADMISSION",
  },
  {
    accessorKey: "gender",
    header: "GENDER",
  },
  {
    accessorKey: "branch",
    header: "BRANCH",
  },
  {
    accessorKey: "student_type",
    header: "STUDENT TYPE",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
