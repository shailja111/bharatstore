import Layout from "../Layout";
import Home from "../Shared/Home";
import Profile from "../Authentication/Profile/index";
import Login from "../Authentication/Login/index";

export const routes = [
  {
    id: 1,
    path: "/",
    element: <Layout component={<Home />} />,
  },
  {
    id: 2,
    path: "/profile",
    element: <Layout component={<Profile />} />,
  },
  {
    id: 3,
    path: "/login",
    element: <Layout component={<Login />} />,
  },
];
