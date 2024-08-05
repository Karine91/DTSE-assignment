import { RegionsList, Search } from "@/features/overview";

interface IHomeProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Home({ searchParams }: IHomeProps) {
  const search = searchParams.search as string;

  return (
    <main className="flex min-h-screen items-center flex-col p-24">
      <h1 className="m-10 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
        Overview
      </h1>

      <div className="flex justify-center my-3">
        <Search />
      </div>

      <RegionsList search={search} />
    </main>
  );
}
