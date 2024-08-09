"use client";

import { usePathname, useSearchParams } from "next/navigation";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { generatePagination } from "@/lib/generate-pagination";

export const SearchParamsPagination = ({
  totalPages,
}: {
  totalPages: number;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const allPages = generatePagination(currentPage, totalPages);

  function createPageURL(pageNumber: number | string) {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  }

  return (
    <Pagination className="my-4">
      <PaginationContent>
        <PaginationItem className="mr-3">
          <PaginationPrevious
            href={createPageURL(currentPage - 1)}
            isDisabled={currentPage <= 1}
          />
        </PaginationItem>
        {allPages.map((page, index) => {
          return (
            <PaginationItem key={index}>
              {page === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  isActive={currentPage === page}
                  href={createPageURL(page)}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          );
        })}

        <PaginationItem className="ml-3">
          <PaginationNext
            href={createPageURL(currentPage + 1)}
            isDisabled={currentPage >= totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
