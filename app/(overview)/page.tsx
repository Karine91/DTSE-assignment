import { RegionsList, Search } from "@/features/overview";
import type { PageProps } from "@/types";

export default async function Overview({ searchParams }: PageProps) {
  const search = searchParams.search as string;
  const page = Number(searchParams.page) || 1;

  return (
    <>
      <h1 className="m-10 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
        Overview
      </h1>

      <div className="flex justify-center my-3 w-3/5">
        <Search />
      </div>

      <RegionsList search={search} page={page} />
    </>
  );
}
