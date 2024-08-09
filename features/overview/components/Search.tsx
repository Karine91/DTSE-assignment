"use client";

import { Search as SearchIcon } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

import { InputField } from "@/components/ui/form/InputField";

export const Search = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <div className="relative flex flex-1 flex-shrink-0 ">
      <InputField
        label={"Search"}
        labelClasses="sr-only"
        className="peer block py-[9px] pl-10 text-sm outline-2"
        placeholder="Search..."
        name="search"
        defaultValue={searchParams.get("search")?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
      />

      <SearchIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
};
