import React from "react";
import { Sidebar } from "../Sidebar/Sidebar";

export const Layout = ({ children }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">
            <h1 className="text-center border-bottom border-2 border-dark py-3 mb-4"> Anvaya CRM Dashboard  </h1> 
          {children}
        </main>
      </div>
    </div>
  );
};
