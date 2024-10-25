import NavbarContainerLayout from "@/components/layout/navbar-container";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <NavbarContainerLayout>{children}</NavbarContainerLayout>;
}
