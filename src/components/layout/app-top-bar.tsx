"use client";

import { CalendarDays } from "lucide-react";

import type { AuthUser } from "../../features/auth";
import { LocaleSwitcher } from "./locale-switcher";
import { SessionMenu } from "./session-menu";
import { Separator } from "../ui/separator";
import { ThemeToggle } from "./theme-toggle";

export interface AppTopBarProps {
  user: AuthUser | null | undefined;
  locale?: string;
}

const SUPPORTED_LOCALES = [
  { value: "en", label: "English" },
  { value: "ar", label: "Arabic" },
];

export const AppTopBar = ({ user, locale = "en" }: AppTopBarProps) => {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-3 bg-background/95 px-3 py-2 backdrop-blur lg:px-6">
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <CalendarDays className="h-4 w-4" />
        <span>Last sync: moments ago</span>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Separator orientation="vertical" className="h-8" />
        <LocaleSwitcher currentLocale={locale} locales={SUPPORTED_LOCALES} />
        <Separator orientation="vertical" className="h-8" />
        <SessionMenu user={user} />
      </div>
    </header>
  );
};
