import UserSidebar from "@/components/layout/UserSidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UserSidebar>{children}</UserSidebar>
    </>
  );
}
