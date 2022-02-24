import React from "react";
import AuthNav from "./AuthNav/AuthNav";
import Footer from "./Footer";

const AuthLayout: React.FC = ({ children }) => {
  return (
    <div className="body-container">
      <AuthNav />
      <main className="of-hidden container">{children}</main>
      <Footer />
    </div>
  );
};

export default AuthLayout;
