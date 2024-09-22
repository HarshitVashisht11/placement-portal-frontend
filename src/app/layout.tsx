// import { Manrope } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { cn } from "@/lib/utils";

const fontHeading = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const dmsans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Placement Portal",
  description: "TPC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={cn(
          "antialiased min-h-screen relative",
          fontHeading.variable,
          fontBody.variable,
          dmsans.className
        )}
      >
        {children}
      </body>
    </html>
  );
}
