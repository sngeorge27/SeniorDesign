import HeadMetadata from "../components/HeadMetadata";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/Header";
import CheckBox from "../components/CheckBox";

export default function Profile() {
    const { user, setUser } = useAuth();

    // const [profileForm, setprofileForm] = useState({
    //     firstName: "",
    //     lastName: "",
    //     macroRatio: "",
    //     age: "",
    //     sex: "",
    //     isPregnant: false,
    //     isLactating: false,
    // });

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
                    <p>Username: {user.username}</p>
                    <p>Sex: {user.sex}</p>
                    <p>Age: {user.age}</p>
                </div>
            )}
        </div>
    );
}
