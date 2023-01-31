import React from "react";

const Pagination = ({ page, setPage, rooms }) => {
  return (
    <div>
      <div className="flex">
        {page == 1 ? (
          <div className=" cursor-not-allowed  inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-500 bg-white border border-gray-100 rounded-lg  ">
            Previous
          </div>
        ) : (
          <div
            onClick={() => {
              setPage(page - 1);
            }}
            className="cursor-pointer  inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 "
          >
            Previous
          </div>
        )}
        {rooms.length >= 8 ? (
          <div
            onClick={() => {
              if (rooms.length >= 8) {
                setPage(page + 1);
              }
            }}
            className="cursor-pointer  inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 "
          >
            Next
          </div>
        ) : (
          <div className="cursor-not-allowed  inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-500 bg-white border border-gray-100 rounded-lg ">
            Next
          </div>
        )}
      </div>
    </div>
  );
};

export default Pagination;
