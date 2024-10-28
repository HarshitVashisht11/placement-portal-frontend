// import { Manrope } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";

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
    <html suppressHydrationWarning={true} lang="en">
      <body
        className={cn(
          fontHeading.variable,
          fontBody.variable,
          dmsans.className
        )}
      >
        <NextTopLoader
          color="#ba2928"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #ba2928,0 0 5px #ba2928"
        />
        {children}
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
