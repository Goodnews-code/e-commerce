import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { CartProvider } from "@/lib/cart-context";
import AuthCheck from "@/components/AuthCheck";

export const metadata: Metadata = {
  title: "AURA — Essential Objects",
  description:
    "A curation of essential objects. Stripped of the unnecessary, built for endurance, and designed for absolute focus.",
  keywords: ["product catalog", "minimalist", "luxury", "essential"],
  openGraph: {
    title: "AURA",
    description: "Quietly exceptional objects.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem('theme');
                  var theme = savedTheme || 'dark';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <AuthProvider>
          <CartProvider>
            <AuthCheck>{children}</AuthCheck>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
