import React, { useEffect, useState } from "react";
import axios from "axios";
import Room from "./Room";
import Pagination from "./Pagination";
import Selection from "./Selection";
import ForceRoomEnd from "./ForceRoomEnd";
import ExploreMap from "./ExploreMap";

const Rooms = ({
  roomType,
  setRoomtype,
  expand,
  setExpand,
  cat,
  setCat,
  showProfile,
  setShowProfile,
  locationInp,
  setLocationInp,
  theEnd,
  setTheEnd,
  rooms,
  setRooms,
  loading,
  setLoading,
  Selectionloading,
  setSelectionloading,
  page,
  setPage,
  order,
  setOrder,
  sort,
  setSort,
  guests,
  setGuests,
  latitude,
  setLatitude,
  longitude,
  setLongitude,
}) => {
  const [currlatitude, setcurrLatitude] = useState("");
  const [currlongitude, setcurrLongitude] = useState("");
  const [showMap, setShowMap] = useState(false);

  const n = 8; // Number to repeat the loading rooms placeholder
  const b = 13; // Number to repeat the loading category placeholder

  useEffect(() => {
    if (!showMap) {
      setRooms([]);
      setLoading(true);
      setPage(1);
      setTheEnd(false);
    }
  }, [cat]);

  useEffect(() => {
    console.log(page);
  }, [page]);

  useEffect(() => {
    console.log(locationInp);
  }, [locationInp]);

  useEffect(() => {
    if (!theEnd || !showMap) {
      axios
        .get(
          `http://localhost:7000/api/main?page=${page}&sort=${sort},${order}&type=${roomType}&cat=${cat}&place=${locationInp}&guests=${guests}`
        )
        .then((response) => {
          setRooms((oldRooms) => [...oldRooms, ...response.data.rooms]);
          if (response.data.rooms.length === 0) {
            setTheEnd(true);
          }
          setLoading(false);
          setSelectionloading(false);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    } else {
      console.log("The end");
    }
  }, [page, cat]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
        setcurrLatitude(position.coords.latitude);
        setcurrLatitude(position.coords.longitude);
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
      });
    }
  }, []);
  const onScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      setPage(page + 1);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [rooms]);

  function TextAbstract(text, length) {
    let last;
    if (text == null) {
      return "";
    }
    if (text.length <= length) {
      return text;
    }
    text = text.substring(0, length);
    last = text.lastIndexOf(" ");
    text = text.substring(0, last);
    return text + "...";
  }

  return (
    <>
      {Selectionloading ? (
        <div className="flex space-x-14 mx-9 mt-5">
          {[...Array(b)].map((e, i) => (
            <div className="animate-pulse  ">
              <div className="h-7 w-7 bg-gray-300 rounded-full mx-auto"></div>
              <div className="bg-gray-300 h-1  w-10 mt-2 rounded-full"></div>
            </div>
          ))}
          <br />
          <br />
          <br />
          {/* <br /> */}
        </div>
      ) : (
        <>
          <div className="shadow 2md:shadow-none">
            <Selection
              roomType={roomType}
              setRoomtype={setRoomtype}
              showProfile={showProfile}
              setShowProfile={setShowProfile}
              expand={expand}
              cat={cat}
              setCat={setCat}
              Selectionloading={Selectionloading}
              setSelectionloading={setSelectionloading}
            />
          </div>
        </>
      )}

      <>
        <div className={`${expand ? "opacity-80" : ""}`}>
          <div className=" md:-mt-5    grid grid-cols-1   mx-7 gap-6 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4       ">
            {loading ? (
              <>
                {[...Array(n)].map((e, i) => (
                  <>
                    <div className="m-auto  my-4        animate-pulse ">
                      <div className="top m-auto ">
                        <img
                          src="https://www.colorhexa.com/d1d5db.png"
                          alt=""
                          className="object-none rounded-2xl  h-80 w-96  bg-gray-300    "
                        />
                      </div>

                      <div className="grid grid-cols-3  gap-4  my-2  ">
                        <div className="h-5 bg-gray-300 rounded col-span-2 "></div>
                        <div className="h-5 bg-gray-300 rounded col-span-1  "></div>
                      </div>
                      <div className="h-5 bg-gray-300 rounded w-32  "></div>
                      <div className="h-5 bg-gray-300 rounded w-16 my-2  "></div>
                    </div>
                  </>
                ))}
              </>
            ) : (
              <>
                {rooms.length > 0 ? (
                  <>
                    {showMap ? (
                      <>
                        <ExploreMap
                          latitude={latitude}
                          setLatitude={setLatitude}
                          longitude={longitude}
                          setLongitude={setLongitude}
                          locationInp={locationInp}
                        />
                      </>
                    ) : (
                      <>
                        {rooms.map((room) => (
                          <>
                            <Room
                              room={room}
                              expand={expand}
                              currlatitude={currlatitude}
                              currlongitude={currlongitude}
                              TextAbstract={TextAbstract}
                            />
                          </>
                        ))}
                      </>
                    )}
                  </>
                ) : (
                  <div className="   my-20">
                    <h1 className="text-xl   font-semibold ">No rooms found</h1>
                    <ForceRoomEnd theEnd={theEnd} setTheEnd={setTheEnd} />
                  </div>
                )}
              </>
            )}{" "}
          </div>
          {/* <div className="m-auto w-44  mt-7 ">
            <Pagination page={page} setPage={setPage} rooms={rooms} />
            <br />
          </div> */}
        </div>
      </>

      {rooms?.length > 0 ? (
        <div
          onClick={() => {
            setShowMap((prevCheck) => !prevCheck);
          }}
          class=" inset-x-0 sticky cursor-pointer  py-2.5 mx-auto w-36  bottom-16 h-12 ...      bg-[#222222] rounded-3xl"
        >
          <p className="text-white font-medium text-center select-none">
            {showMap ? (
              <>
                Show list&nbsp;<i class="fa-solid fa-list"></i>
              </>
            ) : (
              <>
                Show map&nbsp;<i class="fa-solid fa-map"></i>
              </>
            )}
          </p>
        </div>
      ) : null}
    </>
  );
};

export default Rooms;
