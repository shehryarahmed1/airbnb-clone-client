import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const MobileTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [explore, setExplore] = useState(false);
  const [trips, setTrips] = useState(false);
  const [dashabord, setDashabord] = useState(false);
  const [profile, setProfile] = useState(false);
  useEffect(() => {
    if (location.pathname == "/") {
      setExplore(true);
    } else if (location.pathname == "/experiences") {
      setTrips(true);
    } else if (location.pathname == "/dashboard") {
      setDashabord(true);
    } else if (location.pathname == "/update/account") {
      setProfile(true);
    }
  }, []);

  return (
    <div>
      <div className="w-full h-screen   ">
        {/* <section id="bottom-navigation" className="md:hidden block fixed inset-x-0 bottom-0 z-10 bg-white shadow"> // if shown only tablet/mobile */}
        <section
          id="bottom-navigation"
          className="block fixed inset-x-0 bottom-0 z-10 bg-white shadow"
        >
          <div id="tabs" className="flex border-t   justify-between">
            <div
              onClick={() => {
                navigate("/");
                console.log("home");
              }}
              className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1"
            >
              <i
                className={`fa-solid fa-magnifying-glass text-2xl  ${
                  explore ? "text-[#ff385c]" : "text-[#b0b0b0]"
                }  `}
              ></i>
              <span className="tab tab-kategori block text-xs text-[#b0b0b0]">
                Explore
              </span>
            </div>
            <div
              onClick={() => {
                navigate("/experiences");
                console.log("exp");
              }}
              className="w-full focus:text-teal-500     hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1"
            >
              <i
                className={`fa-solid fa-plane text-2xl   ${
                  trips ? "text-[#ff385c]" : "text-[#b0b0b0]"
                }   `}
              ></i>
              <span className="tab tab-kategori block text-xs text-[#b0b0b0]">
                Trips
              </span>
            </div>
            <div
              onclick={() => {
                navigate("/dashbard");
              }}
              className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1"
            >
              <i
                className={`fa-solid fa-dashboard text-2xl   ${
                  dashabord ? "text-[#ff385c]" : "text-[#b0b0b0]"
                }   `}
              ></i>
              <span className="tab tab-kategori block text-xs text-[#b0b0b0]">
                Dashabord
              </span>
            </div>
            <div
              onClick={() => {
                navigate("/update/account");
                console.log("exp");
              }}
              className="w-full focus:text-teal-500  hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1"
            >
              <i
                className={`fa-solid fa-user text-2xl   ${
                  profile ? "text-[#ff385c]" : "text-[#b0b0b0]"
                }   `}
              ></i>
              <span className="tab tab-kategori block text-xs text-[#b0b0b0]">
                Profile
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MobileTabs;
