import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { BiHome, BiBullseye, BiEdit, BiUser, BiLogOut } from "react-icons/bi";

export default function Nav() {
    const { onLogout } = useAuth();

    return (
        <nav className="flex flex-col bg-cyan-800 w-[120px] p-4 justify-between">
            <div className="flex flex-col items-center">
                <NavItem href="/" label="Dashboard">
                    <BiHome />
                </NavItem>
                <NavItem href="/goals" label="Goals">
                    <BiBullseye />
                </NavItem>
                <NavItem href="/track" label="Track">
                    <BiEdit />
                </NavItem>
                <NavItem href="/profile" label="Profile">
                    <BiUser />
                </NavItem>
            </div>
            <div className="flex flex-col items-center">
                <NavItem
                    label="Logout"
                    isAction={true}
                    actionCallback={onLogout}
                >
                    <BiLogOut />
                </NavItem>
            </div>
        </nav>
    );
}

const NavItem = ({
    href,
    label,
    isAction = false,
    actionCallback,
    children,
}) => {
    if (isAction) {
        return (
            <NavTooltip
                title={label}
                arrow
                placement="right"
                enterDelay={0}
                className="cursor-pointer"
            >
                <div
                    onClick={actionCallback}
                    className="py-3 text-2xl transition-all text-gray-100 hover:text-gray-300 cursor-pointer"
                >
                    {children}
                </div>
            </NavTooltip>
        );
    }
    return (
        <NavLink
            to={href}
            style={{fontSize: "32px"}}
            className={({ isActive }) =>
                isActive
                    ? "py-6 text-2xl transition-all text-yellow-400 hover:text-yellow-500"
                    : "py-6 text-2xl transition-all text-gray-100 hover:text-gray-300"
            }
        >
            <NavTooltip
                title={label}
                arrow
                placement="right"
                enterDelay={0}
                className="cursor-pointer"
            >
                <div>{children}</div>
            </NavTooltip>
        </NavLink>
    );
};

const NavTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: "rgba(0, 0, 0, 0.87)",
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "rgba(0, 0, 0, 0.87)",
        fontSize: "16px",
        padding: "10px 15px 10px 15px",
    },
}));
