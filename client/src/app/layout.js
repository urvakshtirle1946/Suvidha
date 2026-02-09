import { Outfit } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { LocationProvider } from "@/context/LocationContext";
import { CartProvider } from "@/context/CartContext";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata = {
  title: "Zelp - Premium Healthcare Simplified",
  description: "Book verified hospital services and lab tests with best discounts.",
  icons: {
    icon: "/favicon.ico",
  },
};

import AdminSessionManager from "@/components/AdminSessionManager";
import CartDrawer from "@/components/CartDrawer";
import AmbulanceRequest from "@/components/AmbulanceRequest";

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <body className={outfit.className}>
          <AuthProvider>
            <LocationProvider>
              <CartProvider>
                <AdminSessionManager />
                <CartDrawer />
                <AmbulanceRequest />
                {children}
              </CartProvider>
            </LocationProvider>
          </AuthProvider>
        </body>
      </html>
    </>
  );
}
