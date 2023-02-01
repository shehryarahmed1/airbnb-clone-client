import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
const ExpandedNav = ({
  locationInp,
  setLocationInp,
  guests,
  setGuests,
  ApiOnSearch,
  roomType,
  setRoomtype,
  expand,
  setExpand,
  latitude,
  setLatitude,
  longitude,
  setLongitude,
}) => {
  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowlocation(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  const [showLocation, setShowlocation] = useState(true);
  const [locations, setLocations] = useState([]);
  const [showType, setShowtype] = useState(false);
  const [typeValue, setTypevalue] = useState(roomType);
  const [PrivateRoom, setPrivateRoom] = useState();
  const [EntirePlace, setEntirePlace] = useState();
  const [SharedRoom, setSharedRoom] = useState();
  const [placeholderLatitude, setPlaceholderLatitude] = useState(0); // So the maps doesnot render without click on pink search
  const [placeholderLongitude, setPlaceholderLongitude] = useState(0); // So the maps doesnot render without click on pink search
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  useEffect(() => {
    if (locationInp.length <= 0) {
      setShowlocation(false);
    } else {
      setShowlocation(true);
      axios
        .get(
          `https://api.openweathermap.org/geo/1.0/direct?q=${locationInp}&limit=10&appid=2e1cd44eae7daa5780420cc506cb620c`
        )
        .then((response) => {
          setLocations(response.data);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  }, [locationInp]);
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
    <div>
      <div className="    h-48 mt-44  w-full   ">
        <p className="text-sm  my-3   font-semibold">Where to?</p>
        <div className="absolute inset-x-0  h-24    border-l-4 border-gray-200   bg-white shadow-xl   ">
          <div className=" ">
            <div className=" m-auto  border w-[36rem]  items-stretch  flex border-gray-200 rounded-full p-4 px-10 ">
              <div className="border-r border-gray-200   ">
                <p className="text-xs font-semibold     ">Where</p>
                <input
                  type="text"
                  className="outline-none w-44"
                  placeholder="Search destination"
                  value={TextAbstract(locationInp, 19)}
                  onChange={(e) => setLocationInp(e.target.value)}
                />
              </div>
              <div className="mx-10 w-36 border-r border-gray-200    ">
                <p className="text-xs font-semibold    ">Who</p>
                <input
                  type="number"
                  className="outline-none w-32"
                  placeholder="Add guests"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                />
              </div>
              <div className="    ">
                <p className="text-xs font-semibold     ">Type</p>
                <input
                  type="text"
                  className="outline-none  w-20"
                  placeholder="Add type"
                  value={typeValue}
                  onFocus={() => {
                    setShowtype(true);
                  }}
                  onBlur={() => {
                    setTimeout(() => {
                      setShowtype(false);
                    }, 100);
                  }}
                />
              </div>
              <div
                onClick={() => {
                  console.log(locationInp);
                  ApiOnSearch();
                  setTimeout(() => {
                    setExpand(false);
                  }, 100);
                  setLatitude(placeholderLatitude);
                  setLongitude(placeholderLongitude);
                }}
                className="hover:bg-[#e2346e]     bg-[#FF385C]  cursor-pointer  transition       text-white  px-3 py-2  mx-4    rounded-full"
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
              {showType ? (
                <div className="relative">
                  <button type="button" className=""></button>

                  <div className="absolute right-10 z-10 w-48 top-16   bg-white border border-gray-100 rounded-xl  shadow-lg">
                    <div className="p-2    ">
                      <p
                        onClick={() => {
                          setRoomtype("");
                          setTypevalue("");
                          setPrivateRoom(false);
                          setSharedRoom(false);
                          setEntirePlace(false);
                        }}
                        className="mx-4 text-sm text-blue-600 font-medium cursor-pointer w-9  my-1"
                      >
                        Clear
                      </p>

                      <div
                        onClick={() => {
                          setRoomtype("Private room");
                          setTypevalue("Private ");
                          console.log("Test");
                        }}
                        className={`hover:bg-slate-100 py-2.5 px-3 rounded-lg cursor-pointer ${
                          PrivateRoom ? "bg-slate-100" : ""
                        }`}
                      >
                        <p className=" text-gray-600">
                          {" "}
                          <i className="fa-solid fa-bed  bg-[#EBEBEB] p-2 rounded-md"></i>
                          &nbsp;&nbsp;Private room
                        </p>
                      </div>
                      <div
                        onClick={() => {
                          setRoomtype("Shared room");
                          setTypevalue("Shared");
                          console.log("Test");
                        }}
                        className={`hover:bg-slate-100 py-2.5 px-3 rounded-lg cursor-pointer ${
                          SharedRoom ? "bg-slate-100" : ""
                        }`}
                      >
                        <p className=" text-gray-600">
                          {" "}
                          <i className="fa-solid fa-bed  bg-[#EBEBEB] p-2 rounded-md"></i>
                          &nbsp;&nbsp;Shared room
                        </p>
                      </div>
                      <div
                        onClick={() => {
                          setRoomtype("Entire home");
                          setTypevalue("Entire ");
                          console.log("Test");
                        }}
                        className={`hover:bg-slate-100 py-2.5 px-3 rounded-lg cursor-pointer ${
                          EntirePlace ? "bg-slate-100" : ""
                        }`}
                      >
                        <p className=" text-gray-600">
                          {" "}
                          <i className="fa-solid fa-bed  bg-[#EBEBEB] p-2 rounded-md"></i>
                          &nbsp;&nbsp;Entire room
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="-my-6">
        {showLocation ? (
          <>
            {locations.length > 0 ? (
              <div ref={wrapperRef} className="relative    ">
                <button type="button" className=""></button>

                <div className="absolute right-10   z-10 w-72 -top-14  bg-white border border-gray-100 rounded-3xl  shadow-lg">
                  <div className="p-2 ">
                    <div className="block  py-2 text-sm text-gray-500  ">
                      {locations.map((location) => (
                        <div
                          onClick={() => {
                            setLocationInp("");
                            setPlaceholderLatitude(location.lat);
                            setPlaceholderLongitude(location.lon);
                            if (location.state == undefined) {
                              setLocationInp(
                                `${location.name}, ${location.country}`
                              );
                            } else {
                              setLocationInp(
                                `${location.name}, ${location.state}`
                              );
                            }

                            const timeout = setTimeout(() => {
                              setShowlocation(false);
                            }, 100);
                          }}
                          className="flex   items-center  text-center px-4 h-16 rounded-xl  cursor-pointer   hover:bg-gray-50   "
                        >
                          <div className="icon__location     bg-[#EBEBEB] px-4  py-3  rounded-lg">
                            <i className="fa-solid fa-location-dot text-xl"></i>
                          </div>
                          <p className="px-3    text-gray-600 text-base">
                            {location.name},
                            {location.state ? (
                              <> {location.state}</>
                            ) : (
                              <> {location.country}</>
                            )}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative">
                <button type="button" className=""></button>

                <div className="absolute right-10 z-10 w-72 -top-10   bg-white border border-gray-100 rounded-xl  shadow-lg">
                  <div className="p-2    ">
                    <a href="#" className="block  py-2 text-sm text-gray-500  ">
                      <div className="text-center">No location found</div>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ExpandedNav;
