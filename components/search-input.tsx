// "use client";

// import { Input } from "@/components/ui/input";
// import { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// export function SearchInput() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const initialQuery = searchParams.get("q") || "";
//   const [value, setValue] = useState(initialQuery);

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       const params = new URLSearchParams(searchParams.toString());

//       if (value) {
//         params.set("q", value);
//       } else {
//         params.delete("q");
//       }

//       router.replace(`?${params.toString()}`, { scroll: false });
//     }, 400); // ⏱️ debounce delay

//     return () => clearTimeout(timeout);
//   }, [value, router, searchParams]);

//   return (
//     <Input
//       placeholder="Search PDFs..."
//       value={value}
//       onChange={(e) => setValue(e.target.value)}
//       className="w-full"
//     />
//   );
// }


"use client";

import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get("q") || "";
  const [value, setValue] = useState(initialQuery);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (value.trim()) {
        params.set("q", value.trim());
      } else {
        params.delete("q");
      }

      router.replace(`?${params.toString()}`, { scroll: false });
    }, 400); // ⏱️ debounce

    return () => clearTimeout(timeout);
  }, [value, router, searchParams]);

  function clearSearch() {
    setValue("");
    router.replace("?", { scroll: false });
  }

  return (
    <div className="relative">
      <Input
        placeholder="Search PDFs..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="pr-10"
      />

      {value && (
        <button
          onClick={clearSearch}
          className="absolute right-3 top-1/2 -translate-y-1/2
                     text-gray-400 hover:text-gray-600"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
