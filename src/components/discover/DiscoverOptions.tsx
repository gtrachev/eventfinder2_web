import React, { useState } from "react";
import styles from "../../styles/discover/_discover.module.scss";

const DiscoverOptions: React.FC<{
  setFetchUrl: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setFetchUrl }) => {
  const [activeOption, setActiveOption] = useState(1);
  const handleOptionClick: (optionNum: number, fetchUrl: string) => void = (
    optionNum,
    fetchUrl
  ) => {
    setActiveOption(optionNum);
    setFetchUrl(fetchUrl);
  };
  const apiUrl =
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://eventfinder2-server.herokuapp.com";
  return (
    <div
      className={`mx-auto d-flex justify-between ${styles.optionsContainer}`}
    >
      <button
        className={`${styles.discoverOption} ${
          activeOption === 0 && styles.discoverOptionActive
        }`}
        onClick={() =>
          handleOptionClick(0, `${apiUrl}/api/events/close_events`)
        }
      >
        <p>Events around you</p>
      </button>
      <button
        className={`${styles.discoverOption} ${
          activeOption === 1 && styles.discoverOptionActive
        }`}
        onClick={() =>
          handleOptionClick(1, `${apiUrl}/api/events/popular_events`)
        }
      >
        <p>Most popular events</p>
      </button>
      <button
        className={`${styles.discoverOption} ${
          activeOption === 2 && styles.discoverOptionActive
        }`}
        onClick={() =>
          handleOptionClick(2, `${apiUrl}/api/events/interest_events`)
        }
      >
        <p>Events you may like</p>
      </button>
    </div>
  );
};

export default DiscoverOptions;
