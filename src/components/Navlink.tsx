import Link from "next/link";

const NavLink = ({
    children,
    className,
    label,
    href,
    onclick
}: {
    href: string;
    children: React.ReactElement;
    label: string;
    className?: string;
    onclick?: any
}) => {
    return (
        <Link href={href}>
            <div className={`border-b-2 border-transparent py-1 mx-auto flex justify-center items-center cursor-pointer ${className} hover:border-current transition-colors`} onClick={onclick}>
                <div className="flex gap-2 items-center justify-center">
                    {children}
                    <span className=" font-bold">{label}</span>
                </div>
            </div>
        </Link>
    );
};

export default NavLink;
