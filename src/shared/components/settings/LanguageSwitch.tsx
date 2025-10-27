"use client";

import { useTranslations } from "next-intl";

import { supportedLocales } from "@/core/configs/i18n-config";
import { useLocaleSwitcher } from "@/shared/hooks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/forms";
import { Typography } from "@/shared/components/typography";

export function LanguageSwitch() {
  const { locale, switchLocale } = useLocaleSwitcher();
  const t = useTranslations();

  return (
    <div className="flex items-center gap-3">
      <Typography variant="small" weight="medium">
        {t("app.languageLabel")}
      </Typography>
      <Select value={locale} onValueChange={switchLocale}>
        <SelectTrigger className="w-40" aria-label={t("app.languageLabel")}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {supportedLocales.map((value) => (
            <SelectItem key={value} value={value}>
              {t(`locale.${value}`)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
