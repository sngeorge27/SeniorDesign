import { BiUser } from "react-icons/bi";
import { NavLink } from "react-router-dom";

export default function Header({
    title,
    subtitle,
    children,
    showProfile = true,
}) {
    return (
        <header className="p-8 flex justify-between w-full items-center border-b">
            <div className="flex flex-col">
                <h1 className="text-3xl font-bold leading-10">{title}</h1>
                {subtitle && subtitle.length > 0 && (
                    <h3 className="text-lg">{subtitle}</h3>
                )}
            </div>
            <div>
                {children}
                {showProfile && (
                    <NavLink to="/profile">
                        <div className="rounded-full w-[50px] h-[50px] bg-gray-200 flex items-center justify-center text-3xl text-gray-700 hover:bg-gray-300 hover:text-gray-800 transition-colors">
                            <BiUser />
                        </div>
                    </NavLink>
                )}
            </div>
        </header>
    );
}
