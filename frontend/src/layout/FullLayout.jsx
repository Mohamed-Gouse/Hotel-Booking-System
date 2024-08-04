import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

function FullLayout({ children }) {
  return (
    <React.Fragment>
      <Header />
      <main>{children}</main>
      <Footer />
    </React.Fragment>
  );
}

export default FullLayout;
