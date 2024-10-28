import Navbar from "./Navbar";

const NavbarContainerLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div
      className={`relative gap-8 max-w-screen-xl mx-auto flex flex-col px-2 justify-start min-h-screen`}
    >
      <Navbar />
      <main className="">{children}</main>
    </div>
  );
};

export default NavbarContainerLayout;
