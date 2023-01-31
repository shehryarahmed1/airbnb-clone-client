import React from "react";

const DefaultNav = ({ expand, setExpand }) => {
  return (
    <div>
      <div className="flex     justify-center ">
        <div className="">
          <div
            onClick={() => {
              setExpand(true);
            }}
            className="   cursor-pointer  shadow-lg flex justify-between   border border-[#E0D8D8]    rounded-full mx-5 my-3 px-1.5  h-12 hover:shadow-gray-300      "
          >
            <div className=" border-r-2 border-gray-100 mx-1.5   px-3 my-2    ">
              <p className="font-semibold  text-sm my-1   ">Anywhere</p>
            </div>

            <div className="  px-3 border-r-2 border-gray-100 my-2    ">
              <p className="font-semibold text-sm  my-1 ">Any type</p>
            </div>
            <div className="   my-0   ">
              <p className="text-gray-500 mx-5  text-sm my-3  ">Add guests</p>
            </div>
            <div className="  py-0.5 my-1.5   w-8 h-8 text-center  rounded-full   border border-gray-300  bg-[#FF385C] ">
              <i className="fa-solid text-sm  fa-magnifying-glass text-white"></i>
            </div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default DefaultNav;
