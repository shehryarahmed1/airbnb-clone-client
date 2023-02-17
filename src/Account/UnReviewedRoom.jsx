import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StarPicker from "react-star-picker";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
const UnReviewedRoom = ({ room, getMonthName }) => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(null);
  const [reviewContent, setReviewContent] = useState("");
  const onChange = (value) => {
    setRating(value);
    console.log(value);
  };

  const PostReview = () => {
    const headers = {
      token: localStorage.getItem("token"),
    };
    const BodyValues = {
      room_id: room.room._id,
      raiting_num: rating,
      raiting_content: reviewContent,
      reservation_id: room._id,
    };
    axios
      .post("http://localhost:7000/api/review", BodyValues, { headers })
      .then((response) => {
        console.log(response);
        toast.success("Room has been reviewed");
        setTimeout(function () {
          window.location.reload(false);
        }, 1000);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <div>
      <Toaster />
      <div>
        <img
          src={room?.room?.images[0]}
          onClick={() => {
            navigate(`/room/${room?.room?._id}`);
          }}
          alt=""
          className="object-cover cursor-pointer  rounded-2xl  h-80 w-96  bg-gray-300    border border-gray-300"
        />
        <p className="mx-1">
          <p className="font-medium  mt-2">{room?.room?.place}</p>

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
          <div className="my-2">
            <input
              type="text"
              className="h-10 rounded-xl w-96 bg-gray-100 focus:outline-none px-3"
              placeholder="Write a review..."
              value={reviewContent}
              onChange={(e) => {
                setReviewContent(e.target.value);
              }}
            />
          </div>
          <div className="flex items-center space-x-28">
            <StarPicker onChange={onChange} value={rating} />
            <button
              onClick={PostReview}
              className=" h-8 rounded-lg px-5 bg-yellow-400    text-white font-medium"
            >
              Review
            </button>
          </div>
        </p>

        <br />
      </div>
    </div>
  );
};

export default UnReviewedRoom;
