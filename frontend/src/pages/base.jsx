import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import HeadMetadata from "../components/HeadMetadata";
import Nav from "../components/Nav";

export default function Base() {
    return (
        <div>
            <HeadMetadata title="Sabrosa Health" />
            <Header />
            <div className="main-container">
                <Nav />
                <div className="main">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
