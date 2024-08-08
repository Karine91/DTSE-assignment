"use client";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-center flex-grow">
      <h2 className="text-center text-lg">404 | Not Found</h2>
      <p className="my-1">Could not find requested resource</p>
      <Button className="mt-10" onClick={router.back}>
        Back
      </Button>
    </div>
  );
}
