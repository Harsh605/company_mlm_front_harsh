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
export const userListColumns = ({ t, navigate }) => [
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
    accessorKey: "photo",
    header: "User Photo",
    cell: ({ row }) => {
      const user_photo = row?.original?.photo;
      return (
        <div className="h-[50px] w-[50px] overflow-hidden rounded-[8px]">
          <CustomImage
            imageUrl={user_photo ? user_photo : "/images/profile-pic.jpeg"}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "userId",
    header: "User Id",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("userId")}</div>
    ),
  },
  {
    accessorKey: "referBy",
    header: "Refer By",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("referBy")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("email")}</div>,
  },

  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Phone
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("phone")}</div>,
  },
  {
    accessorKey: "myReferral",
    header: t("My Referral"),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("myReferral")}</div>
    ),
  },
  {
    accessorKey: "myTeam",
    header: t("My Team"),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("myTeam")}</div>
    ),
  },
  {
    accessorKey: "totalTeam",
    header: "Total Team",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("totalTeam")}</div>
    ),
  },
  {
    accessorKey: "wallet",
    header: () => <div className="text-right">Wallet</div>,
    cell: ({ row }) => {
      const wallet = parseFloat(row.getValue("wallet"));

      // Format the wallet as a dollar wallet
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
      }).format(wallet);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: t("Status"),
    cell: ({ row }) => {
      const status = row.original.status;

      return (
        <Switch
          checked={status == 1 ? true : false}
          //   onCheckedChange={(value) => handleStatusChange(row.original.id, 1)}
        />
      );
    },
  },
  {
    accessorKey: "kycStatus",
    header: t("Kyc Status"),
    cell: ({ row }) => {
      const status = row.original.kycStatus;

      return (
        <Switch
          checked={status == 1 ? true : false}
          //   onCheckedChange={(value) => handleStatusChange(row.original.id, 1)}
        />
      );
    },
  },
  {
    accessorKey: "created_at",
    header: t("Applied At"),
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

export const kycApprovedColumns = ({ t, navigate }) => [
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
    accessorKey: "photo",
    header: "User Photo",
    cell: ({ row }) => {
      const user_photo = row?.original?.photo;
      return (
        <div className="h-[50px] w-[50px] overflow-hidden rounded-[8px]">
          <CustomImage
            imageUrl={user_photo ? user_photo : "/images/profile-pic.jpeg"}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "userId",
    header: "User Id",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("userId")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("email")}</div>,
  },

  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Phone
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("phone")}</div>,
  },
  {
    accessorKey: "status",
    header: t("Status"),
    cell: ({ row }) => {
      const status = row.original.status;

      return (
        <Switch
          checked={status == 1 ? true : false}
          //   onCheckedChange={(value) => handleStatusChange(row.original.id, 1)}
        />
      );
    },
  },
  {
    accessorKey: "kycStatus",
    header: t("Kyc Status"),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("kycStatus")}</div>
    ),
  },

  {
    accessorKey: "joined_at",
    header: t("Joined At"),
    cell: ({ row }) => {
      const applied_date = row.original.created_at;
      return dateFormater(applied_date);
    },
  },
  {
    accessorKey: "created_at",
    header: t("Applied At"),
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

//kyc Approved Columns
