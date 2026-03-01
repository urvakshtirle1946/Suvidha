import { Outfit, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { LocationProvider } from "@/context/LocationContext";
import { CartProvider } from "@/context/CartContext";
import AdminSessionManager from "@/components/AdminSessionManager";
import CartDrawer from "@/components/CartDrawer";
import GoogleAuthProviderWrapper from "@/components/GoogleAuthProviderWrapper";
import LRAuthProviderWrapper from "@/components/LRAuthProviderWrapper";
import Script from "next/script";


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


export const metadata = {
  title: "Zelp - Premium Healthcare Simplified",
  description: "Book verified hospital services and lab tests with best discounts.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script src="https://getlaunchlist.com/js/widget.js" strategy="lazyOnload" />
      </head>
      <body className={`${outfit.variable} ${cormorantGaramond.variable} font-sans`}>
        <GoogleAuthProviderWrapper clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
          <LRAuthProviderWrapper appName={process.env.NEXT_PUBLIC_LOGINRADIUS_CLIENT_ID || '5330c4fd-bd0e-4fc7-9df7-bb63ef0dec58'}>
            <AuthProvider>
              <LocationProvider>
                <CartProvider>
                  <AdminSessionManager />
                  <CartDrawer />
                  {children}
                </CartProvider>
              </LocationProvider>
            </AuthProvider>
          </LRAuthProviderWrapper>
        </GoogleAuthProviderWrapper>
      </body>
    </html>
  );
}
