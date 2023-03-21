import HeadMetadata from "../components/HeadMetadata";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/Header";

export default function Profile() {
    const { token } = useAuth();
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        axios({
            method: "GET",
            url: "/api/profile",
            headers: {
                Authorization: "Bearer " + token,
            },
        })
            .then((response) => {
                const res = response.data;
                setProfileData({
                    profile_name: res.name,
                    about_me: res.about,
                });
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
        <div>
            <HeadMetadata title="Profile" />
            <Header title="Profile" showProfile={false}></Header>
            {profileData && (
                <div className="p-4">
                    <p>
                        <strong>Profile name: &nbsp;</strong>
                        {profileData.profile_name}
                    </p>
                    <p>
                        <strong>About me: &nbsp;</strong> {profileData.about_me}
                    </p>
                </div>
            )}
        </div>
    );
}
