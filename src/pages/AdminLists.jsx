import { DataTable } from "@/section/admin/custom-table/DataTable";
import React, { useEffect } from "react";
import { dateFormater } from "@/lib/helper";
import { Switch } from "@/components/ui/switch";
import { useTranslation } from "react-i18next";
import CustomImage from "@/components/CustomImage";
import { adminLists } from "@/DummyData/Admin/Lists";
import { useDispatch, useSelector } from "react-redux";
import { allUsers } from "@/slices/userSlice";

// Dummy implementation for useGetAllAdminListsForAdmin
const useGetAllAdminListsForAdmin = () => {
  const [data, setData] = React.useState({
    data: { list: adminLists, meta: {} },
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const setLimit = () => {};
  const setPage = () => {};
  const setSearch = () => {};
  const limit = 10; // Default limit
  return { data, isLoading, setLimit, setPage, setSearch, limit };
};

// Dummy implementation for useUpdateAdminStatusForAdmin
const useUpdateAdminStatusForAdmin = () => {
  const handleStatusChange = (id, status) => {};
  return { handleStatusChange };
};

export default function AdminLists() {
  const dispatch = useDispatch();
  const {} = useSelector((state)=>state.userCustom)

  const { t } = useTranslation();
  const { handleStatusChange } = useUpdateAdminStatusForAdmin();
  const columns = [
    {
      accessorKey: "photo",
      header: t("User Photo"),
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
      header: t("Name"),
      cell: ({ row }) => {
        return <span>{row?.original?.name}</span>;
      },
    },
    {
      header: t("User Id"),
      cell: ({ row }) => {
        return <span>{row?.original?.userId}</span>;
      },
    },
    {
      accessorKey: "email",
      header: t("Email"),
    },
    {
      accessorKey: "phone",
      header: t("Phone"),
    },
    {
      accessorKey: "wallet",
      header: t("Wallet"),
    },
    {
      accessorKey: "myReferral",
      header: t("My Referral"),
    },
    {
      accessorKey: "myTeam",
      header: t("My Team"),
    },
    {
      accessorKey: "totalTeam",
      header: t("Total Team"),
    },

    {
      accessorKey: "status",
      header: t("Status"),
      cell: ({ row }) => {
        const status = row.original.status;

        return (
          <Switch
            checked={status == 1 ? true : false}
            onCheckedChange={(value) => handleStatusChange(row.original.id, 1)}
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
            onCheckedChange={(value) => handleStatusChange(row.original.id, 1)}
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
  ];

  const {
    data: pendingLists,
    isLoading,
    setLimit,
    setPage,
    setSearch,
    limit,
  } = useGetAllAdminListsForAdmin();

  useEffect(() => {
    dispatch(allUsers({limit:8,page:2}));
  }, [dispatch]);

  return (
    <div className="panel flex h-full flex-1 flex-col space-y-8 rounded-md border-2 p-4  md:p-8">
      <div>
        <div className="flex flex-col justify-between space-y-2 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              {t(`Admin Lists`)}
            </h2>
            <p className="text-muted-foreground">
              {t(`Here is the list of all Admin applications.`)}
            </p>
          </div>
        </div>
      </div>
      <DataTable
        data={pendingLists?.data?.list || []}
        columns={columns}
        setSearch={setSearch}
        isLoading={isLoading}
        setLimit={setLimit}
        limit={limit}
        setPage={setPage}
        paginationValue={pendingLists?.data?.meta || {}}
        isSearchEnable={true}
        isPaginateEnable={true}
      />
    </div>
  );
}
