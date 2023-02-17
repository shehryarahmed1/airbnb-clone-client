import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import AuthContext1 from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ExpType = ({ selectedReservationType, setSelectedReservationType }) => {
  const navigate = useNavigate();
  const { user, loggedin, loggedinLoading } = useContext(AuthContext1);

  const [isUpcomingtrue, setIsUpcomingtrue] = useState(false);
  const [isPastTrue, setPastTrue] = useState(false);
  const [isReviewedTrue, setIsReviewedTrue] = useState(false);
  const [isUnreviewedTrue, setIsUnreviewedTrue] = useState(false);

  useEffect(() => {
    if (selectedReservationType == "upcoming") {
      setIsUpcomingtrue(true);
      setPastTrue(false);
      setIsReviewedTrue(false);
      setIsUnreviewedTrue(false);
    } else if (selectedReservationType == "past") {
      setPastTrue(true);
      setIsUpcomingtrue(false);
      setIsReviewedTrue(false);
      setIsUnreviewedTrue(false);
    } else if (selectedReservationType == "unreviewed") {
      setIsUnreviewedTrue(true);
      setIsReviewedTrue(false);
      setPastTrue(false);
      setIsUpcomingtrue(false);
    } else if (selectedReservationType == "reviewed") {
      setIsReviewedTrue(true);
      setIsUnreviewedTrue(false);
      setPastTrue(false);
      setIsUpcomingtrue(false);
    }

    console.log(selectedReservationType);
  }, [selectedReservationType]);

  useEffect(() => {
    console.log(loggedin);
    if (loggedinLoading == false) {
      if (loggedin == false) {
        console.log("False");
        navigate("/login");
      }
    }
  }, [loggedinLoading]);

  return (
    <>
      {loggedinLoading ? (
        <div></div>
      ) : (
        <div className="mx-12 ">
          <div className="top text-center items-center  2md:hidden   py-3 flex justify-between">
            <i
              onClick={() => {
                navigate("/");
              }}
              className="fa-solid fa-arrow-left   p-2 border border-gray-400 rounded-full bg-white  "
            ></i>
            <div className=""></div>
          </div>
          <br />
          <h1 className="2md:text-3xl font-normal">
            Reservations made by {user.name}
          </h1>
          <div className=" my-5">
            <div className="buttons 2md:flex flex-col 2md:flex-row space-x-1 items-center bg-[#EBEBEB] 2md:w-[20.79rem]  w-[6.78rem] rounded-lg px-0.5 py-0.5">
              <button
                onClick={() => {
                  navigate("/experiences");
                }}
                className={` text-sm px-3 py-1  rounded-md hover:bg-gray-50 ${
                  isUpcomingtrue ? "bg-gray-50" : ""
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => {
                  navigate("past");
                }}
                className={` text-sm px-3 py-1  rounded-md hover:bg-gray-50 ${
                  isPastTrue ? "bg-gray-50" : ""
                }`}
              >
                Past
              </button>
              <button
                onClick={() => {
                  navigate("unreviewed");
                }}
                className={` text-sm px-3 py-1  rounded-md hover:bg-gray-50 ${
                  isUnreviewedTrue ? "bg-gray-50" : ""
                }`}
              >
                Unreviewed
              </button>
              <button
                onClick={() => {
                  navigate("reviewed");
                }}
                className={` text-sm px-3 py-1  rounded-md hover:bg-gray-50 ${
                  isReviewedTrue ? "bg-gray-50" : ""
                }`}
              >
                Reviewed
              </button>
            </div>
          </div>
          <Outlet />
        </div>
      )}
    </>
  );
};

export default ExpType;
