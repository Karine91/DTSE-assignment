import { Suspense } from "react";

import { Spinner } from "@/components/ui/spinner";
import { RegionsTable, Search, getRegions } from "@/features/overview";

export const dynamic = "force-dynamic";

interface IHomeProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Home({ searchParams }: IHomeProps) {
  const search = searchParams.search as string;
  const data = await getRegions({ search });
  return (
    <main className="flex min-h-screen items-center flex-col p-24">
      <h1 className="m-10 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
        Overview
      </h1>
      <Suspense
        fallback={
          <div className="flex justify-center">
            <Spinner />
          </div>
        }
      >
        <div className="flex justify-center my-3">
          <Search />
        </div>
        <section className="w-9/12">
          <RegionsTable data={data} />
        </section>
      </Suspense>
    </main>
  );
}
