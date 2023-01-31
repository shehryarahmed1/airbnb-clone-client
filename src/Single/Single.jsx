import React from "react";
import { useEffect, useRef } from "react";
import { DayPicker } from "react-day-picker";

import toast, { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import axios from "axios";
import "react-day-picker/dist/style.css";
import { useState } from "react";
import { Gallery } from "react-grid-gallery";
import Navbar from "../Navbar/Navbar";
import { Carousel } from "react-responsive-carousel";
import MobileNav from "../Navbar/MobileNav";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
const Single = ({
  expand,
  setExpand,
  locationInp,
  setLocationInp,
  guests,
  setGuests,
  cat,
  setCat,
  showProfile,
  setShowprofile,
  roomType,
  setRoomtype,
  ApiOnSearch,
}) => {
  const [disabled, setDisabled] = useState([]);
  const [range, setRange] = useState();
  const [showCalendar, setShowcalendar] = useState(false);
  const [room, setRoom] = useState([]);
  const [show, setShow] = useState(false);
  const [guestsInp, setGuestsInp] = useState(1);
  const [reserve, setReserve] = useState(true);
  const [User, setUser] = useState([]);
  const [diffDays, setDiffDays] = useState(0);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [totalReview, setTotalReview] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [reviewRatio, setreviewRatio] = useState(0);
  const [hasname, setHasname] = useState(false);
  const [reviewstoshow, setReviewstoshow] = useState([]);

  useEffect(() => {
    console.log(reviews);
  }, [reviews]);
  useEffect(() => {
    for (let index = 0; index < reviews.length; index++) {
      const element = reviews[index];
      if (!element.reviewer_id.name) {
        setHasname(false);
      } else {
        setHasname(true);
      }
    }
  }, []);

  useEffect(() => {
    for (let index = 0; index < reviews.length; index++) {
      const element = reviews[index];
      let sum = reviews.reduce(function (prev, current) {
        return prev + +current.raiting_num;
      }, 0);
      setTotalReview(sum);
    }
  }, [room]);
  useEffect(() => {
    setreviewRatio(totalReview / reviews.length);
  }, [totalReview]);

  useEffect(() => {
    if (range) {
      if (range.from < new Date()) {
        setRange();
        toast.error("Please select a valid date (After today)");
      }
    }
  }, [range]);
  useEffect(() => {
    // for (let index = 0; index < reviewstoshow[0].length; index++) {
    //   const element = reviewstoshow[0][index];
    //   console.log(element);
    // }
    console.log(reviewstoshow[0]);
  }, [reviewstoshow]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  }, []);

  useEffect(() => {
    if (range) {
      const diffTime = Math.abs(range.from - range.to);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      console.log(diffDays);
      setDiffDays(diffDays);
    }
  }, [range]);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowcalendar(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  useEffect(() => {
    console.log(typeof reviewstoshow);
  }, [reviewstoshow]);

  useEffect(() => {
    if (range) {
      for (let index = 0; index < disabled.length; index++) {
        const element = disabled[index];
        if (range.from < element && range.to > element) {
          setRange();
          break;
        }
      }
    }
  }, [range]);
  let { id } = useParams();
  //(id);
  //   }, []);

  let disabledDates = [];
  useEffect(() => {
    axios.get(`http://localhost:7000/${id}`).then((res) => {
      setRoom(res.data);
      console.log(res.data);
      setUser(res.data.owner_id);
      setReviews(res.data.reviews);
      setReviewstoshow(res.data.reviews);
      setShow(true);
      //(res.data.reservations);
      // for (let index = 0; index < res.data.reservations.length; index++) {
      //   const element = res.data.reservations[index];
      //   //([{dateEnd:element.dateEnd}]);
      // }
      //(res.data.reservations.length);
      for (let index = 0; index < res.data.reservations.length; index++) {
        const element = res.data.reservations[index];

        // //(element);
        const dateStart = new Date(res.data.reservations[index].dateStart);
        const dateEnd = new Date(res.data.reservations[index].dateEnd);
        const date = new Date(dateStart.getTime());
        // //(date);

        var dates = [];
        while (date <= dateEnd) {
          dates.push(new Date(date));
          date.setDate(date.getDate() + 1);
        }

        dates.pop();
        // setDisabled([...disabled, dates]);
        disabledDates.push(dates);
        // //(dates);
        for (let index = 0; index < dates.length; index++) {
          const element = dates[index];
          //(element);
          setDisabled((current) => [...current, element]);
        }
        // //("pushed");
        // //(dates);
        // //(JSON.stringify(dates));
        // while (dateStart < dateEnd) {
        //   //("dateStart");
        //   //(dateEnd);
        //   let newDate = dateStart.getDate() + 1;
        //   let loop = new Date(newDate);
        // }
      }
      // this.setState({ persons });
    });
  }, []);

  useEffect(() => {
    console.log(room.images);
  }, [room]);
  //   const classes = useStyles();

  const [index, setActiveStep] = React.useState(0);

  const selectedDaysToDisable = [
    new Date(2022, 11, 28),
    new Date(2022, 11, 23),
    new Date(2022, 11, 29),
  ];
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  return (
    <div className="h-[2000px] mx-auto  ">
      <Toaster />
      <div className="top text-center items-center  2md:hidden   py-3 flex justify-between">
        <i
          onClick={() => {
            setShowsearch(false);
          }}
          className="fa-solid fa-arrow-left mx-6   p-2 border border-gray-400 rounded-full bg-white  "
        ></i>
        <p className="text-lg font-semibold w-full     ">{room.category}</p>
        <div className="mx-10"></div>
      </div>
      <div className="">
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
          single={true}
        />
        <hr />
      </div>
      <div className="px-10 2md:px-32  py-5 ">
        <p className=" font-semibold  mx-auto  ">
          A randomly generated room with random features.
        </p>
        <p className=" font-medium items-center">
          <p className="  ">
            <p className="flex items-center">
              <i class="fa-solid fa-star"></i> &nbsp;
              {reviewRatio > 0 ? <>{Math.round(reviewRatio)}</> : <>0</>}
              &nbsp;·&nbsp;
              <p>{room.reviews?.length} reviews</p>
            </p>
          </p>
          <p className="  ">
            <p> {room.address}</p>
          </p>
          <a
            href={`https://www.google.com/maps/dir/${latitude},${longitude}/${room.latitude},${room.longitude}/`}
            style={{
              textDecoration: "none",
              color: "#2F7AFF",
              marginTop: "0px",
              cursor: "pointer",
            }}
          >
            &nbsp;&nbsp;View on maps
          </a>
        </p>
      </div>
      <br />
      <br />
      <div className=" mx-10 2md:mx-auto  2md:w-[81%] m-auto     ">
        <Carousel>
          {room.images?.map((image) => (
            <div>
              <img src={image} className="object-contain rounded-xl " />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="2md:flex      mt-6  mx-7">
        <div className="  2md:px-24 outline">
          <p className="text-2xl font-medium   ">
            {room.houseType} hosted by {User.name}
          </p>
          <p className="">
            {" "}
            {room.guests} guests · {room.total_bedrooms} bedrooms ·{" "}
            {room.total_bathrooms} baths · {room.total_occupancy} sq. ft
          </p>
          <br />
          <p className="font-medium text-2xl w-96">What this place offers</p>
          <br />
          <div className=" ">
            {room.has_tv ? (
              <>
                <i className="fa fa-light fa-tv"></i>
                &nbsp;&nbsp;Television
              </>
            ) : (
              <>
                {" "}
                <i
                  style={{ color: "#B0B0B0" }}
                  className="fa fa-light fa-tv"
                ></i>{" "}
                &nbsp;&nbsp;&nbsp;<strike>Television</strike>{" "}
              </>
            )}{" "}
            {/* </p> */}
            <br />
            <br />
            {room.has_kitchen ? (
              <>
                <i className="fa fa-light fa-kitchen-set"></i> &nbsp;&nbsp;
                Kitchen
              </>
            ) : (
              <>
                <i
                  style={{ color: "#B0B0B0" }}
                  className="fa fa-light fa-kitchen-set"
                ></i>
                &nbsp;&nbsp;&nbsp; <strike>Kitchen</strike>
              </>
            )}
            <br />
            <br />
            {room.has_aircon ? (
              <>
                <i className="fa-solid fa-wind"></i> &nbsp;&nbsp; Air condition
              </>
            ) : (
              <>
                <i
                  style={{ color: "#B0B0B0" }}
                  className="fa-solid fa-wind"
                ></i>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <strike>Air condition</strike>
              </>
            )}
            <br />
            <br />
            {room.has_heating ? (
              <>
                {" "}
                <i className="fa-solid fa-temperature-arrow-up"></i>{" "}
                &nbsp;&nbsp; Heating{" "}
              </>
            ) : (
              <>
                {" "}
                <i
                  style={{ color: "#B0B0B0" }}
                  className="fa-solid fa-temperature-arrow-up"
                ></i>{" "}
                &nbsp;&nbsp;&nbsp;
                <strike>Heating</strike>{" "}
              </>
            )}
            <br />
            <br />
            {room.has_internet ? (
              <>
                <i className="fa-solid fa-wifi"></i>
                &nbsp;&nbsp; Internet
              </>
            ) : (
              <>
                {" "}
                <i
                  style={{ color: "#B0B0B0" }}
                  className="fa-solid fa-wifi"
                ></i>{" "}
                &nbsp;&nbsp;
                <strike>Internet</strike>{" "}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
