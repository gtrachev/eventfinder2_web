import React from "react";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import IconButton from "../../styles/styledComponents/Buttons/IconButton";
import ExitButton from "../../styles/styledComponents/Buttons/ExitButton";
import styles from "../../styles/details/_details.module.scss";

const DetailsMap: React.FC<{
  coordinates: [number, number];
  address: string;
  closeMap: () => void;
}> = ({ coordinates, address, closeMap }) => {
  const Map = ReactMapboxGl({
    accessToken: `${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`,
  });
  return (
    <div className={styles.detailsMap}>
      <Map
        style="mapbox://styles/mapbox/streets-v10"
        containerStyle={{
          height: "100%",
          width: "100%",
        }}
        center={coordinates}
        zoom={[14]}
      >
        <Marker coordinates={coordinates} anchor="top-right">
          <div className={styles.eventAddress}>
            <IconButton>
              <i className="fas fa-map-marker-alt primary-text md" />
            </IconButton>
            <p className="secondary-text bg-white">{address}</p>
          </div>
        </Marker>
      </Map>
      <ExitButton className={styles.exitBtn} onClick={closeMap}>
        <i className="fas fa-times xs" />
      </ExitButton>
    </div>
  );
};

export default DetailsMap;
