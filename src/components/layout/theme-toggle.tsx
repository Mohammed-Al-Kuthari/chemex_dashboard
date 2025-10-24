"use client";

import { Check, Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const THEMES = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Laptop },
] as const;

type ThemeOption = (typeof THEMES)[number];

const getActiveOption = (theme: string | undefined): ThemeOption => {
  const match = THEMES.find((option) => option.value === theme);
  return match ?? THEMES[2];
};

export const ThemeToggle = () => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const activeOption = getActiveOption(theme ?? undefined);

  const CurrentIcon = (() => {
    if (activeOption.value === "system") {
      if (resolvedTheme === "dark") {
        return Moon;
      }
      if (resolvedTheme === "light") {
        return Sun;
      }
    }
    return activeOption.icon;
  })();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Change theme"
          className="relative h-9 w-9"
        >
          <CurrentIcon className="h-4 w-4" />
          <span className="sr-only">Change theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {THEMES.map((option) => {
          const OptionIcon = option.icon;
          const isActive = activeOption.value === option.value;
          return (
            <DropdownMenuItem
              key={option.value}
              onSelect={(event) => {
                event.preventDefault();
                setTheme(option.value);
              }}
              className="flex items-center gap-2"
            >
              <OptionIcon className="h-4 w-4" />
              <span className="flex-1 text-sm">{option.label}</span>
              {isActive ? <Check className="h-3.5 w-3.5" /> : null}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
