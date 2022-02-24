import React from "react";
import styles from "../../styles/discover/_discoverSort.module.scss";

const DiscoverSort: React.FC<{
  setSort: React.Dispatch<
    React.SetStateAction<{
      sortBy: string;
      sort: string;
    }>
  >;
}> = ({ setSort }) => {
  return (
    <div className={`mx-05 mt-1 d-flex gapX-3 justify-center ${styles.discoverSort}`}>
      <div>
        <p className="s secondary-text">By date</p>
        <button
          className={`${styles.sortOption} secondary-text my-05`}
          onClick={() => setSort({ sortBy: "date", sort: "1" })}
        >
          <span className="xs primary-text">
            Sooner to later <i className="xs fas fa-plus" />
          </span>
        </button>
        <button
          className={`${styles.sortOption} secondary-text`}
          onClick={() => setSort({ sortBy: "date", sort: "-1" })}
        >
          <span className="xs primary-text">
            Later to sooner <i className="xs fas fa-minus" />
          </span>
        </button>
      </div>
      <div>
        <p className="s secondary-text">By price</p>
        <button
          className={`${styles.sortOption} secondary-text my-05`}
          onClick={() => setSort({ sortBy: "price", sort: "1" })}
        >
          <span className="xs primary-text">
            Ascending <i className="xs fas fa-plus" />
          </span>
        </button>
        <button
          className={`${styles.sortOption} secondary-text`}
          onClick={() => setSort({ sortBy: "price", sort: "-1" })}
        >
          <span className="xs primary-text">
            Descending <i className="xs fas fa-minus" />
          </span>
        </button>
      </div>
      <div>
        <p className="s secondary-text">By popularity</p>
        <button
          className={`${styles.sortOption} secondary-text my-05`}
          onClick={() => setSort({ sortBy: "attenders", sort: "-1" })}
        >
          <span className="xs primary-text">
            Descending <i className="xs fas fa-minus" />
          </span>
        </button>
        <button
          className={`${styles.sortOption} secondary-text`}
          onClick={() => setSort({ sortBy: "attenders", sort: "-1" })}
        >
          <span className="xs primary-text">
            Ascending <i className="xs fas fa-minus" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default DiscoverSort;
