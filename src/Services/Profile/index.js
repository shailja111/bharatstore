import { axiosInstance } from "../../Config/axiosInstance";

export const profileFn = (reqbody) => {
  try {
    const response = axiosInstance.get("my-profile", { params: reqbody });
    return response;
  } catch (error) {
    console.log(error);
  }
};
