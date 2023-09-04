import axios from "axios";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../Config/axiosInstance";

const ProfilePage = () => {
  const [proData, setProData] = useState({});
  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    date_of_birth: "",
    profile_picture: "",
  });

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `https://storebh.bhaaraterp.com/api/my-profile/`,
        {
          headers: {
            Token: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      setProData(response?.data?.data?.profile_data[0]);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };
  useEffect(() => {
    // Fetch profile data using the provided token
    fetchProfile();
  }, []);

  console.log(proData);

  const handleUpdateProfile = async () => {
    try {
      const response = await axiosInstance
        .post("update-profile/", {
          first_name: profileData.first_name,
          last_name: profileData.last_name,
          email: profileData.email,
          gender: profileData.gender,
          date_of_birth: profileData.date_of_birth,
          profile_picture: profileData.profile_picture,
        })
        .then((response) => {});
    } catch (error) {
      console.error("Error updating profile data:", error);
    }
  };

  return (
    <div>
      <h1>Profile Page</h1>
      <div>
        <label>First Name:</label>
        <p>{proData.first_name}</p>
        <input
          type="text"
          value={profileData.first_name}
          onChange={(e) =>
            setProfileData({ ...profileData, first_name: e.target.value })
          }
          className="border border-black"
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          value={profileData.last_name}
          onChange={(e) =>
            setProfileData({ ...profileData, last_name: e.target.value })
          }
          className="border border-black"
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="text"
          value={profileData.email}
          onChange={(e) =>
            setProfileData({ ...profileData, email: e.target.value })
          }
          className="border border-black"
        />
      </div>
      <div>
        <label>Gender:</label>
        <input
          type="text"
          value={profileData.gender}
          onChange={(e) =>
            setProfileData({ ...profileData, gender: e.target.value })
          }
          className="border border-black"
        />
      </div>
      <div>
        <label>Date of Birth:</label>
        <input
          type="text"
          value={profileData.date_of_birth}
          onChange={(e) =>
            setProfileData({ ...profileData, date_of_birth: e.target.value })
          }
          className="border border-black"
        />
      </div>
      <div>
        <label>Profile Picture:</label>
        <input
          type="text"
          value={profileData.profile_picture}
          onChange={(e) =>
            setProfileData({ ...profileData, profile_picture: e.target.value })
          }
          className="border border-black"
        />
      </div>
      <button onClick={handleUpdateProfile}>Update Profile</button>
    </div>
  );
};

export default ProfilePage;
