"use client";

import { useLocale } from "next-intl";
import React, { useState, useMemo, useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const localeAlias: { [key: string]: string } = {
  bod: "bo",
};

const ITEMS_PER_PAGE = 9;

const SideClient = ({ pilgrimData }: any) => {
  const activelocale = useLocale();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPilgrimSites = useMemo(() => {
    if (!searchQuery.trim()) return pilgrimData;

    return pilgrimData.filter((site: any) => {
      const backendLocale = localeAlias[activelocale] || activelocale;
      const translation = site.translations.find(
        (t: any) => t.languageCode === backendLocale
      ) ||
        site.translations[0] || {
          name: "Unnamed Site",
          description: "No description available",
        };

      const searchLower = searchQuery.toLowerCase();
      return (
        translation.name.toLowerCase().includes(searchLower) ||
        translation.description.toLowerCase().includes(searchLower)
      );
    });
  }, [pilgrimData, searchQuery, activelocale]);

  const totalPages = Math.ceil(filteredPilgrimSites.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentSites = filteredPilgrimSites.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const visiblePages = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [1];
    if (currentPage > 3) pages.push("...");

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    if (start <= end) {
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);

    return pages;
  }, [currentPage, totalPages]);

  return (
    <div className="relative min-h-screen w-full">
      <div className="sticky top-0 bg-white dark:bg-neutral-950 z-10 py-4 shadow-sm">
        <div className="w-full max-w-xl mx-auto px-6">
          <Input
            type="search"
            placeholder="Search pilgrim sites..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full"
          />
        </div>
      </div>

      <div className="pt-4">
        {filteredPilgrimSites.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No pilgrim sites found matching your search.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {currentSites.map((site: any) => {
                const backendLocale = localeAlias[activelocale] || activelocale;
                const translation = site.translations.find(
                  (t: any) => t.languageCode === backendLocale
                ) ||
                  site.translations[0] || {
                    name: "Unnamed Site",
                    description: "No description available",
                  };

                return (
                  <Link
                    href={`/Sacred/${site.id}`}
                    key={site.id}
                    className="bg-white dark:bg-neutral-900 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    {site.image && (
                      <img
                        src={site.image}
                        alt={translation.name}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2">
                        {translation.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
                        {translation.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>

            {totalPages > 1 && (
              <Pagination className="my-6">
                <PaginationContent>
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => handlePageChange(currentPage - 1)}
                      />
                    </PaginationItem>
                  )}
                  {visiblePages.map((page, index) =>
                    typeof page === "string" ? (
                      <PaginationItem key={`ellipsis-${index}`}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    ) : (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => handlePageChange(page)}
                          isActive={currentPage === page}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  )}
                  {currentPage < totalPages && (
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => handlePageChange(currentPage + 1)}
                      />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SideClient;
