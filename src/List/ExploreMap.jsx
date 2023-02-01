import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import "./exploremap.css";
const ExploreMap = ({
  latitude,
  setLatitude,
  longitude,
  setLongitude,
  locationInp,
}) => {
  const [mapPointers, setMapPointers] = useState([]);
  useEffect(() => {
    if (locationInp == "") {
      // console.log("empty");
      navigator.geolocation.getCurrentPosition(function (position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
      });
    }
  }, [locationInp]);
  useEffect(() => {
    for (let index = 0; index < mapPointers.length; index++) {
      const element = mapPointers[index];
      // console.log(element.latitude);
      // console.log(element.longitude);
    }
  }, [mapPointers]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAo-Ei3qi2jEvM2cOgBBeXfkHtNC5zehr4",
  });
  useEffect(() => {
    axios
      .get(`http://localhost:7000/api/map/pointers`)
      .then((response) => {
        setMapPointers(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);
  return (
    <div
      style={{
        backgroundColor: "white",
        color: "black",
      }}
    >
      {isLoaded ? (
        <GoogleMap
          zoom={13}
          center={{ lat: latitude, lng: longitude }}
          mapContainerClassName="h-screen -mx-8  w-screen"
        >
          <MarkerF position={{ lat: latitude, lng: longitude }} />
          {mapPointers.map((marker) => (
            <MarkerF
              onClick={() => {
                window.location.href = `/room/${marker._id}`;
              }}
              icon={{
                url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
              }}
              position={{
                lat: Number(marker.latitude),
                lng: Number(marker.longitude),
              }}
            />
          ))}
        </GoogleMap>
      ) : (
        <>Loading</>
      )}
    </div>
  );
};

export default ExploreMap;
