import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext1 from "../context/AuthContext";

const Reviewed = ({ selectedReservationType, setSelectedReservationType }) => {
  const navigate = useNavigate();
  const { user, loggedin, loggedinLoading } = useContext(AuthContext1);
  const [Rooms, setRooms] = useState([]);
  const [user_id, setUser_id] = useState(""); // So we can set logged in user's id and check in our reviews that matches the reviewer_id
  useEffect(() => {
    setSelectedReservationType("reviewed");
    const headers = {
      token: localStorage.getItem("token"),
    };
    axios
      .get("http://localhost:7000/api/myreservations/reviewed", { headers })
      .then((response) => {
        console.log(response.data.rooms);
        setUser_id(response.data.user_id);
        setRooms(response.data.rooms);
      });
  }, []);
  function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString("en-US", { month: "long" });
  }
  return (
    <div>
      <div className="grid 2md:grid-cols-2 gap-6">
        {Rooms?.length == 0 ? (
          <h1 className="text-2xl">No past reservation found</h1>
        ) : (
          Rooms.map((room) => (
            <div>
              <img
                src={room.room.images[0]}
                onClick={() => {
                  navigate(`/room/${room.room._id}`);
                }}
                alt=""
                className="object-cover cursor-pointer  rounded-2xl  h-80 w-96  bg-gray-300    border border-gray-300"
              />
              <p className="mx-1">
                <p className="font-medium  mt-2">{room.room.place}</p>

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
                <br />
                {room.room.reviews?.map((review) => (
                  <div>
                    {review.reviewer_id == user_id ? (
                      <>
                        <div className="w-96">
                          <div className=" min-h-16   ">
                            <div className="top flex items-center space-x-3">
                              <div className="profile">
                                <img
                                  src={user.profile_image}
                                  alt=""
                                  className="h-16 w-16 border border-gray-200  object-cover rounded-full"
                                />
                              </div>
                              <div className="name ">
                                <p className="font-semibold">{user.name}</p>
                                <p className="font-medium text-[#595e66]">
                                  <i class="fa-solid fa-star"></i>{" "}
                                  {review.raiting_num}
                                </p>
                              </div>
                            </div>
                            <p className="mt-2  ">{review.raiting_content}</p>
                          </div>

                          <br />
                          <br />
                        </div>
                      </>
                    ) : null}
                  </div>
                ))}
              </p>

              <br />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Reviewed;
