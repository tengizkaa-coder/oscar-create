import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AgeVerification } from "@/components/AgeVerification";
import { CartHydration } from "@/components/CartHydration";

const SITE_URL = "https://xn--80aaf5ajejew9h7ac.xn--p1ai";
const SITE_NAME = "Пьяная Москва";
const YM_ID = 109840770;

export const metadata: Metadata = {
  title: {
    default: "Пьяная Москва — Доставка алкоголя по Москве 24/7",
    template: "%s | Пьяная Москва",
  },
  description:
    "Доставка алкоголя по Москве за 20 минут, круглосуточно. ⭐ Вино, виски, водка, пиво, шампанское, коньяк. Оплата при получении. Звоните: +7 (495) 095-95-99.",
  keywords: [
    "доставка алкоголя москва",
    "доставка алкоголя 24 часа",
    "купить алкоголь с доставкой",
    "пьяная москва",
    "алкоголь на дом москва",
    "доставка вина москва",
    "доставка виски москва",
    "доставка водки москва",
    "доставка пива москва",
    "доставка шампанского москва",
    "доставка коньяка москва",
    "алкоголь круглосуточно москва",
    "ночная доставка алкоголя",
    "алкоголь 24/7",
    "доставка сигарет москва",
    "доставка закусок москва",
  ],
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Пьяная Москва — Доставка алкоголя 24/7",
    description: "Любой алкоголь с доставкой за 20 минут. Вино, виски, водка, пиво, сигареты, закуски. Оплата при получении. Москва, круглосуточно.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Пьяная Москва — Доставка алкоголя 24/7",
    description: "Любой алкоголь за 20 минут. Москва, круглосуточно.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  verification: {
    yandex: "d086df2f0b61bdec",
  },
  manifest: "/manifest.webmanifest",
  themeColor: "#0a0a0a",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  other: {
    "geo.region": "RU-MOW",
    "geo.placename": "Москва",
  },
};

// Structured data — LocalBusiness
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: SITE_NAME,
  url: SITE_URL,
  description: "Доставка алкоголя по Москве круглосуточно. Вино, виски, водка, пиво, шампанское, коньяк и готовые сеты.",
  telephone: "+7-495-095-95-99",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Москва",
    addressCountry: "RU",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 55.7558,
    longitude: 37.6173,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  },
  priceRange: "₽₽",
  paymentAccepted: "Cash, Credit Card",
  areaServed: {
    "@type": "City",
    name: "Москва",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="grain min-h-screen flex flex-col">
        <CartHydration />
        <AgeVerification />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        {/* Yandex.Metrika */}
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,'script','https://mc.yandex.ru/metrika/tag.js?id=${YM_ID}','ym');ym(${YM_ID},'init',{ssr:true,webvisor:true,clickmap:true,ecommerce:"dataLayer",accurateTrackBounce:true,trackLinks:true});`}
        </Script>
        <noscript>
          <div>
            <img src={`https://mc.yandex.ru/watch/${YM_ID}`} style={{ position: "absolute", left: "-9999px" }} alt="" />
          </div>
        </noscript>
      </body>
    </html>
  );
}
