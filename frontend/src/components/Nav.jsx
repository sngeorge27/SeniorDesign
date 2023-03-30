import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import { useState } from "react";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

export default function Nav() {
    const { onLogout } = useAuth();

    function logout() {
        axios({
            method: "POST",
            url: "/api/logout",
        })
            .then(() => {
                onLogout();
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });
    }

    return (
        <nav className="flex flex-col bg-cyan-800 w-[70px] p-4 justify-between">
            <div className="flex flex-col items-center">
                <NavItem href="/" icon="fa-house" label="Dashboard" />
                <NavItem href="/goals" icon="fa-bullseye" label="Goals" />
                <NavItem href="/track" icon="fa-pencil-square" label="Track" />
                <NavItem href="/profile" icon="fa-user" label="Profile" />
            </div>
            <div className="flex flex-col items-center">
                <NavItem
                    icon="fa-sign-out"
                    label="Logout"
                    isAction={true}
                    actionCallback={logout}
                />
            </div>
        </nav>
    );
}

const NavItem = ({ href, icon, label, isAction = false, actionCallback }) => {
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
                    className="py-3 text-xl transition-all text-gray-100 hover:text-gray-300 cursor-pointer"
                >
                    <i className={`fa ${icon}`} aria-hidden="true"></i>
                </div>
            </NavTooltip>
        );
    }
    return (
        <NavLink
            to={href}
            className={({ isActive }) =>
                isActive
                    ? "py-3 text-xl transition-all text-yellow-400 hover:text-yellow-500"
                    : "py-3 text-xl transition-all text-gray-100 hover:text-gray-300"
            }
        >
            <NavTooltip
                title={label}
                arrow
                placement="right"
                enterDelay={0}
                className="cursor-pointer"
            >
                <i className={`fa ${icon}`} aria-hidden="true"></i>
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
