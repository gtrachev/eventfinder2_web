import React from "react";
import IconButton from "../../styles/styledComponents/Buttons/IconButton";

const Footer: React.FC = () => {
  return (
    <footer className="w-100 p-1 mt-auto bg-primary light-text d-flex justify-between">
      <p className="xs">
        <i className="far fa-copyright mr-05 xs" />
        EventFinder
      </p>
      <div className="d-flex gapX-1">
        <IconButton className="light-text">
          <i className="fab fa-facebook s" />
        </IconButton>
        <IconButton className="light-text">
          <i className="fab fa-github s" />
        </IconButton>
        <IconButton className="light-text">
          <i className="fab fa-instagram s" />
        </IconButton>
      </div>
    </footer>
  );
};

export default Footer;
