import React from "react";
import Navbar from "../components/common/Navbar";
import SideBar from "../components/common/SideBar";

function HotelLayout({children}) {
  return (
    <React.Fragment>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <SideBar />
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
            {children}
          </main>
        </div>
      </div>
    </React.Fragment>
  );
}

export default HotelLayout;
