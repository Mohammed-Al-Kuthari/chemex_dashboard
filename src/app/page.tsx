import { getTranslations } from "next-intl/server";

import { LanguageSwitch, ThemeSwitch } from "@/shared/components/settings";
import { Typography } from "@/shared/components/typography";

export default async function Home() {
  const t = await getTranslations("app");

  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-8 p-8">
      <div className="flex max-w-2xl flex-col items-center gap-3 text-center">
        <Typography variant="h1" weight="semibold">
          {t("title")}
        </Typography>
        <Typography variant="lead" align="center">
          {t("description")}
        </Typography>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-6">
        <LanguageSwitch />
        <ThemeSwitch />
      </div>
    </main>
  );
}
