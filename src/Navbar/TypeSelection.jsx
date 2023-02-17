import React from "react";

const TypeSelection = () => {
  return (
    <div
      id="dropdownNavbar"
      className="z-10  mx-80  mt-[5.5rem] absolute   hidden md:block  font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-60 "
    >
      <ul
        className="py-2 text-sm text-gray-700 dark:text-gray-400"
        aria-labelledby="dropdownLargeButton"
      >
        <li
          onClick={() => {
            console.log("Hello");
          }}
        >
          <a
            href="#"
            className="font-medium  block px-4 py-2 hover:bg-gray-100"
          >
            Shared room
          </a>
        </li>
        <li
          onClick={() => {
            console.log("Hello");
          }}
        >
          <a
            href="#"
            className="font-medium  block px-4 py-2 hover:bg-gray-100 "
          >
            Business analysis
          </a>
        </li>
        <li
          onClick={() => {
            console.log("Hello");
          }}
        >
          <a
            href="#"
            className="font-medium  block px-4 py-2 hover:bg-gray-100 "
          >
            Corporate affairs
          </a>
        </li>
        <li
          onClick={() => {
            console.log("Hello");
          }}
        >
          <a
            href="#"
            className="font-medium  block px-4 py-2 hover:bg-gray-100 "
          >
            Tax planning
          </a>
        </li>
        <li>
          <a
            href="#"
            className="font-medium  block px-4 py-2 hover:bg-gray-100"
          >
            Risk and Corporate governance
          </a>
        </li>
      </ul>
    </div>
  );
};

export default TypeSelection;
