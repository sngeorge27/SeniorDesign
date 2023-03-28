import HeadMetadata from "../components/HeadMetadata";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/Header";
import { apiBaseURL } from "../constants";

export default function Profile() {
    const { token } = useAuth();
    const [user, setUser] = useState();

    useEffect(() => {
        getUser(setUser, token);
    }, []);

    return (
        <div className="w-full h-full">
            <HeadMetadata title="Profile" />
            <Header title="Profile" showProfile={false}></Header>
            {user && (
                <div className="p-8">
                    <h1 className="font-bold text-2xl"></h1>
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

function getUser(setUser, token) {
    axios({
        method: "GET",
        url: apiBaseURL + "/api/user",
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
}
