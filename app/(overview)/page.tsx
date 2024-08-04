import { Suspense } from "react";

import { Spinner } from "@/components/ui/spinner";
import { RegionsList } from "@/features/overview";

export default function Home() {
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
        <RegionsList />
      </Suspense>
    </main>
  );
}
