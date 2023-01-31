import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import ExpandedNav from "./ExpandedNav";
import DefaultNav from "./DefaultNav";
import { useNavigate } from "react-router-dom";

const Navbar = ({
  expand,
  setExpand,
  locationInp,
  setLocationInp,
  guests,
  setGuests,
  cat,
  setCat,
  showProfile,
  setShowprofile,
  roomType,
  setRoomtype,
  ApiOnSearch,
  single,
}) => {
  const navigate = useNavigate();

  function CloseProfile(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowprofile(false);
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

  function CloseExpandedNav(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setTimeout(() => {
            setExpand(false);
          }, 100);
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
  const ProfileRef = useRef(null);
  const ExpandedNavRef = useRef(null);
  CloseProfile(ProfileRef);
  CloseExpandedNav(ExpandedNavRef);

  return (
    <>
      <div
        ref={ExpandedNavRef}
        className={`hidden max-h-24   items-center  2md:flex       ${
          single ? "justify-around" : "justify-between mx-8"
        }`}
      >
        <img
          src="https://miro.medium.com/max/1400/0*NChTo-XqLOxLabIW"
          alt=""
          className="h-16 cursor-pointer  "
          onClick={() => {
            navigate("/");
          }}
        />
        {expand ? (
          <ExpandedNav
            roomType={roomType}
            setRoomtype={setRoomtype}
            locationInp={locationInp}
            setLocationInp={setLocationInp}
            guests={guests}
            setGuests={setGuests}
            cat={cat}
            setCat={setCat}
            ApiOnSearch={ApiOnSearch}
            expand={expand}
            setExpand={setExpand}
          />
        ) : (
          <div className="flex       justify-center ">
            <div className="">
              <div
                onClick={() => {
                  setExpand(true);
                }}
                className="   cursor-pointer   shadow-lg flex justify-between   border border-[#E0D8D8]    rounded-full mx-5 my-3 px-1.5  h-12 hover:shadow-gray-300      "
              >
                <div className=" border-r-2 border-gray-100 mx-1.5   px-3 my-2    ">
                  {locationInp?.length > 0 ? (
                    <>
                      {" "}
                      <p className="font-semibold  text-sm my-1   ">
                        {locationInp}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-semibold  text-sm my-1   ">Anywhere</p>
                    </>
                  )}
                </div>

                <div className="  px-3 border-r-2 border-gray-100 my-2    ">
                  <p className="font-semibold text-sm  my-1 ">
                    {roomType.length < 1 ? <>Any type</> : <>{roomType}</>}
                  </p>
                </div>
                <div className="   my-0   ">
                  <p className="text-gray-500 mx-5  text-sm my-3  ">
                    {guests.length < 1 ? <>Add guests</> : <>{guests} guests</>}
                  </p>
                </div>
                <div className="  py-[3px] my-1.5   w-8 h-8 text-center  rounded-full     bg-[#FF385C] ">
                  <i className="fa-solid text-sm  fa-magnifying-glass text-white"></i>
                </div>
              </div>
            </div>{" "}
          </div>
        )}
        <div
          onClick={() => {
            setShowprofile((prevCheck) => !prevCheck);
          }}
          className="flex     items-center rounded-full cursor-pointer   px-1.5  py-1 shadow-md hover:shadow-lg   border border-gray-300"
        >
          <i className="fa-solid fa-bars px-3  "></i>
          <i className="fa-solid fa-user px-1.5 text-[#4d5b66] text-2xl bg-[#666F7A] py-1  w-8 h-8 rounded-full "></i>
        </div>
      </div>
      {showProfile ? (
        <div
          ref={ProfileRef}
          className="absolute rounded-xl  shadow-md  top-16 right-12 w-48  bg-white border border-gray-200"
        >
          <div className="py-2 ">
            <div className="px-3 py-2  rounded-lg mx-1.5   hover:bg-gray-100 cursor-pointer">
              <p className="text-[15px] font-medium ">Sign up</p>
            </div>

            <div className="px-3 py-2 rounded-lg mx-1.5   hover:bg-gray-100 cursor-pointer">
              <p className="text-[15px]">Log in</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Navbar;
