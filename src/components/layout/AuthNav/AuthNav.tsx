import React from "react";
import StyledNav from "../../../styles/styledComponents/Layout/StyledNav";
import IconButton from "../../../styles/styledComponents/Buttons/IconButton";

const AuthNav: React.FC = () => {
  return (
    <StyledNav showMobile={false}>
      <div className="top-nav px-1 py-05 d-flex white-text container">
        <h1 className="mr-auto md">EventFinder</h1>
        <div>
          <IconButton className="d-flex">
            <i className="fas fa-cog white-text s" />
          </IconButton>
        </div>
      </div>
    </StyledNav>
  );
};

export default AuthNav;
