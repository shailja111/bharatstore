import React from "react";
import Header from "../Shared/Header/index";
import Footer from "../Shared/Footer/index";

const Layout = ({ component }) => {
  return (
    <div>
      <Header />
      {component}
      <Footer />
    </div>
  );
};

export default Layout;
