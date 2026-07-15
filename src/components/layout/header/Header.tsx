"use client";

import { usePathname } from "next/navigation";
import { MainHeader } from "./MainHeader";

export function Header() {
  const pathname = usePathname();
  const isNomineeDetail = /^\/nominees\/[^/]+/.test(pathname);
  if (isNomineeDetail) return null;
  return <MainHeader />;
}
