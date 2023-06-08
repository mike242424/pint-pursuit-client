import { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const Map = ({ latitude, longitude }) => {
  const [viewport, setViewport] = useState({
    latitude: latitude,
    longitude: longitude,
    zoom: 10,
  });

  return (
    <div className="map">
      <ReactMapGL
        initialViewState={viewport}
        style={{ width: "100%", height: "40vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        attributionControl={false}
        mapboxAccessToken={TOKEN}
      >
        <Marker
          latitude={latitude}
          longitude={longitude}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <FontAwesomeIcon
            className="text-primary"
            icon={faLocationDot}
            size="2xl"
          />
        </Marker>
      </ReactMapGL>
    </div>
  );
};

export default Map;
