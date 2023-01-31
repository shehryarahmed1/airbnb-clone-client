import { useState, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Pagination from "./List/Pagination";
import Rooms from "./List/Rooms";
import Selection from "./List/Selection";
import MobileNav from "./Navbar/MobileNav";
import MobileSearch from "./Navbar/MobileSearch";
import MobileTabs from "./Navbar/MobileTabs";
import Navbar from "./Navbar/Navbar";
import axios from "axios";
import CreateUser from "./Auth/CreateUser";
import Login from "./Auth/Login";
import Single from "./Single/Single";
// Add function of location inp to expandednav
function App() {
  const [showSearch, setShowsearch] = useState(false);
  const [locationInp, setLocationInp] = useState("");
  const [cat, setCat] = useState("Houses");
  const [expand, setExpand] = useState(false);
  const [roomType, setRoomtype] = useState("");
  const [guests, setGuests] = useState("");
  const [showProfile, setShowprofile] = useState(false);
  // ExpandedNav-Rooms
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("guests");
  const [order, setOrder] = useState("asc");
  const [theEnd, setTheEnd] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Selectionloading, setSelectionloading] = useState(true); // Category loading
  // End
  const ApiOnSearch = () => {
    setPage(1);
    axios
      .get(
        `http://localhost:7000/api/main?page=${page}&sort=${sort},${order}&type=${roomType}&cat=${cat}&place=${locationInp}&guests=${guests}`
      )
      .then((response) => {
        setRooms(response.data.rooms);
        if (response.data.rooms.length === 0) {
          setTheEnd(true);
        }
        setLoading(false);
        setSelectionloading(false);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                {showSearch ? (
                  <MobileSearch
                    showSearch={showSearch}
                    setShowsearch={setShowsearch}
                    locationInp={locationInp}
                    setLocationInp={setLocationInp}
                    guests={guests}
                    setGuests={setGuests}
                    roomType={roomType}
                    setRoomtype={setRoomtype}
                  />
                ) : null}

                <div>
                  <div className="2md:hidden block">
                    <MobileNav
                      showSearch={showSearch}
                      setShowsearch={setShowsearch}
                      locationInp={locationInp}
                      setLocationInp={setLocationInp}
                      guests={guests}
                      setGuests={setGuests}
                      roomType={roomType}
                      setRoomtype={setRoomtype}
                    />
                  </div>
                  <div className="2md:block hidden ">
                    <Navbar
                      ApiOnSearch={ApiOnSearch}
                      showProfile={showProfile}
                      setShowprofile={setShowprofile}
                      expand={expand}
                      setExpand={setExpand}
                      locationInp={locationInp}
                      setLocationInp={setLocationInp}
                      guests={guests}
                      setGuests={setGuests}
                      roomType={roomType}
                      setRoomtype={setRoomtype}
                      cat={cat}
                      setCat={setCat}
                    />
                    <hr />
                    <br />
                  </div>
                  {showSearch ? null : (
                    <>
                      <div className="h-96">
                        <Rooms
                          showProfile={showProfile}
                          setShowprofile={setShowprofile}
                          roomType={roomType}
                          setRoomtype={setRoomtype}
                          expand={expand}
                          setExpand={setExpand}
                          cat={cat}
                          setCat={setCat}
                          locationInp={locationInp}
                          setLocationInp={setLocationInp}
                          theEnd={theEnd}
                          setTheEnd={setTheEnd}
                          rooms={rooms}
                          setRooms={setRooms}
                          loading={loading}
                          setLoading={setLoading}
                          Selectionloading={Selectionloading}
                          setSelectionloading={setSelectionloading}
                          page={page}
                          setPage={setPage}
                          order={order}
                          setOrder={setOrder}
                          sort={sort}
                          setSort={setSort}
                          guests={guests}
                          setGuests={setGuests}
                        />
                      </div>
                      <div className="2md:hidden block ">
                        <MobileTabs />
                      </div>
                    </>
                  )}
                </div>
              </>
            }
          />

          <Route
            path="/create"
            element={
              <div className="bg-[#FF595D] pt-10  grid place-items-center  h-[1300px] ">
                <CreateUser />
              </div>
            }
          />

          <Route
            path="/room/:id"
            element={
              <Single
                expand={expand}
                setExpand={setExpand}
                locationInp={locationInp}
                setLocationInp={setLocationInp}
                guests={guests}
                setGuests={setGuests}
                cat={cat}
                setCat={setCat}
                showProfile={showProfile}
                setShowprofile={setShowprofile}
                roomType={roomType}
                setRoomtype={setRoomtype}
                ApiOnSearch={ApiOnSearch}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
