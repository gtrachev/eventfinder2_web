import React from "react";
const loadingGif = `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/v1645732075/interestImages/loading_xsoft5.gif`;

const LoadingContainer: React.FC = () => {
  return (
    <div className="d-flex justify-center w-100">
      <img src={loadingGif} alt="Loading..." />
    </div>
  );
};

export default LoadingContainer;
