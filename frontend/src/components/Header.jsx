import { NavLink } from "react-router-dom";

export default function Header() {
    return (
        <header>
            <div className="logosec">
                <NavLink to="/" className="logo">
                    Sabrosa Health
                </NavLink>
            </div>

            <div className="searchbar">
                <input type="text" placeholder="Search" />
                <div className="searchbtn text-white">
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
    );
}
