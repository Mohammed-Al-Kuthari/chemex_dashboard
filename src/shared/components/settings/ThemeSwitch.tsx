"use client";

import { useTranslations } from "next-intl";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/forms";
import { Typography } from "@/shared/components/typography";
import { useThemeMode } from "@/shared/hooks";

const THEME_OPTIONS = ["system", "light", "dark"] as const;

type ThemeOption = (typeof THEME_OPTIONS)[number];

export function ThemeSwitch() {
  const { theme, setTheme } = useThemeMode();
  const t = useTranslations();

  const handleChange = (value: string) => {
    setTheme(value as ThemeOption);
  };

  return (
    <div className="flex items-center gap-3">
      <Typography variant="small" weight="medium">
        {t("app.themeLabel")}
      </Typography>
      <Select value={theme} onValueChange={handleChange}>
        <SelectTrigger className="w-40" aria-label={t("app.themeLabel")}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {THEME_OPTIONS.map((option) => (
            <SelectItem key={option} value={option}>
              {t(`theme.${option}`)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

}
