import { LayoutDashboard, Settings } from "lucide-react";
import Link from "next/link";
import type { ComponentType, HTMLAttributes } from "react";

import { ROUTES } from "../../config";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

type SidebarNavItem = {
  label: string;
  description: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
};

const primaryLinks: SidebarNavItem[] = [
  {
    label: "Dashboard",
    description: "Operational overview and metrics",
    href: ROUTES.dashboard.path,
    icon: LayoutDashboard,
  },
];

const secondaryLinks: SidebarNavItem[] = [
  {
    label: "Settings",
    description: "Workspace preferences and profile",
    href: "#settings",
    icon: Settings,
  },
];

export interface AppSidebarProps extends HTMLAttributes<HTMLDivElement> {
  currentPath: string;
}

const renderLink = (item: SidebarNavItem, currentPath: string) => {
  const isActive = currentPath === item.href;
  const Icon = item.icon;

  return (
    <li key={item.href}>
      <Button
        asChild
        variant={isActive ? "secondary" : "ghost"}
        className="w-full justify-start gap-3 px-3 py-2"
      >
        <Link href={item.href} aria-current={isActive ? "page" : undefined}>
          <Icon className="h-4 w-4" />
          <div className="flex flex-col text-left">
            <span className="text-sm font-medium">{item.label}</span>
            <span className="text-xs text-muted-foreground">{item.description}</span>
          </div>
        </Link>
      </Button>
    </li>
  );
};

export const AppSidebar = ({ currentPath, className, ...props }: AppSidebarProps) => {
  return (
    <div className={cn("flex h-full flex-col gap-6 p-4", className)} {...props}>
      <div className="px-1">
        <h2 className="text-lg font-semibold tracking-tight">Chemex Dashboard</h2>
        <p className="text-xs text-muted-foreground">Operational oversight for production teams</p>
      </div>

      <nav className="flex flex-1 flex-col gap-6 overflow-y-auto">
        <div>
          <p className="px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Overview</p>
          <ul className="mt-2 space-y-1">{primaryLinks.map((item) => renderLink(item, currentPath))}</ul>
        </div>
        <div>
          <p className="px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Management</p>
          <ul className="mt-2 space-y-1">{secondaryLinks.map((item) => renderLink(item, currentPath))}</ul>
        </div>
      </nav>

      <Separator />
      <footer className="space-y-1 px-1 text-xs text-muted-foreground">
        <p>Version 0.1.0</p>
        <p className="text-[11px]">All activity is monitored for compliance.</p>
      </footer>
    </div>
  );
};
