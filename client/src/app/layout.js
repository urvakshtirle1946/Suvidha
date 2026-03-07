import { Outfit, Cormorant_Garamond, Libre_Baskerville } from "next/font/google";
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
  description: "Book verified hospital services and lab tests with best discounts.",
  icons: {
    icon: "/zelp-favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      </head>
      <body className={`${outfit.variable} ${cormorantGaramond.variable} ${baskerville.variable} font-sans`}>
        <GoogleAuthProviderWrapper clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
          <AuthProvider>
            <LocationProvider>
              <CartProvider>
                <AdminSessionManager />
                <CartDrawer />
                {children}
              </CartProvider>
            </LocationProvider>
          </AuthProvider>
        </GoogleAuthProviderWrapper>
      </body>
    </html>
  );
}
