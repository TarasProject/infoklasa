import { setRequestLocale } from "next-intl/server";
import HomeView from "@/components/HomeView";
import type { Locale } from "@/lib/locales";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  return <HomeView />;
}
