import { getRegions } from "../api/getRegions";

import { RegionsTable } from "./RegionsTable";
import { SearchParamsPagination } from "@/components/ui/SearchParamsPagination";

export const RegionsList = async ({
  search,
  page,
}: {
  search: string;
  page: number;
}) => {
  const { data, totalPages } = await getRegions({ search, page });
  return (
    <section className="w-9/12">
      <RegionsTable data={data} />
      <SearchParamsPagination totalPages={totalPages} />
    </section>
  );
};
