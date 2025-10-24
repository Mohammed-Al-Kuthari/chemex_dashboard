"use client";

import { Menu } from "lucide-react";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import type { AuthUser } from "../../features/auth";
import { AppSidebar } from "./app-sidebar";
import { AppTopBar } from "./app-top-bar";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export interface AppShellProps {
  children: ReactNode;
  user: AuthUser | null | undefined;
  locale?: string;
}

export const AppShell = ({ children, user, locale }: AppShellProps) => {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <aside className="hidden w-64 shrink-0 border-r border-border bg-surface/90 lg:block">
        <AppSidebar currentPath={pathname} />
      </aside>

      <Sheet>
        <SheetTrigger className="lg:hidden" asChild>
          <Button variant="ghost" size="icon" className="m-3">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open navigation</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <AppSidebar currentPath={pathname} className="h-full" />
        </SheetContent>
      </Sheet>

      <div className="flex min-h-screen flex-1 flex-col">
        <AppTopBar user={user} locale={locale} />
        <Separator />
        <main className="flex-1 bg-background/60 p-6 lg:p-8">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
