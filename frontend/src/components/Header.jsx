import { NavLink } from "react-router-dom";

export default function Header({
    title,
    subtitle,
    children,
    showProfile = true,
}) {
    return (
        <header className="p-8 flex justify-between w-full items-center">
            <div className="flex flex-col">
                <h1 className="text-3xl font-bold leading-10">{title}</h1>
                {subtitle && <h3 className="text-lg">{subtitle}</h3>}
            </div>
            <div>
                {children}
                {showProfile && (
                    <NavLink to="/profile">
                        <img
                            className="rounded-full w-[50px] h-[50px] bg-gray-500"
                            src="https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ></img>
                    </NavLink>
                )}
            </div>
        </header>
    );
}
