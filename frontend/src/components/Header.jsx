import { NavLink } from "react-router-dom";

export default function Header({
    title,
    subtitle,
    children,
    showProfile = true,
}) {
    return (
        <header className="flex justify-between w-full items-center mb-4">
            <div className="flex flex-col">
                <h1 className="text-3xl font-bold leading-10">{title}</h1>
                {subtitle && <h3>{subtitle}</h3>}
            </div>
            <div>
                {children}
                {showProfile && (
                    <NavLink to="/profile">
                        <div className="rounded-full w-[50px] h-[50px] bg-gray-500"></div>
                    </NavLink>
                )}
            </div>
        </header>
    );
}
