// import { Manrope } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
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
    <html suppressHydrationWarning lang="en">
      <body
        className={cn(
          fontHeading.variable,
          fontBody.variable,
          dmsans.className
        )}
      >
        <div
          className={`relative gap-8 max-w-screen-xl mx-auto flex flex-col px-2 justify-start min-h-screen`}
        >
          <NextTopLoader
            color="#2299DD"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          />
          <Navbar />
          <main className="">{children}</main>
          <Toaster position="bottom-center" />
        </div>
      </body>
    </html>
  );
}
