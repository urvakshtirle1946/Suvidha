import { Outfit } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { LocationProvider } from "@/context/LocationContext";
import { CartProvider } from "@/context/CartContext";
import { ClerkProvider } from "@clerk/nextjs";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata = {
  title: "Zelp - Premium Healthcare Simplified",
  description: "Book verified hospital services and lab tests with best discounts.",
};

import AdminSessionManager from "@/components/AdminSessionManager";
import SmoothScroll from "@/components/SmoothScroll";
import CartDrawer from "@/components/CartDrawer";

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={outfit.className}>
          <AuthProvider>
            <LocationProvider>
              <CartProvider>
                <SmoothScroll />
                <AdminSessionManager />
                <CartDrawer />
                {children}
              </CartProvider>
            </LocationProvider>
          </AuthProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
