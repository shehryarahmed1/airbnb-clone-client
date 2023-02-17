import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Experiences = ({
  selectedReservationType,
  setSelectedReservationType,
}) => {
  const navigate = useNavigate();

  const [Rooms, setRooms] = useState([]);
  useEffect(() => {
    setSelectedReservationType("past");
    const headers = {
      token: localStorage.getItem("token"),
    };
    axios
      .get("http://localhost:7000/api/myreservations/past", { headers })
      .then((response) => {
        console.log(response.data.reservations);

        setRooms(response.data.reservations);
      });
  }, []);
  function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString("en-US", { month: "long" });
  }

  return (
    <div className="grid 2md:grid-cols-2 gap-6">
      {Rooms.length == 0 ? (
        <h1 className="text-2xl">No past reservation found</h1>
      ) : (
        Rooms.map((room) => (
          <div>
            <img
              src={room.room?.images[0]}
              onClick={() => {
                navigate(`/room/${room.room?._id}`);
              }}
              alt=""
              className="object-cover cursor-pointer  rounded-2xl  h-80 w-96  bg-gray-300    border border-gray-300"
            />
            <p className="mx-1">
              <p className="font-medium  mt-2">{room.room?.place}</p>

              <p className="flex items-center mt-2">
                <p className="font-medium">Check in:&nbsp;</p>
                <p>
                  {new Date(room.dateStart).getDate()}{" "}
                  {getMonthName(new Date(room.dateStart).getMonth() + 1)}{" "}
                  {new Date(room.dateStart).getFullYear()}
                </p>
              </p>
              <p className="flex items-center">
                <p className="font-medium">Check out:&nbsp;</p>
                <p>
                  {new Date(room.dateEnd).getDate()}{" "}
                  {getMonthName(new Date(room.dateEnd).getMonth() + 1)}{" "}
                  {new Date(room.dateEnd).getFullYear()}
                </p>
              </p>
              <p className="flex items-center">
                <p className="font-medium">Guests:&nbsp;</p>
                <p>{room.guests}</p>
              </p>
              <p
                onClick={() => {
                  navigate("");
                }}
                className="font-medium underline cursor-pointer w-28 "
              >
                View on maps
              </p>
            </p>

            <br />
          </div>
        ))
      )}
    </div>
  );
};

export default Experiences;
