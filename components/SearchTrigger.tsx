"use client";

import type { ReactNode } from "react";
import { openSearch } from "./browser-store";

/** A button that opens the search palette, optionally with a ready query. */
export default function SearchTrigger({
  seed,
  className,
  label,
  children,
}: {
  seed?: string;
  className?: string;
  label?: string;
  children: ReactNode;
}) {
  return (
    <button type="button" className={className} aria-label={label} onClick={() => openSearch(seed)}>
      {children}
    </button>
  );
}
