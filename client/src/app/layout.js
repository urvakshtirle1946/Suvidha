import { Outfit } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { LocationProvider } from "@/context/LocationContext";
import { ClerkProvider } from "@clerk/nextjs";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata = {
  title: "Suvidha - Premium Healthcare Simplified",
  description: "Book verified hospital services and lab tests with best discounts.",
};

import AdminSessionManager from "@/components/AdminSessionManager";
import SmoothScroll from "@/components/SmoothScroll";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <ClerkProvider>
      <body className={outfit.className}>
        <AuthProvider>
          <LocationProvider>
            <SmoothScroll />
            <AdminSessionManager />
            {children}
          </LocationProvider>
        </AuthProvider>
      </body>
    </ClerkProvider>
    </html>
  );
}
