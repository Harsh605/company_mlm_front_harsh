import { ALL_USER_ROLLS } from "@/constant/core";
import { processResponse } from "@/lib/helper";
import {
  getAllAdminListsForAdminApi,
} from "@/service/admin/admin";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAllAdminListsForAdmin = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);

  const { data, isLoading } = useQuery({
    queryKey: ["allAdminListsForAdmin", search, limit, page],
    queryFn: () => getAllAdminListsForAdminApi(page, limit, search),
  });

  return {
    data,
    isLoading,
    setPage,
    setSearch,
    setLimit,
    limit,
  };
};
