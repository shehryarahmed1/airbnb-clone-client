import { React, useState, useRef } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 37.4219999,
  lng: -122.0840575,
};

const Map = () => {
  const [currentCenter, setCurrentCenter] = useState(center);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAo-Ei3qi2jEvM2cOgBBeXfkHtNC5zehr4",
  });
  const mapRef = useRef();

  const onLoad = (map) => {
    setCurrentCenter(map.getCenter().toJSON());
  };

  const onCenterChanged = (map) => {
    setCurrentCenter(map.getCenter().toJSON());
  };

  return isLoaded ? (
    <GoogleMap
      ref={mapRef}
      mapContainerStyle={mapContainerStyle}
      center={currentCenter}
      zoom={8}
      onLoad={onLoad}
      onCenterChanged={onCenterChanged}
    />
  ) : (
    "Loading map..."
  );
};

export default Map;
