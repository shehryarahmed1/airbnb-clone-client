import React, { useEffect, useRef, useState } from "react";
const Selection = ({
  roomType,
  showProfile,
  setShowprofile,
  showSearch,
  expand,
  cat,
  setCat,
  Selectionloading,
  setSelectionloading,
}) => {
  const [house, setHouse] = useState(true);
  const [apart, setApart] = useState(false);
  const [villa, setVilla] = useState(false);
  const [treehouses, setTreehouses] = useState(false);
  const [farm, setFarm] = useState(false);
  const [cabin, setCabin] = useState(false);
  const [privateroom, setPrivateroom] = useState(false);
  const [camp, setCamp] = useState(false);
  const [beach, setBeach] = useState(false);
  const [surf, setSurf] = useState(false);
  const [pool, setPool] = useState(false);
  const [ships, setShips] = useState(false);
  const [castle, setCastle] = useState(false);
  const [vines, setVines] = useState(false);

  const [shared, setShared] = useState(false);
  const [Entire, setEntire] = useState(false);
  const [showLeftScroll, setShowLeftScroll] = useState(false);

  const [scrollX, setscrollX] = useState(0);
  const [scrolEnd, setscrolEnd] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    console.log(showSearch);
  }, [showSearch]);

  const slide = (shift) => {
    ref.current.scrollLeft += shift;
    setscrollX(scrollX + shift);

    if (
      Math.floor(ref.current.scrollWidth - ref.current.scrollLeft) <=
      ref.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

  return (
    <div className="flex  justify-between mx-10  items-center   ">
      <div
        className="overflow-x-auto      h-24 scroll-smooth    scrollbar-hide md:scrollbar-default "
        ref={ref}
      >
        <div className="flex w-full       space-x-10 ">
          <div
            onClick={() => {
              setHouse(true);
              setApart(false);
              setVilla(false);
              setTreehouses(false);
              setFarm(false);
              setCabin(false);
              setPrivateroom(false);
              setCamp(false);
              setBeach(false);
              setSurf(false);
              setPool(false);
              setShips(false);
              setCastle(false);
              setVines(false);
              setCat("Houses");
            }}
            className={`snap-center ...  text-center w-10 py-3   ${
              house
                ? "text-gray-800  cursor-default     border-b-2        border-gray-900 "
                : "text-gray-500  hover:text-gray-700  hover:border-gray-400  hover:border-b-2  py-3  cursor-pointer transition ease-in-out delay-[0.1ms]"
            }`}
          >
            <div className="top">
              <i className="fa-solid fa-house text-xl "></i>
            </div>
            <div className="top text-xs font-medium ">Houses</div>
          </div>
          <div
            onClick={() => {
              setHouse(false);
              setApart(true);
              setVilla(false);
              setTreehouses(false);
              setFarm(false);
              setCabin(false);
              setPrivateroom(false);
              setCamp(false);
              setBeach(false);
              setSurf(false);
              setPool(false);
              setShips(false);
              setCastle(false);
              setVines(false);
              setCat("Apartments");
            }}
            className={`snap-center ... text-center w-16 py-3   ${
              apart
                ? "text-gray-800  cursor-default     border-b-2        border-gray-900 "
                : "text-gray-500  hover:text-gray-700  hover:border-gray-400  hover:border-b-2  py-3  cursor-pointer transition ease-in-out delay-[0.1ms]"
            }`}
          >
            <div className="top">
              <i className="fa-solid fa-building text-xl "></i>
            </div>
            <div className="top text-xs font-medium ">Apartments</div>
          </div>

          <div
            onClick={() => {
              setHouse(false);
              setApart(false);
              setVilla(true);
              setTreehouses(false);
              setFarm(false);
              setCabin(false);
              setPrivateroom(false);
              setCamp(false);
              setBeach(false);
              setSurf(false);
              setPool(false);
              setShips(false);
              setCastle(false);
              setVines(false);
              setCat("Villas");
            }}
            className={`snap-center ... text-center w-8 py-3   ${
              villa
                ? "text-gray-800  cursor-default     border-b-2        border-gray-900 "
                : "text-gray-500  hover:text-gray-700  hover:border-gray-400  hover:border-b-2  py-3  cursor-pointer transition ease-in-out delay-[0.1ms]"
            }`}
          >
            <div className="top">
              <i className="fa-solid fa-house-crack text-xl"></i>
            </div>
            <div className="top text-xs font-medium ">Villas</div>
          </div>
          <div
            onClick={() => {
              setHouse(false);
              setApart(false);
              setVilla(false);
              setTreehouses(true);
              setFarm(false);
              setCabin(false);
              setPrivateroom(false);
              setCamp(false);
              setBeach(false);
              setSurf(false);
              setPool(false);
              setShips(false);
              setCastle(false);
              setVines(false);
              setCat("Treehouses");
            }}
            className={`snap-center ... text-center w-16 py-3   ${
              treehouses
                ? "text-gray-800  cursor-default     border-b-2        border-gray-900 "
                : "text-gray-500  hover:text-gray-700  hover:border-gray-400  hover:border-b-2  py-3  cursor-pointer transition ease-in-out delay-[0.1ms]"
            }`}
          >
            <div className="top">
              <i className="fa-solid fa-tree text-xl"></i>
            </div>
            <div className="top text-xs font-medium w-16">Tree houses</div>
          </div>
          <div
            onClick={() => {
              setHouse(false);
              setApart(false);
              setVilla(false);
              setTreehouses(false);
              setFarm(true);
              setCabin(false);
              setPrivateroom(false);
              setCamp(false);
              setBeach(false);
              setSurf(false);
              setPool(false);
              setShips(false);
              setCastle(false);
              setVines(false);
              setCat("Farms");
            }}
            className={`snap-center ... text-center w-8 py-3   ${
              farm
                ? "text-gray-800  cursor-default     border-b-2        border-gray-900 "
                : "text-gray-500  hover:text-gray-700  hover:border-gray-400  hover:border-b-2  py-3  cursor-pointer transition ease-in-out delay-[0.1ms]"
            }`}
          >
            <div className="top">
              <i className="fa-solid fa-tractor text-lg"></i>
            </div>
            <div className="top text-xs font-medium ">Farms</div>
          </div>
          <div
            onClick={() => {
              setHouse(false);
              setApart(false);
              setVilla(false);
              setTreehouses(false);
              setFarm(false);
              setCabin(true);
              setPrivateroom(false);
              setCamp(false);
              setBeach(false);
              setSurf(false);
              setPool(false);
              setShips(false);
              setCastle(false);
              setVines(false);
              setCat("Cabins");
            }}
            className={`snap-center ... text-center w-8 py-3   ${
              cabin
                ? "text-gray-800  cursor-default     border-b-2        border-gray-900 "
                : "text-gray-500  hover:text-gray-700  hover:border-gray-400  hover:border-b-2  py-3  cursor-pointer transition ease-in-out delay-[0.1ms]"
            }`}
          >
            <div className="top">
              <i className="fa-classic fa-solid fa-person-booth"></i>{" "}
            </div>
            <div className="top text-xs font-medium ">Cabins</div>
          </div>
          <div
            onClick={() => {
              setHouse(false);
              setApart(false);
              setVilla(false);
              setTreehouses(false);
              setFarm(false);
              setCabin(false);
              setPrivateroom(true);
              setCamp(false);
              setBeach(false);
              setSurf(false);
              setPool(false);
              setShips(false);
              setCastle(false);
              setVines(false);
              setCat("Private rooms");
            }}
            className={`snap-center ... text-center w-20 py-3   ${
              privateroom
                ? "text-gray-800  cursor-default     border-b-2        border-gray-900 "
                : "text-gray-500  hover:text-gray-700  hover:border-gray-400 border-white  border-b-2  hover:border-b-2  py-3  cursor-pointer transition ease-in-out delay-[0.1ms]"
            }`}
          >
            <div className="top">
              <i className="fa-solid fa-bed text-xl"></i>
            </div>
            <div className="top text-xs font-medium w-20 ">Private rooms</div>
          </div>

          <div
            onClick={() => {
              setHouse(false);
              setApart(false);
              setVilla(false);
              setTreehouses(false);
              setFarm(false);
              setCabin(false);
              setPrivateroom(false);
              setCamp(true);
              setBeach(false);
              setSurf(false);
              setPool(false);
              setShips(false);
              setCastle(false);
              setVines(false);
              setCat("Camping");
            }}
            className={`snap-center ... text-center w-14 py-3   ${
              camp
                ? "text-gray-800  cursor-default     border-b-2        border-gray-900 "
                : "text-gray-500  hover:text-gray-700  hover:border-gray-400 border-white  border-b-2  hover:border-b-2  py-3  cursor-pointer transition ease-in-out delay-[0.1ms]"
            }`}
          >
            <div className="top">
              <i className="fa-solid fa-campground text-xl"></i>
            </div>
            <div className="top text-xs font-medium ">Camping</div>
          </div>
          <div
            onClick={() => {
              setHouse(false);
              setApart(false);
              setVilla(false);
              setTreehouses(false);
              setFarm(false);
              setCabin(false);
              setPrivateroom(false);
              setCamp(false);
              setBeach(true);
              setSurf(false);
              setPool(false);
              setShips(false);
              setCastle(false);
              setVines(false);
              setCat("Beaches");
            }}
            className={`snap-center ... text-center w-10 py-3   ${
              beach
                ? "text-gray-800  cursor-default     border-b-2        border-gray-900 "
                : "text-gray-500  hover:text-gray-700  hover:border-gray-400 border-white  border-b-2  hover:border-b-2  py-3  cursor-pointer transition ease-in-out delay-[0.1ms]"
            }`}
          >
            <div className="top">
              <i className="fa-solid fa-umbrella-beach text-xl"></i>{" "}
            </div>
            <div className="top text-xs font-medium ">Beaches</div>
          </div>

          <div
            onClick={() => {
              setHouse(false);
              setApart(false);
              setVilla(false);
              setTreehouses(false);
              setFarm(false);
              setCabin(false);
              setPrivateroom(false);
              setCamp(false);
              setBeach(false);
              setSurf(true);
              setPool(false);
              setShips(false);
              setCastle(false);
              setVines(false);
              setCat("Surfing");
            }}
            className={`snap-center ... text-center w-12 py-3   ${
              surf
                ? "text-gray-800  cursor-default     border-b-2        border-gray-900 "
                : "text-gray-500  hover:text-gray-700  hover:border-gray-400 border-white  border-b-2  hover:border-b-2  py-3  cursor-pointer transition ease-in-out delay-[0.1ms]"
            }`}
          >
            <div className="top">
              <i className="fa-solid fa-water text-xl"></i>
            </div>
            <div className="top text-xs font-medium ">Surfing</div>
          </div>

          <div
            onClick={() => {
              setHouse(false);
              setApart(false);
              setVilla(false);
              setTreehouses(false);
              setFarm(false);
              setCabin(false);
              setPrivateroom(false);
              setCamp(false);
              setBeach(false);
              setSurf(false);
              setPool(true);
              setShips(false);
              setCastle(false);
              setVines(false);
              setCat("Pools");
            }}
            className={`snap-center ... text-center w-7 py-3   ${
              pool
                ? "text-gray-800  cursor-default     border-b-2        border-gray-900 "
                : "text-gray-500  hover:text-gray-700  hover:border-gray-400 border-white  border-b-2  hover:border-b-2  py-3  cursor-pointer transition ease-in-out delay-[0.1ms]"
            }`}
          >
            <div className="top">
              <i className="fa-solid fa-water-ladder text-lg"></i>
            </div>
            <div className="top text-xs font-medium ">Pools</div>
          </div>

          <div
            onClick={() => {
              setHouse(false);
              setApart(false);
              setVilla(false);
              setTreehouses(false);
              setFarm(false);
              setCabin(false);
              setPrivateroom(false);
              setCamp(false);
              setBeach(false);
              setSurf(false);
              setPool(false);
              setShips(true);
              setCastle(false);
              setVines(false);
              setCat("Ships");
            }}
            className={`snap-center ... text-center w-7 py-3   ${
              ships
                ? "text-gray-800  cursor-default     border-b-2        border-gray-900 "
                : "text-gray-500  hover:text-gray-700  hover:border-gray-400 border-white  border-b-2  hover:border-b-2  py-3  cursor-pointer transition ease-in-out delay-[0.1ms]"
            }`}
          >
            <div className="top">
              <i className="fa-solid fa-anchor text-lg"></i>
            </div>
            <div className="top text-xs font-medium ">Ships</div>
          </div>

          <div
            onClick={() => {
              setHouse(false);
              setApart(false);
              setVilla(false);
              setTreehouses(false);
              setFarm(false);
              setCabin(false);
              setPrivateroom(false);
              setCamp(false);
              setBeach(false);
              setSurf(false);
              setPool(false);
              setShips(false);
              setCastle(true);
              setVines(false);
              setCat("Castles");
            }}
            className={`snap-center ... text-center w-12 py-3   ${
              castle
                ? "text-gray-800  cursor-default     border-b-2        border-gray-900 "
                : "text-gray-500  hover:text-gray-700  hover:border-gray-400 border-white  border-b-2  hover:border-b-2  py-3  cursor-pointer transition ease-in-out delay-[0.1ms]"
            }`}
          >
            <div className="top">
              <i className="fa-solid fa-chess-rook text-lg"></i>
            </div>
            <div className="top text-xs font-medium ">Castles</div>
          </div>

          <div
            onClick={() => {
              setHouse(false);
              setApart(false);
              setVilla(false);
              setTreehouses(false);
              setFarm(false);
              setCabin(false);
              setPrivateroom(false);
              setCamp(false);
              setBeach(false);
              setSurf(false);
              setPool(false);
              setShips(false);
              setCastle(false);
              setVines(true);
              setCat("Vineyards");
            }}
            className={`snap-center ... text-center w-16 py-3   ${
              vines
                ? "text-gray-800  cursor-default     border-b-2        border-gray-900 "
                : "text-gray-500  hover:text-gray-700  hover:border-gray-400 border-white  border-b-2  hover:border-b-2  py-3  cursor-pointer transition ease-in-out delay-[0.1ms]"
            }`}
          >
            <div className="top">
              <i class="fa-brands fa-vine text-lg"></i>{" "}
            </div>
            <div className="top text-xs font-medium ">Vineyards</div>
          </div>
        </div>

        <div className="">
          {!scrolEnd && (
            <>
              <div
                onClick={() => slide(150)}
                className={` top-28 2md:right-40 right-14    bg-white  h-8 w-8 cursor-pointer  border border-gray-400 hover:border-gray-500 hover:shadow-md rounded-full px-2 py-[3px]   ${
                  showProfile || expand ? "hidden" : "absolute"
                }`}
              >
                <i className="fa-solid fa-arrow-right"></i>
              </div>
            </>
          )}

          {scrollX !== 0 && (
            <>
              <div
                onClick={() => slide(-150)}
                className="absolute top-28  bg-white left-10   h-8 w-8 cursor-pointer  border border-gray-400 hover:border-gray-500 hover:shadow-md rounded-full px-2 py-[3px]  "
              >
                <i className="fa-solid fa-arrow-left"></i>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="filter mx-5 h-10  -mt-9   space-x-2 2md:flex hidden items-center border cursor-pointer  rounded-xl p-2 px-4">
        <div className="icon">
          <i className="fa-solid fa-sliders text-sm"></i>
        </div>
        <div className=" text-xs font-medium ">Filters</div>
      </div>
    </div>
  );
};

export default Selection;
