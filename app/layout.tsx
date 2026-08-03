import "./globals.css";
import type { Metadata } from "next";
import { AIProvider } from "@/context/AIContext";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "CropWise AI",
  description: "AI Powered Farming Assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AIProvider>
          {children}

          <Toaster
            position="top-right"
            richColors
            closeButton
          />
        </AIProvider>
      </body>
    </html>
  );
}