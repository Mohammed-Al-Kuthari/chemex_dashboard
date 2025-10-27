"use client";

import { useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";

import { localeCookieConfig } from "@/core/configs/app-config";

const buildCookie = (locale: string) => {
  const parts = [
    `${localeCookieConfig.name}=${encodeURIComponent(locale)}`,
    `path=${localeCookieConfig.path}`,
  ];

  if (localeCookieConfig.maxAge) {
    parts.push(`max-age=${localeCookieConfig.maxAge}`);
  }

  if (localeCookieConfig.sameSite) {
    parts.push(`samesite=${localeCookieConfig.sameSite}`);
  }

  if (localeCookieConfig.secure) {
    parts.push("secure");
  }

  return parts.join("; ");
};

export const useLocaleSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = useCallback(
    (nextLocale: string) => {
      if (typeof document !== "undefined") {
        document.cookie = buildCookie(nextLocale);
      }

      const url = new URL(window.location.href);
      url.pathname = pathname;
      url.searchParams.set("lang", nextLocale);
      router.replace(`${url.pathname}${url.search}`);
      router.refresh();
    },
    [pathname, router],
  );

  return { locale, switchLocale };
};
