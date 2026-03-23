import { Outfit, Cormorant_Garamond, Libre_Baskerville } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { LocationProvider } from "@/context/LocationContext";
import { CartProvider } from "@/context/CartContext";
import AdminSessionManager from "@/components/AdminSessionManager";
import CartDrawer from "@/components/CartDrawer";
import GoogleAuthProviderWrapper from "@/components/GoogleAuthProviderWrapper";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant-garamond",
  display: "swap",
});

const baskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-baskerville",
  display: "swap",
});

export const metadata = {
  title: "Zelp - Premium Healthcare Simplified",
  description: "Book verified hospital services and lab tests at the best prices with Zelp. Compare options, get exclusive discounts, and schedule appointments instantly.",
  icons: {
    icon: "/zelp-favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://waitlister.me" />
        <link rel="dns-prefetch" href="https://waitlister.me" />
      </head>
      <body className={`${outfit.variable} ${cormorantGaramond.variable} ${baskerville.variable} font-sans`} suppressHydrationWarning>
        <GoogleAuthProviderWrapper clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
          <AuthProvider>
            <LocationProvider>
              <CartProvider>
                <AdminSessionManager />
                <CartDrawer />
                <Script
                  src="https://waitlister.me/js/embed.js"
                  strategy="afterInteractive"
                />
                {children}
              </CartProvider>
            </LocationProvider>
          </AuthProvider>
        </GoogleAuthProviderWrapper>
      </body>
    </html>
  );
}
