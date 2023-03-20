import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import HeadMetadata from "../components/HeadMetadata";
import Nav from "../components/Nav";
import useToken from "../hooks/useToken";
import { redirect } from "react-router-dom";

export default function Base() {
    const { token, removeToken, setToken } = useToken();

    if (!token && token !== "" && token !== undefined) {
        redirect("/login");
    }

    return (
        <div>
            <HeadMetadata title="Sabrosa Health" />
            <Header />
            <div className="main-container">
                <Nav token={removeToken} />
                <div className="main">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}