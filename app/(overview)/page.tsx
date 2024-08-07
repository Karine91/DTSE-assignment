import { RegionsList, Search } from "@/features/overview";
import type { PageProps } from "@/types";

export default async function Home({ searchParams }: PageProps) {
  const search = searchParams.search as string;

  return (
    <>
      <h1 className="m-10 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
        Overview
      </h1>

      <div className="flex justify-center my-3">
        <Search />
      </div>

      <RegionsList search={search} />
    </>
  );
}
