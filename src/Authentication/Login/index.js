import { Close } from "@mui/icons-material";
import { Button, Dialog } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../Config/axiosInstance";

const LoginPage = () => {
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOTP] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const sendOTP = async () => {
    try {
      const responseLogin = await axiosInstance.post("login/", {
        mobile_number: mobileNumber,
      });
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const verifyOTP = async () => {
    console.log("hii");
    try {
      const response = await axiosInstance.post("verify-login-otp/", {
        mobile_otp: otp,
        mobile_number: mobileNumber,
        type: "web",
        registration_token: "",
      });
      console.log(response);
      localStorage.setItem("token", response?.data?.token);
      localStorage.setItem("name", response?.data?.user_full_name);
      localStorage.setItem("mobile", response?.data?.mobile);
      navigate("../Profile");
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>Login</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{ className: "w-full h-3/6" }}
      >
        <div className="relative p-5">
          <Close
            className="!absolute top-1 right-1 text-red-300 hover:text-red-900 cursor-pointer"
            onClick={handleClose}
          />
        </div>
        <div className="flex gap-4">
          <div>
            <img
              src="https://img.freepik.com/free-vector/woman-with-shopping-bags-park_24877-52700.jpg?w=740&t=st=1693757326~exp=1693757926~hmac=22547d7c4d5bc412cdab534993670c89c741a0f50e0d986e0b57a58d099705b1"
              alt="hii"
              className="h-72"
            />
          </div>
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Mobile Number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="border border-black"
            />
            <button onClick={sendOTP}>Send OTP</button>
            <br />
            <input
              type="text"
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              className="border border-black"
            />
            <button onClick={verifyOTP}>Verify OTP</button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default LoginPage;
