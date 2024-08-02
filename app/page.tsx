import RegionsList from "@/app/(overview)/RegionsList";
import Spinner from "@ui/Spinner";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="m-10 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Overview
      </h1>
      <Suspense fallback={<Spinner />}>
        <RegionsList />
      </Suspense>
    </main>
  );
}
