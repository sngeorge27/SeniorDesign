import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

export default function Dashboard() {
    const { token } = useAuth();
    const [user, setUser] = useState();

    useEffect(() => {
        axios({
            method: "GET",
            url: "/api/user",
            headers: {
                Authorization: "Bearer " + token,
            },
        })
            .then((response) => {
                const res = response.data;
                setUser(res);
                console.log(user);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });
    }, []);

    return (
        <div className="w-full h-full flex flex-col">
            {user && (
                <div>
                    <h1 className="font-bold text-2xl">
                        Welcome {user ? user.firstName : ""}!
                    </h1>
                    <p>
                        Name: {user.firstName} {user.lastName}
                    </p>
                    <p>Email: {user.email}</p>
                    <p>Sex: {user.sex}</p>
                    <p>Age: {user.age}</p>
                </div>
            )}
        </div>
    );
}
