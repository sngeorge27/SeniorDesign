import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

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
        <div className="navcontainer">
            <nav className="nav">
                <div className="nav-upper-options">
                    <NavLink to="/" className="nav-option">
                        <i className="fa fa-tachometer" aria-hidden="true"></i>
                        <h3>Dashboard</h3>
                    </NavLink>
                    <NavLink to="/goals" className="nav-option">
                        <i className="fa fa-bullseye " aria-hidden="true"></i>
                        <h3>Goals</h3>
                    </NavLink>
                    <NavLink to="/progress" className="nav-option">
                        <i className="fa fa-pie-chart" aria-hidden="true"></i>
                        <h3>Progress</h3>
                    </NavLink>
                    <NavLink to="/track" className="nav-option">
                        <i
                            className="fa fa-pencil-square"
                            aria-hidden="true"
                        ></i>
                        <h3>Track</h3>
                    </NavLink>
                    <NavLink to="/profile" className="nav-option">
                        <i className="fa fa-user" aria-hidden="true"></i>
                        <h3>Profile</h3>
                    </NavLink>
                    <NavLink to="/settings" className="nav-option">
                        <i className="fa fa-cog" aria-hidden="true"></i>
                        <h3>Settings</h3>
                    </NavLink>
                    <div className="nav-option logout" onClick={logout}>
                        <i className="fa fa-sign-out" aria-hidden="true"></i>
                        <h3>Logout</h3>
                    </div>
                </div>
            </nav>
        </div>
    );
}
