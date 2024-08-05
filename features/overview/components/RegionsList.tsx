import { getRegions } from "../api/getRegions";

import { RegionsTable } from "./RegionsTable";

export const RegionsList = async ({ search }: { search: string }) => {
  const data = await getRegions({ search });
  return (
    <section className="w-9/12">
      <RegionsTable data={data} />
    </section>
  );
};
