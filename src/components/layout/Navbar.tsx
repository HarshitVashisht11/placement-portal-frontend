"use client";

import {
    AlarmClockCheck,
    Bookmark,
    BriefcaseBusiness,
    CircleCheckBig,
    Github,
    LoaderPinwheel,
    MessageSquareQuote,
    Notebook,
    Palette,
    Plus,
    UserRound,
} from "lucide-react";
import Icon from "../Icon";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import NavLink from "../Navlink";

const Navbar = () => {
    const router = useRouter();
    const [open, setOpen] = useState(false);

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
                    <BriefcaseBusiness color="black" />
                    <span className="font-bold text-lg">Placement Portal</span>
                </div>
            </Link>
            <div className="flex gap-6 items-center justify-center">
                <NavLink href="/jobs" label="Jobs">
                    <BriefcaseBusiness color="black" size={19} />
                </NavLink>
                <NavLink href="/forum" label="Forum">
                    <MessageSquareQuote color="black" size={19} />
                </NavLink>
                <NavLink href="/user/profile" label="Pofile">
                    <UserRound color="black" size={19} />
                </NavLink>
            </div>
        </div>
    );
};

export default Navbar;
