import RegionsList from "@/app/(overview)/RegionsList";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Overview
      </h1>
      <Suspense fallback={<div>Loading...</div>}>
        <RegionsList />
      </Suspense>
    </main>
  );
}
