import { AppThemeProvider } from "./AppThemeProvider";
export function AppProviders({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppThemeProvider>{children}</AppThemeProvider>;
}
