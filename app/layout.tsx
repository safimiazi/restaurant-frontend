import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/hooks/use-cart";
import { ThemeProvider } from "@/components/theme-provider";
import ReduxProvider from "@/hooks/redux-provider";
import Toast from "@/hooks/use-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tasty Bites - Restaurant Ordering System",
  description: "Order delicious food online",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ReduxProvider>
            <CartProvider>
              {children}
              <Toast/>
            </CartProvider>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}