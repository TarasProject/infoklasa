import type { Metadata } from "next";
import { JetBrains_Mono, Lexend, Onest } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import CookieNotice from "@/components/CookieNotice";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SearchPalette from "@/components/SearchPalette";
import { routing } from "@/i18n/routing";
import "../globals.css";

const onest = Onest({ subsets: ["latin", "latin-ext", "cyrillic"], variable: "--font-onest" });
const jetbrains = JetBrains_Mono({ subsets: ["latin", "latin-ext", "cyrillic"], variable: "--font-jetbrains" });
// Used only by the "dyslexia-friendly font" accessibility mode.
const lexend = Lexend({ subsets: ["latin", "latin-ext"], variable: "--font-lexend" });

// Runs before the first paint, so a saved dark theme or accessibility mode never flashes.
// Keep the key names and the mode list in sync with lib/prefs.ts and components/browser-store.ts.
const applySavedPrefs = `(function(){try{var r=document.documentElement,t=localStorage.getItem("infoklasa.theme");if(t==="light"||t==="dark")r.setAttribute("data-theme",t);var a=JSON.parse(localStorage.getItem("infoklasa.a11y")||"[]");if(Array.isArray(a))a.forEach(function(m){if(/^(large|contrast|dyslexia|spacing|motion)$/.test(m))r.classList.add("a11y-"+m)})}catch(e){}})()`;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t("title"), description: t("description") };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("common");

  return (
    // The script above changes <html> before React starts, hence suppressHydrationWarning.
    // The font variables must sit on <html>: the tokens in globals.css read them at :root.
    <html lang={locale} className={`${onest.variable} ${jetbrains.variable} ${lexend.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: applySavedPrefs }} />
      </head>
      <body>
        <NextIntlClientProvider>
          <a className="skip" href="#main">
            {t("skip")}
          </a>
          <Header />
          {children}
          <Footer />
          <SearchPalette />
          <CookieNotice />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
