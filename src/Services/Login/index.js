import { axiosInstance } from "../../Config/axiosInstance";

export const loginFn = (reqbody) => {
  try {
    const response = axiosInstance.post("login", reqbody);
    return response;
  } catch (error) {
    console.log(error);
  }
};
