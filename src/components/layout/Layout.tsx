import React from "react";
import Footer from "./Footer";
import Nav from "./Nav/Nav";
import Overlay from "./Overlay";

const Layout: React.FC = ({ children }) => {
  return (
    <div className="body-container">
      <Nav />
      <main className="of-hidden container">{children}</main>
      <Footer />
      <Overlay />
    </div>
  );
};

export default Layout;
