"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useRouter, useSearchParams } from "next/navigation";

export function SortSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sort = searchParams.get("sort") ?? "date";
  const order = searchParams.get("order") ?? "desc";

  function updateSort(value: string) {
    const [newSort, newOrder] = value.split(":");

    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", newSort);
    params.set("order", newOrder);
    params.set("page", "1"); // reset page on sort change

    router.replace(`?${params.toString()}`, { scroll: false });
  }

  return (
    <Select
      value={`${sort}:${order}`}
      onValueChange={updateSort}
    >
      <SelectTrigger className="w-[220px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="date:desc">Newest first</SelectItem>
        <SelectItem value="date:asc">Oldest first</SelectItem>
        <SelectItem value="name:asc">Name (A → Z)</SelectItem>
        <SelectItem value="name:desc">Name (Z → A)</SelectItem>
      </SelectContent>
    </Select>
  );
}
