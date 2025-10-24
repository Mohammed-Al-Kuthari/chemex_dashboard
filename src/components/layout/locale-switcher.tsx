"use client";

import { Languages } from "lucide-react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export interface LocaleSwitcherOption {
  value: string;
  label: string;
}

export interface LocaleSwitcherProps {
  currentLocale: string;
  locales: LocaleSwitcherOption[];
  onLocaleChange?: (locale: string) => void;
}

export const LocaleSwitcher = ({ currentLocale, locales, onLocaleChange }: LocaleSwitcherProps) => {
  return (
    <div className="flex items-center gap-2 text-sm">
      <Languages className="h-4 w-4 text-muted-foreground" />
      <Select
        value={currentLocale}
        onValueChange={(value) => {
          if (onLocaleChange) {
            onLocaleChange(value);
          }
        }}
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Select locale" />
        </SelectTrigger>
        <SelectContent>
          {locales.map((locale) => (
            <SelectItem key={locale.value} value={locale.value}>
              {locale.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
