import React, { useState } from "react";

const MobileNav = ({
  showSearch,
  setShowsearch,
  locationInp,
  roomType,
  guests,
  setLocationInp,
  setRoomtype,
  setGuests,
}) => {
  return (
    <div className="     shadow-lg  justify-between    border border-[#E0D8D8]    rounded-full mx-5 my-5 p-2  h-[3.8rem]        ">
      <div className="flex       justify-between    text-center items-center  py-5   h-7 ">
        <div
          onClick={() => {
            setShowsearch(true);
          }}
          className="flex     justify-between    text-center items-center   "
        >
          <div className="px-3  ">
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <div className=" mx-2   ">
            <div className="top  ">
              <p className="text-sm font-semibold text-left                   ">
                {locationInp?.length > 0 ? <>{locationInp}</> : <>Where to?</>}
              </p>
            </div>
            <div className="bottom text-xs font-normal text-[#717171]">
              <p className="flex text-center items-center">
                {locationInp?.length > 0 ? null : <p>Anywhere ·&nbsp;</p>}
                {guests?.length > 0 ? (
                  <p>{guests} guests</p>
                ) : (
                  <p>Add Guests</p>
                )}
              </p>
            </div>
          </div>
        </div>

        <div className=" p-1 w-9  rounded-full   border border-gray-300 ">
          <i className="fa-solid fa-sliders      "></i>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
