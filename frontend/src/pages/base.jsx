import { Helmet } from "react-helmet-async";
import { Link, Outlet } from "react-router-dom";
import Head from "../components/Head";
import "../styles/base.css";
import "../styles/responsive.css";

export default function Base() {
    return (
        <div>
            <Head title="Sabrosa Health" />
            <header>
                <div className="logosec">
                    <Link to="/" className="logo">
                        Sabrosa Health
                    </Link>
                </div>

                <div className="searchbar">
                    <input type="text" placeholder="Search" />
                    <div className="searchbtn">
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </div>
                </div>

                <div className="message">
                    <div className="dp">
                        <img
                            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180014/profile-removebg-preview.png"
                            className="dpicn"
                            alt="dp"
                        />
                    </div>
                </div>
            </header>

            <div className="main-container">
                <div className="navcontainer">
                    <nav className="nav">
                        <div className="nav-upper-options">
                            <Link to="/" className="nav-option">
                                <i
                                    className="fa fa-tachometer"
                                    aria-hidden="true"
                                ></i>
                                <h3>Dashboard</h3>
                            </Link>
                            <Link to="/goals" className="nav-option">
                                <i
                                    className="fa fa-bullseye"
                                    aria-hidden="true"
                                ></i>
                                <h3>Goals</h3>
                            </Link>
                            <Link to="/progress" className="nav-option">
                                <i
                                    className="fa fa-pie-chart"
                                    aria-hidden="true"
                                ></i>
                                <h3>Progress</h3>
                            </Link>
                            <Link to="/track" className="nav-option">
                                <i
                                    className="fa fa-pencil-square"
                                    aria-hidden="true"
                                ></i>
                                <h3>Track</h3>
                            </Link>
                            <Link to="/profile" className="nav-option">
                                <i
                                    className="fa fa-user"
                                    aria-hidden="true"
                                ></i>
                                <h3>Profile</h3>
                            </Link>
                            <Link to="/settings" className="nav-option">
                                <i className="fa fa-cog" aria-hidden="true"></i>
                                <h3>Settings</h3>
                            </Link>
                            <div
                                class="nav-option logout"
                                onClick={() => {
                                    alert("put logout functionality here");
                                }}
                            >
                                <i
                                    class="fa fa-sign-out"
                                    aria-hidden="true"
                                ></i>
                                <h3>Logout</h3>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className="main">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
