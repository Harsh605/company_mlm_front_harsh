import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { adminLists, usersList } from "@/DummyData/Admin/Lists";
import CustomImage from "@/components/CustomImage";
import { dateFormater } from "@/lib/helper";
import { useTranslation } from "react-i18next";
import { Switch } from "@/components/ui/switch";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Navigate, useNavigate } from "react-router-dom";

//userList Columns
export const sendDocumentsColumns = ({ t, navigate }) => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
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
    accessorKey: "documentName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Document Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("documentName")}</div>,
  },
  {
    accessorKey: "documentLink",
    header: "Document Link",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("documentLink")}</div>
    ),
  },
  {
    accessorKey: "files",
    header: "Files",
    cell: ({ row }) => (
      <div className="capitalize">
        <Button variant="outline">
          <i className="fas fa-download"></i>
        </Button>
      </div>
    ),
  },
  {
    accessorKey: "remark",
    header: "Remark",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("remark")?.slice(0, 12)}...
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div
        className=""
        style={{
          color:
            row.getValue("status") === 1
              ? "green"
              : row.getValue("status") === 2
              ? "red"
              : "",
        }}
      >
        {row.getValue("status") === 0
          ? "Pending"
          : row.getValue("status") === 1
          ? "Success"
          : "Rejected"}
      </div>
    ),
  },

  {
    accessorKey: "created_at",
    header: t("Sent At"),
    cell: ({ row }) => {
      const applied_date = row.original.created_at;
      return dateFormater(applied_date);
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate(`/admin/myTeam/${row.original.userId}`)}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(`/admin/allTeam`)}>
              All Team
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate(`/admin/kyc/${row.original.userId}`)}
            >
              Kyc
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const receivedDocumentsColumns = ({ t, navigate }) => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
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
    accessorKey: "documentName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Document Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("documentName")}</div>,
  },
  {
    accessorKey: "documentLink",
    header: "Document Link",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("documentLink")}</div>
    ),
  },
  {
    accessorKey: "files",
    header: "Files",
    cell: ({ row }) => (
      <div className="capitalize">
        <Button variant="outline">
          <i className="fas fa-download"></i>
        </Button>
      </div>
    ),
  },
  {
    accessorKey: "remark",
    header: "Remark",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("remark")?.slice(0, 12)}...
      </div>
    ),
  },

  {
    accessorKey: "userName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Sender
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="">
        {row.getValue("userName")}{" "}
        {row.getValue("userId") && row.getValue("userId")}
      </div>
    ),
  },

  {
    accessorKey: "sentAt",
    header: t("Sent At"),
    cell: ({ row }) => {
      const applied_date = row.original.sentAt;
      return dateFormater(applied_date);
    },
  },
];
