import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../components/Config/axiosInstance";
import { useFormik } from "formik";
import {
  Avatar,
  Button,
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const Profile = () => {
  const [data, setData] = useState({});
  const [isEnable, setIsEnable] = useState(true);
  const token = localStorage.getItem("token");

  const profileData = () => {
    axiosInstance
      .get("profile", { params: { token: token } })
      .then((res) => setData(res?.data?.[0]));
  };
  useEffect(() => {
    profileData();
  }, []);
  const formik = useFormik({
    initialValues: {
      name: data?.name,
      email: data?.email,
      phone: data?.phone,
      dob: data?.dob,
      gender: data?.gender || "",
      city: data?.city,
      state: data?.state,
      country: data?.country,
      zipcode: data?.zipcode,
    },
    enableReinitialize: true,
    onSubmit: async () => {
      try {
        const response = await axiosInstance.put("profile", {
          id: localStorage.getItem("id"),
          ...formik.values,
        });
      } catch (error) {}
      console.log("form Submiited");
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="flex flex-col  gap-2">
        <div
          className="h-28 w-28  rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center"
          style={{
            backgroundImage: 'url("https://source.unsplash.com/80x80?face")',
          }}
        >
          <span className="sr-only">Marc Backes</span>
        </div>
        <TextField
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          disabled={isEnable}
        />
        <TextField
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          disabled={isEnable}
          fullWidth
        />
        <TextField
          id="phone"
          name="phone"
          label="Enter your phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          disabled={isEnable}
          fullWidth
        />
        <TextField
          id="dob"
          name="dob"
          type="date"
          value={formik.values.dob}
          onChange={formik.handleChange}
          disabled={isEnable}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel id="gender">Gender</InputLabel>
          <Select
            id="gender"
            name="gender"
            label="Gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            disabled={isEnable}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Others">Others</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="city"
          name="city"
          label="Enter your city"
          value={formik.values.city}
          onChange={formik.handleChange}
          disabled={isEnable}
          fullWidth
        />
        <TextField
          id="state"
          name="state"
          label="Enter your state"
          value={formik.values.state}
          onChange={formik.handleChange}
          disabled={isEnable}
          fullWidth
        />
        <TextField
          id="country"
          name="country"
          label="Enter your country"
          value={formik.values.country}
          onChange={formik.handleChange}
          disabled={isEnable}
          fullWidth
        />
        <TextField
          id="zipcode"
          name="zipcode"
          label="Enter your zipcode"
          value={formik.values.zipcode}
          onChange={formik.handleChange}
          disabled={isEnable}
          fullWidth
        />

        <Button
          type={!isEnable ? "button" : "submit"}
          onClick={() => setIsEnable(!isEnable)}
        >
          {isEnable ? "Edit" : "Save"}
        </Button>
      </form>
    </>
  );
};

export default Profile;
