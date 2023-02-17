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
  const [showMap, setShowMap] = useState(false);
  const [paginationRoomLoading, setPaginationroomloading] = useState(false);
  const [IsLoadingFirstTime, setIsLoadingFirstTime] = useState(true); // This state is here bacause when the first time site loads the useeffect runs twice and fetches the rooms and again fetches the rooms which results in dublication
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
      setPaginationroomloading(true);
      axios
        .get(
          `http://localhost:7000/api/main?page=${page}&sort=${sort},${order}&type=${roomType}&cat=${cat}&place=${locationInp}&guests=${guests}`
        )
        .then((response) => {
          if (IsLoadingFirstTime) {
            setRooms(response.data.rooms);
            setIsLoadingFirstTime(false);
          } else {
            setRooms((oldRooms) => [...oldRooms, ...response.data.rooms]);
          }
          if (response.data.rooms.length === 0) {
            setTheEnd(true);
          }
          setLoading(false);
          setPaginationroomloading(false);
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
                          className="object-cover rounded-2xl  h-80 w-96  bg-[#D8DBE0]    "
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
                              TextAbstract={TextAbstract}
                            />
                          </>
                        ))}
                      </>
                    )}
                    {paginationRoomLoading ? (
                      <div
                        role="status"
                        className="mx-auto 2md:mx-[40rem] -my-7 "
                      >
                        <svg
                          aria-hidden="true"
                          class="w-8 h-8 mr-2 text-gray-300 animate-spin  fill-blue-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span class="sr-only">Loading...</span>
                      </div>
                    ) : null}
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
