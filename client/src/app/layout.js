import { Outfit, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { LocationProvider } from "@/context/LocationContext";
import { CartProvider } from "@/context/CartContext";
import AdminSessionManager from "@/components/AdminSessionManager";
import CartDrawer from "@/components/CartDrawer";
// Google removed


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
      <body className={`${outfit.variable} ${cormorantGaramond.variable} font-sans`}>
        <AuthProvider>
          <LocationProvider>
            <CartProvider>
              <AdminSessionManager />
              <CartDrawer />
              {children}
            </CartProvider>
          </LocationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
