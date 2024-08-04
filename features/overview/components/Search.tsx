"use client";

import { Search as SearchIcon } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/form/InputField";

export const Search = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const search = searchParams.get("search");
  const [searchInput, setSearchInput] = useState(search || "");

  console.log(search);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (searchInput) {
      newSearchParams.set("search", searchInput);
    } else {
      newSearchParams.delete("search");
    }

    router.push(`${pathname}?${newSearchParams}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value.trim());
  };

  return (
    <form className="flex items-center" onSubmit={handleSearch}>
      <InputField
        label={"Search"}
        labelClasses="hidden"
        placeholder="Search..."
        name="search"
        value={searchInput}
        onChange={handleInputChange}
      />
      <Button className="ml-3">
        <SearchIcon className="h-4 w-4" />
      </Button>
    </form>
  );
};
