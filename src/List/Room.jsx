import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const Room = ({ room, longitude, latitude, TextAbstract, expand }) => {
  const navigate = useNavigate();

  const [totalReview, setTotalReview] = useState(0);
  const [reviewRatio, setReviewRatio] = useState(0);
  const [distance, setDistance] = useState("");
  useEffect(() => {
    function distance(lat1, lat2, lon1, lon2) {
      // The math module contains a function
      // named toRadians which converts from
      // degrees to radians.
      lon1 = (lon1 * Math.PI) / 180;
      lon2 = (lon2 * Math.PI) / 180;
      lat1 = (lat1 * Math.PI) / 180;
      lat2 = (lat2 * Math.PI) / 180;

      // Haversine formula
      let dlon = lon2 - lon1;
      let dlat = lat2 - lat1;
      let a =
        Math.pow(Math.sin(dlat / 2), 2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

      let c = 2 * Math.asin(Math.sqrt(a));

      // Radius of earth in kilometers. Use 3956
      // for miles
      let r = 6371;

      // calculate the result
      return c * r;
    }
    setDistance(distance(latitude, room.latitude, longitude, room.longitude));
  }, []);

  useEffect(() => {
    let sum = room.reviews.reduce(function (prev, current) {
      return prev + +current.raiting_num;
    }, 0);
    setTotalReview(sum);
  }, [room.reviews]);
  useEffect(() => {
    setReviewRatio(totalReview / room.reviews.length);
  }, [reviewRatio]);
  return (
    <div
      onClick={() => {
        if (!expand) {
          navigate(`/room/${room._id}`);
        }
      }}
      className="  my-4   m-auto  "
    >
      <div className="top m-auto ">
        <img
          src={room.images[0]}
          alt=""
          className="object-cover rounded-2xl  h-80 w-96  bg-gray-700    border border-gray-300"
        />
      </div>
      <div className="title flex justify-between py-1">
        <p className="font-semibold">{TextAbstract(room.place, 29)}</p>
        <p>
          <i className="fa-solid fa-star"></i>
          {totalReview != 0 ? (
            <>
              {" "}
              {Math.round(totalReview / room.reviews.length)}(
              {room.reviews.length})
            </>
          ) : (
            <> &nbsp;{<>0 (0)</>} </>
          )}
        </p>
      </div>
      <div className="bottom">
        <p className="text-gray-500">
          {numberWithCommas(Math.round(distance))} kilometers away
        </p>
        <p className="text-gray-800 font-medium">
          {room.total_occupancy}&nbsp;sq. ft.
        </p>
        <p className="text-gray-500">{room.home_type}</p>
        <div className="price flex">
          <p className="font-semibold">${numberWithCommas(room.price)}</p>&nbsp;
          <p>night</p>
        </div>
      </div>
    </div>
    // <div className="bg-red-800">lk</div>
  );
};

export default Room;
