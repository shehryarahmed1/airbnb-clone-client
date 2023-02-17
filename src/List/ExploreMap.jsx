import React, { useState, useRef } from "react";
import { useEffect } from "react";
import axios from "axios";
import {
  GoogleMap,
  useLoadScript,
  LoadScript,
  MarkerF,
  InfoWindowF,
  InfoWindow,
} from "@react-google-maps/api";
import "./exploremap.css";

const ExploreMap = ({
  latitude,
  setLatitude,
  longitude,
  setLongitude,
  locationInp,
}) => {
  const [mapPointers, setMapPointers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

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
  }, []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAo-Ei3qi2jEvM2cOgBBeXfkHtNC5zehr4",
  });

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      latitude: latitude,
      longitude: longitude,
    };

    axios
      .get("http://localhost:7000/api/map/pointers", { headers })
      .then((response) => {
        for (let index = 0; index < mapPointers.length; index++) {
          const element = mapPointers[index];
          console.log("latitude");
          console.log(element.location.coordinates[1]);
        }
        setMapPointers(response.data.rooms);
        console.log(response);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
    console.log(latitude);
    console.log(longitude);
  }, [latitude, longitude]);
  return (
    <div
      style={{
        backgroundColor: "white",
        color: "black",
      }}
    >
      {isLoaded ? (
        <GoogleMap
          center={{ lat: latitude, lng: longitude }}
          zoom={13}
          mapContainerClassName="h-screen -mx-8  w-screen"
        >
          <MarkerF position={{ lat: latitude, lng: longitude }}></MarkerF>
          {mapPointers?.map((marker) => (
            <MarkerF
              icon={{
                url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
              }}
              onClick={() => setSelectedMarker(marker)}
              position={{
                lat: Number(marker.location.coordinates[1]),
                lng: Number(marker.location.coordinates[0]),
              }}
            >
              {selectedMarker?.location.coordinates[1] ==
                marker.location.coordinates[1] &&
              selectedMarker?.location.coordinates[0] ==
                marker.location.coordinates[0] ? (
                <InfoWindowF>
                  <div>
                    <img
                      src={marker.images[0]}
                      alt=""
                      className="object-cover rounded-md  h-32 w-56  bg-gray-700    border border-gray-300"
                    />
                    <p className="text-sm mt-3 mx-2 font-medium">
                      {marker.place}
                    </p>
                    <p className="flex items-center">
                      <p className="my-1 mx-2 text-sm font-medium">
                        ${marker.price}
                      </p>
                      <p className="text-sm mt-0.5 text-gray-500">night</p>
                    </p>
                    <p
                      onClick={() => {
                        window.location.href = `/room/${marker._id}`;
                      }}
                      className="text-sm mx-2 underline font-medium cursor-pointer"
                    >
                      View place
                    </p>
                  </div>
                </InfoWindowF>
              ) : null}
            </MarkerF>
          ))}
        </GoogleMap>
      ) : (
        <>Loading</>
      )}
    </div>
  );
};

export default ExploreMap;
