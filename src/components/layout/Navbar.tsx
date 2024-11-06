"use client";

import { BriefcaseBusiness, MessageSquareQuote, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import NavLink from "../Navlink";

const Navbar = () => {
  // const [open, setOpen] = useState(false);

  const pathname = usePathname();
  // const [path, setpath] = useState({
  //   pathname: "/auth/login",
  //   text: "Login",
  // });

  if (
    pathname === "/auth/login" ||
    pathname === "/auth/register" ||
    pathname === "/admin/dashboard/*"
  ) {
    return null;
  }

  // const logout = async () => {
  //     try {
  //         const response = await api.post("/logout");
  //         if (response.data.success) {
  //             let newTodoTaostMessage = {
  //                 title: "Logged Out successfully.",
  //             };
  //             toast(newTodoTaostMessage);
  //             setLoggedOut();
  //             router.replace("/auth");
  //             return;
  //         }
  //     } catch (error) {
  //         let newTodoTaostMessage = {
  //             title: "Some Error Occured.",
  //         };
  //         toast(newTodoTaostMessage);
  //         return;
  //     }
  // };

  // SidebarDropdownElements[0].onClick = logout;

  return (
    <div className="sticky top-4 left-0 border px-4 py-2 rounded-md flex z-20 flex-row items-center justify-between w-full mx-auto bg-white">
      <Link href="/">
        <div className="flex flex-row gap-2 items-center justify-center">
          <span className="font-bold text-lg">TPC Placement Portal</span>
        </div>
      </Link>
      <div className="flex gap-6 items-center justify-center">
        <NavLink href="/jobs" label="Jobs">
          <BriefcaseBusiness color="black" size={19} />
        </NavLink>
        <NavLink href="/forum" label="Forum">
          <MessageSquareQuote color="black" size={19} />
        </NavLink>
        <NavLink href="/user/profile" label="Profile">
          <UserRound color="black" size={19} />
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
