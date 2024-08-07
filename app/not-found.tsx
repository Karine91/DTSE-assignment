import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center flex-grow">
      <h2 className="text-center text-lg">404 | Not Found</h2>
      <p className="my-1">Could not find requested resource</p>
      <Button asChild>
        <Link className="mt-10" href="/">
          Return Home
        </Link>
      </Button>
    </div>
  );
}
