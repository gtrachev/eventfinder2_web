import React from "react";
import loadingGif from "../../images/loading.gif";

const LoadingContainer: React.FC = () => {
  return (
    <div className="d-flex justify-center w-100">
      <img src={loadingGif} alt="Loading..." />
    </div>
  );
};

export default LoadingContainer;
