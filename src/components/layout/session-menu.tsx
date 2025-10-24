"use client";

import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import type { AuthUser } from "../../features/auth";
import { ROUTES } from "../../config";
import { cn } from "../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

export interface SessionMenuProps {
  user: AuthUser | null | undefined;
}

const getInitials = (value?: string | null) => {
  if (!value) return "?";
  const [first, second] = value.split(" ");
  if (second) {
    return `${first.at(0) ?? ""}${second.at(0) ?? ""}`.toUpperCase();
  }
  return (first.at(0) ?? "?").toUpperCase();
};

export const SessionMenu = ({ user }: SessionMenuProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(async () => {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push(ROUTES.login.path);
      router.refresh();
    });
  };

  const displayName = user?.name ?? user?.email ?? "Chemex teammate";
  const email = user?.email ?? "No email";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-3 px-2">
          <Avatar className="h-8 w-8">
            {user?.avatarUrl ? (
              <AvatarImage src={user.avatarUrl} alt={displayName} />
            ) : (
              <AvatarFallback>{getInitials(user?.name ?? user?.email)}</AvatarFallback>
            )}
          </Avatar>
          <span className="hidden flex-col text-left text-sm leading-tight sm:flex">
            <span className="font-medium">{displayName}</span>
            <span className="text-xs text-muted-foreground">{email}</span>
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>
          <p className="text-sm font-semibold">{displayName}</p>
          <p className="text-xs text-muted-foreground">{email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={ROUTES.dashboard.path} className={cn("flex items-center gap-2 text-sm")}> 
            <User className="h-4 w-4" />
            <span>View profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault();
            handleSignOut();
          }}
          className="flex items-center gap-2 text-sm"
        >
          <LogOut className="h-4 w-4" />
          <span>{isPending ? "Signing out..." : "Sign out"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
