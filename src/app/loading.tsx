import { logger } from "@/core/lib/logging/logger";

export default function Loading() {
  logger.info("Loading workspace...");
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface">
      <div className="flex flex-col items-center gap-3">
        <span className="h-12 w-12 animate-spin rounded-full border-4 border-orange-200 border-t-orange-500" />
        <p className="text-sm text-muted-foreground">Loading workspace...</p>
      </div>
    </div>
  );
}
