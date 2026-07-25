import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-aware wrappers around Next.js navigation: Link, useRouter,
// usePathname, redirect, getPathname. Use these instead of the
// next/link and next/navigation equivalents — they handle the locale
// prefix automatically.
export const { Link, useRouter, usePathname, redirect, getPathname } =
  createNavigation(routing);