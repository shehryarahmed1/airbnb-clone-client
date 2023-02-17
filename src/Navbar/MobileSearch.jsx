import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const MobileSearch = ({
  showSearch,
  setShowsearch,
  locationInp,
  roomType,
  guests,
  setLocationInp,
  setRoomtype,
  setGuests,
}) => {
  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowtype(false);
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
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  const [showType, setShowtype] = useState(false);

  const [locations, setLocations] = useState([]);
  const [showLocation, setShowlocation] = useState(true);
  useEffect(() => {
    if (true) {
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
    }
  }, [locationInp]);
  return (
    <div>
      <div className="bg-[#F8F8F8] min-h-screen min-w-full absolute -my-5">
        <div className="top text-center items-center   py-3 flex justify-between">
          <i
            onClick={() => {
              setShowsearch(false);
            }}
            className="fa-solid fa-arrow-left mx-6   p-2 border border-gray-400 rounded-full bg-white  "
          ></i>
          <p className="text-lg font-semibold     ">Stays</p>
          <div className="mx-10"></div>
        </div>
        <div className="where_to mx-4 bg-white p-4 rounded-2xl">
          <h1 className="text-2xl font-semibold">Where to?</h1>
          <div className="w-full my-5 flex text-center items-center focus:outline-none border border-gray-400 p-3 px-5 rounded-lg">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              value={locationInp}
              onChange={(e) => setLocationInp(e.target.value)}
              className="mx-3  w-full  focus:outline-none"
              placeholder="Search destinations"
            />
          </div>
        </div>
        {showLocation ? (
          <div ref={wrapperRef}>
            {locations?.length > 0 ? (
              <div className="relative">
                <button type="button" className=""></button>

                <div className=" right-60 z-10  mx-5 -mt-10 origin-top-right bg-white border border-gray-100 rounded-xl   shadow-lg">
                  <div className="p-2      ">
                    <div className="block  py-2 text-sm text-gray-500  ">
                      {locations.map((location) => (
                        <div
                          onClick={() => {
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
                          className=" flex  items-center text-center px-4 h-16 rounded-xl hover:bg-gray-50   "
                        >
                          <div className="icon__location bg-[#EBEBEB] px-4  py-3  rounded-lg">
                            <i className="fa-solid fa-location-dot text-xl"></i>
                          </div>
                          <p className="px-3  text-gray-600 text-base">
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
              <div className="relative items-center text-center">
                <div className="    mx-5  bg-white border border-gray-100 rounded-xl  shadow-lg">
                  <div className="p-2    ">
                    <a href="#" className="block  py-2 text-sm text-gray-500  ">
                      <div className="text-center">No location found</div>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : null}

        <div className="where_to mx-4 bg-white p-4 rounded-2xl my-5">
          <h1 className="text-2xl font-semibold">Guests?</h1>
          <div className="w-full my-5 flex text-center items-center  focus:outline-none border border-gray-400 p-3 px-5 rounded-lg">
            <i className="fa-solid fa-people-group"></i>
            <input
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              type="number"
              className="mx-3  w-full focus:outline-none"
              placeholder="Add guests"
            />
          </div>
        </div>

        <div className="where_to mx-4 bg-white p-4 rounded-2xl my-5">
          <h1 className="text-2xl font-semibold">Room type?</h1>
          <div className="     ">
            <div className="inline-flex bg-white my-5  border rounded-md">
              <p
                onClick={() => {
                  setShowtype(true);
                }}
                className="px-4  h-6 cursor-pointer   py-0.5 text-sm text-gray-600  rounded-l-md"
              >
                {roomType?.length > 0 ? (
                  <>
                    {roomType.charAt(0).toUpperCase()}
                    {roomType.substr(1)}
                  </>
                ) : (
                  <>Select</>
                )}
              </p>

              {showType ? (
                <div className="relative" ref={wrapperRef}>
                  <button type="button" className=""></button>

                  <div className="absolute -right-16 z-10 w-40 mt-4 origin-top-right bg-white border border-gray-100 rounded-xl shadow-lg">
                    <div className="p-2">
                      <div
                        onClick={() => {
                          setRoomtype("Shared room");
                          setShowtype(false);
                        }}
                        className="block  cursor-pointer flex text-center items-center px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50  "
                      >
                        <i className="fa-solid  fa-house"></i>{" "}
                        <p className="mx-2">Shared room</p>
                      </div>
                      <div
                        onClick={() => {
                          setRoomtype("Entire home");
                          setShowtype(false);
                        }}
                        className="block flex cursor-pointer text-center items-center px-4 py-2 text-sm text-gray-500 rounded-lg  hover:bg-gray-50  "
                      >
                        <i className="fa-solid   fa-building text-lg"></i>
                        <p className="mx-2">&nbsp;Entire place</p>
                      </div>
                      <div
                        onClick={() => {
                          setRoomtype("Private room");
                          setShowtype(false);
                        }}
                        className="block    cursor-pointer flex text-center items-center  px-4 py-2 text-sm text-gray-500 rounded-lg  hover:bg-gray-50  "
                      >
                        <i className="fa-solid fa-hotel text-lg"></i>
                        <p className="mx-2">Private room</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="relative h-32 w-32">
          <div className="fixed flex justify-between  inset-x-0 bottom-0 h-16 border-t border-gray-200 bg-white">
            <p
              onClick={() => {
                setRoomtype("");
                setLocationInp("");
                setGuests("");
              }}
              className="underline  cursor-pointer  font-medium mt-5 mx-5"
            >
              Clear all
            </p>
            <button 
            
            onClick={()=>{
              setShowsearch(false)
            }}
            
            className="right  px-5 rounded-lg font-semibold  flex text-center items-center   h-12 my-3    mx-5 text-white
            
            
            
            bg-[#de1463]">
              <i className="fa-solid fa-magnifying-glass"></i>
              <p className="mx-3">Search</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSearch;
