import { Avatar, Menu, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import Login from "../../Authentication/Login";
import { axiosInstance } from "../../Config/axiosInstance";

const Header = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [anchorE1, setAnchorE1] = React.useState(null);

  const open = Boolean(anchorE1);
  const handleClick = (event) => {
    setAnchorE1(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorE1(null);
  };

  const profileData = () => {
    axiosInstance
      .get("my-profile", { params: { token: localStorage.getItem("token") } })
      .then((response) => setData(response?.data?.[0]));
  };
  console.log(data);
  useEffect(() => {
    profileData();
  }, []);
  const handleLogout = () => {
    localStorage.clear();
    handleClose();
    navigate("../");
  };
  return (
    <div className="min-h-[5vh] flex justify-between items-center bg-white text-red-800 p-2">
      <p>
        <img
          src="https://www.bharatonline.de/cdn/shop/files/indian_grocerylogo_3c72e4a8-47ae-4255-9e65-a5be273b937c_1200x1200.png?v=1629313997"
          alt=""
          className="w-[10%] h-[10%]"
        />
      </p>{" "}
      <span className="flex gap-5">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about-us">About Us</Link>
        <Link to="/contact-us">Contact Us</Link>
        {localStorage.getItem("token") ? (
          <span className="flex gap-2 items-center" onClick={handleClick}>
            <Avatar
              src="dhgd"
              alt={profileData?.data?.[0]?.name}
              className="!h-8 !w-8"
            />{" "}
            <p>{profileData?.data?.[0]?.name}</p>
          </span>
        ) : (
          <Login />
        )}
      </span>
      <Menu
        id="basic-menu"
        anchorEl={anchorE1}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default Header;
