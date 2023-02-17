import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StarPicker from "react-star-picker";
import UnReviewedRoom from "./UnReviewedRoom";

const Unreviewed = ({
  selectedReservationType,
  setSelectedReservationType,
}) => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(null);
  const [reviewContent, setReviewContent] = useState("");
  const [Rooms, setRooms] = useState([]);
  useEffect(() => {
    setSelectedReservationType("unreviewed");
    const headers = {
      token: localStorage.getItem("token"),
    };
    axios
      .get("http://localhost:7000/api/myreservations/unreviewed", { headers })
      .then((response) => {
        console.log("__________--");
        console.log(response.data.rooms);
        setRooms(response.data.rooms);
      });
  }, []);
  function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString("en-US", { month: "long" });
  }

  const onChange = (value) => {
    setRating(value);
    console.log(value);
  };

  return (
    <div>
      <div className="grid 2md:grid-cols-2 gap-6">
        {Rooms.length == 0 ? (
          <h1 className="text-2xl">All reservations are reviewed</h1>
        ) : (
          Rooms.map((room) => (
            <div>
              <UnReviewedRoom room={room} getMonthName={getMonthName} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Unreviewed;
