import React, { useState } from "react";
import { useLocation } from "react-router";
import { CSSTransition } from "react-transition-group";
import DiscoverFilters from "../components/discover/DiscoverFilters";
import DiscoverOptions from "../components/discover/DiscoverOptions";
import DiscoverSearchInput from "../components/discover/DiscoverSearchInput";
import DiscoverEventsList from "../components/discover/DiscoverEventsList";
import Flash from "../components/flash/Flash";
import styles from "../styles/discover/_discover.module.scss";

const Discover: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [sort, setSort] = useState({ sortBy: "", sort: "" });
  const apiUrl =
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://eventfinder2-server.herokuapp.com";
  const [fetchUrl, setFetchUrl] = useState(
    `${apiUrl}/api/events/popular_events`
  );
  const handleShowFilters = () => {
    setShowFilters((prevShowFilters) => !prevShowFilters);
  };
  const search = useLocation().search;
  const filters = {
    title: new URLSearchParams(search).get("search") || "",
    interests: new URLSearchParams(search).get("interests") || "",
    price: new URLSearchParams(search).get("price") || "",
    ageGroup: new URLSearchParams(search).get("ageGroup") || "",
    city: new URLSearchParams(search).get("city") || "",
    country: new URLSearchParams(search).get("country") || "",
  };

  return (
    <div className="pos-relative">
      <div className={`w-70 mx-auto mt-2 ${styles.flashContainer}`}>
        <Flash />
      </div>
      <DiscoverSearchInput
        handleShowFilters={handleShowFilters}
        setFetchUrl={setFetchUrl}
        filters={filters}
        sort={sort}
        setSort={setSort}
        showFilters={showFilters}
      />
      <DiscoverOptions setFetchUrl={setFetchUrl} />
      <div className="pos-relative d-flex align-start">
        <CSSTransition
          in={showFilters}
          timeout={200}
          unmountOnExit
          classNames={{
            enter: styles.showFiltersEnter,
            enterActive: styles.showFiltersEnterActive,
            exit: styles.showFiltersExit,
            exitActive: styles.showFiltersExitActive,
          }}
        >
          <DiscoverFilters setFetchUrl={setFetchUrl} />
        </CSSTransition>
        <DiscoverEventsList fetchUrl={fetchUrl} sort={sort} />
      </div>
    </div>
  );
};

export default Discover;
