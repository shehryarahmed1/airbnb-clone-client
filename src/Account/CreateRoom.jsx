import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { app, storage } from "../Firebaseconfig/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const CreateRoom = () => {
  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowlocation(false);
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
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  const [buttonLoading, setbuttonLoading] = useState(false);
  const [houseType, setHousetype] = useState("");
  const [showHouseTypeSelection, setShowHouseTypeSelection] = useState(false);
  const [categoryType, setCategoryType] = useState("");
  const [showCategoryTypeSelection, setShowCategoryTypeSelection] =
    useState(false);
  const [locationInp, setLocationInp] = useState("");
  const [locations, setLocations] = useState([]);
  const [has_tv, setHas_tv] = useState(false);
  const [has_kitchen, setHas_kitchen] = useState(false);
  const [has_aircon, setHas_aircon] = useState(false);
  const [has_heating, setHas_heating] = useState(false);
  const [has_internet, setHas_internet] = useState(false);
  const [showLocation, setShowlocation] = useState(false);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [images, setImages] = useState([]);
  const [shouldUpload, setShouldUpload] = useState(false);
  const [imagesUploaded, setImagesUploaded] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  function handleImgChange(e) {
    console.log(e.target.files);
    setImages([...images, e.target.files[0]]);
  }

  useEffect(() => {
    console.log(images);
  }, [images]);

  useEffect(() => {
    if (locationInp.length <= 0) {
      setShowlocation(false);
    } else {
      setShowlocation(true);
      axios
        .get(
          `https://api.openweathermap.org/geo/1.0/direct?q=${locationInp}&limit=10&appid=2e1cd44eae7daa5780420cc506cb620c`
        )
        .then((response) => {
          setLocations(response.data);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  }, [locationInp]);

  const [values, setValues] = useState([
    {
      guests: 0,
      total_occupancy: 0,
      total_bedrooms: 0,
      total_bathrooms: 0,
      summary: "",
      address: "",
      price: "",
      latitude: 0,
      longitude: 0,
    },
  ]);

  const [categorySelectionArr, setCategorySelectionArr] = useState([
    {
      type: "Apartments",
    },
    {
      type: "Houses",
    },
    {
      type: "Villas",
    },
    {
      type: "Treehouses",
    },
    {
      type: "Farms",
    },
    {
      type: "Cabins",
    },
    {
      type: "Private rooms",
    },
    {
      type: "Camping",
    },
    {
      type: "Beaches",
    },
    {
      type: "Surfing",
    },
    {
      type: "Pools",
    },
    {
      type: "Ships",
    },
    {
      type: "Castles",
    },
    {
      type: "Vineyards",
    },
  ]);

  function handleChange(evt) {
    const value = evt.target.value;
    setValues({
      ...values,
      [evt.target.name]: value,
    });
  }

  useEffect(() => {
    if (shouldUpload == true) {
      if (!images > 0) {
        toast.error("Please add all the fields");
      } else {
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            houseType: houseType,
            guests: values.guests,
            total_occupancy: values.total_occupancy,
            total_bedrooms: values.total_bedrooms,
            total_bathrooms: values.total_bathrooms,
            summary: values.summary,
            address: values.address,
            has_tv: has_tv,
            has_kitchen: has_kitchen,
            has_aircon: has_aircon,
            has_heating: has_heating,
            has_internet: has_internet,
            price: values.price,
            latitude: latitude,
            longitude: longitude,
            images: imagesUploaded,
            place: locationInp,
            category: categoryType,
          }),
        };
        fetch("http://localhost:7000/create", requestOptions)
          .then(async (response) => {
            const isJson = response.headers
              .get("content-type")
              ?.includes("application/json");
            const data = isJson && (await response.json());

            // check for error response
            if (!response.ok) {
              // get error message from body or default to response status
              // const error = (data && data.message) || response.status;
              setbuttonLoading(false);
              return toast.error(data.error);
            }
            setbuttonLoading(false);
            toast.success("Room created successfully");
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
            setbuttonLoading(false);
          });
        console.log(imagesUploaded);
      }
    }
  }, [shouldUpload]);

  function handleSubmit() {
    setbuttonLoading(true);
    console.log(values);
    if (
      houseType &&
      values.guests &&
      values.total_occupancy &&
      values.total_bedrooms &&
      values.total_bathrooms &&
      values.summary &&
      values.address &&
      values.price &&
      latitude &&
      longitude
    ) {
      console.log(values);
      if (images.length > 0) {
        for (let index = 0; index < images.length; index++) {
          setbuttonLoading(true);
          const element = images[index];
          const storageRef = ref(
            storage,
            `images/${Math.floor(Math.random() * 962975179234123412355)}`
          );
          const uploadTask = uploadBytesResumable(storageRef, element);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
            },
            (error) => {
              console.log(error.message);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log("File available at", downloadURL);
                console.log("-------------");
                console.log(images);
                setImagesUploaded((array) => [...array, downloadURL]);
                if (index == images.length - 1) {
                  setTimeout(() => {
                    setShouldUpload(true);
                  }, 2000);
                }
                // toast.success("Room created");
              });
            }
          );
        }
      }
    } else {
      console.log("Not valid");
    }
  }

  return (
    <div className="bg-[#FF595D]  h-[5000px]  pt-16">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white p-5  m-auto  rounded-lg w-96   ">
        <div className="create m-auto w-48  py-3  ">
          <div className="font-semibold text-3xl text-[#555555] ">
            Create Room
          </div>
        </div>
        <div className="fields py-5   w-72  mx-auto">
          <p className="text-sm mx-2.5">House Type</p>
          <input
            type="text"
            onFocus={() => {
              setShowHouseTypeSelection(true);

              console.log("True");
            }}
            onBlur={() =>
              setTimeout(function () {
                setShowHouseTypeSelection(false);
                console.log("False");
              }, 500)
            }
            value={houseType}
            className="border  h-9 w-72 p-2 py-5 mt-3 text-sm   outline-none  border-gray-200 rounded-md bg-[#F7F7F7]"
          />
          {showHouseTypeSelection ? (
            <div>
              <div
                id="dropdown"
                class="z-10     bg-white divide-y divide-gray-100 rounded-lg shadow w-44 "
              >
                <ul
                  class="py-2 text-sm text-gray-700 "
                  aria-labelledby="dropdownDefaultButton"
                >
                  <li>
                    <a
                      onClick={() => {
                        setHousetype("Shared room");
                        setTimeout(function () {
                          setShowHouseTypeSelection(false);
                          console.log("False");
                        }, 500);
                      }}
                      class="block px-4 py-2 hover:bg-gray-100  cursor-pointer"
                    >
                      Shared Room
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        setHousetype("Private room");
                        setTimeout(function () {
                          setShowHouseTypeSelection(false);
                          console.log("False");
                        }, 500);
                      }}
                      class="block px-4 py-2 hover:bg-gray-100  cursor-pointer"
                    >
                      Private Room
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        setHousetype("Entire home");
                        setTimeout(function () {
                          setShowHouseTypeSelection(false);
                          console.log("False");
                        }, 500);
                      }}
                      class="block px-4 py-2 hover:bg-gray-100  cursor-pointer"
                    >
                      Entire Room
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          ) : null}
        </div>

        <div className="fields py-5   w-72  mx-auto">
          <p className="text-sm mx-2.5">Guests</p>
          <input
            type="number"
            value={values.guests}
            onChange={handleChange}
            name="guests"
            className="border  h-9 w-72 p-2 py-5 mt-3 text-sm   outline-none  border-gray-200 rounded-md bg-[#F7F7F7]"
          />
        </div>

        <div className="fields py-5   w-72  mx-auto">
          <p className="text-sm mx-2.5">Category</p>
          <input
            type="text"
            onFocus={() => {
              setShowCategoryTypeSelection(true);

              console.log("True");
            }}
            onBlur={() =>
              setTimeout(function () {
                setShowCategoryTypeSelection(false);
                console.log("False");
              }, 500)
            }
            value={categoryType}
            className="border  h-9 w-72 p-2 py-5 mt-3 text-sm   outline-none  border-gray-200 rounded-md bg-[#F7F7F7]"
          />
          {showCategoryTypeSelection ? (
            <div>
              <div
                id="dropdown"
                class="z-10     bg-white divide-y divide-gray-100 rounded-lg shadow w-44 "
              >
                <ul
                  class="py-2 text-sm text-gray-700 "
                  aria-labelledby="dropdownDefaultButton"
                >
                  {categorySelectionArr?.map((category) => (
                    <li>
                      <a
                        onClick={() => {
                          setCategoryType(category.type);
                          setTimeout(function () {
                            setShowCategoryTypeSelection(false);
                            console.log("False");
                          }, 500);
                        }}
                        class="block px-4 py-2 hover:bg-gray-100  cursor-pointer"
                      >
                        {category.type}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </div>

        <div className="fields py-5   w-72  mx-auto">
          <p className="text-sm mx-2.5">Total occupancy (sq. ft)</p>
          <input
            type="number"
            value={values.total_occupancy}
            onChange={handleChange}
            name="total_occupancy"
            className="border  h-9 w-72 p-2 py-5 mt-3 text-sm   outline-none  border-gray-200 rounded-md bg-[#F7F7F7]"
          />
        </div>

        <div className="fields py-5   w-72  mx-auto">
          <p className="text-sm mx-2.5">Total bedrooms</p>
          <input
            type="number"
            value={values.total_bedrooms}
            onChange={handleChange}
            name="total_bedrooms"
            className="border  h-9 w-72 p-2 py-5 mt-3 text-sm   outline-none  border-gray-200 rounded-md bg-[#F7F7F7]"
          />
        </div>

        <div className="fields py-5   w-72  mx-auto">
          <p className="text-sm mx-2.5">Total bathrooms</p>
          <input
            type="number"
            value={values.total_bathrooms}
            onChange={handleChange}
            name="total_bathrooms"
            className="border  h-9 w-72 p-2 py-5 mt-3 text-sm   outline-none  border-gray-200 rounded-md bg-[#F7F7F7]"
          />
        </div>

        <div className="fields py-5   w-72  mx-auto">
          <p className="text-sm mx-2.5">Summary</p>
          <input
            type="text"
            value={values.summary}
            onChange={handleChange}
            name="summary"
            className="border  h-9 w-72 p-2 py-5 mt-3 text-sm   outline-none  border-gray-200 rounded-md bg-[#F7F7F7]"
          />
        </div>

        <div className="fields py-5   w-72  mx-auto">
          <p className="text-sm mx-2.5">Address</p>
          <input
            type="text"
            value={values.address}
            onChange={handleChange}
            name="address"
            className="border  h-9 w-72 p-2 py-5 mt-3 text-sm   outline-none  border-gray-200 rounded-md bg-[#F7F7F7]"
          />
        </div>

        <div className="fields py-5   w-72  mx-auto">
          <label>
            <input
              type="checkbox"
              defaultChecked={has_tv}
              onChange={() => setHas_tv(!has_tv)}
            />
            &nbsp;Has Tv
          </label>
        </div>

        <div className="fields py-5   w-72  mx-auto">
          <label>
            <input
              type="checkbox"
              defaultChecked={has_kitchen}
              onChange={() => setHas_kitchen(!has_kitchen)}
            />
            &nbsp;Has Kitchen
          </label>
        </div>

        <div className="fields py-5   w-72  mx-auto">
          <label>
            <input
              type="checkbox"
              defaultChecked={has_aircon}
              onChange={() => setHas_aircon(!has_aircon)}
            />
            &nbsp;Has Air conditioner
          </label>
        </div>

        <div className="fields py-5   w-72  mx-auto">
          <label>
            <input
              type="checkbox"
              defaultChecked={has_heating}
              onChange={() => setHas_heating(!has_heating)}
            />
            &nbsp;Has Heating
          </label>
        </div>

        <div className="fields py-5   w-72  mx-auto">
          <label>
            <input
              type="checkbox"
              defaultChecked={has_internet}
              onChange={() => setHas_internet(!has_internet)}
            />
            &nbsp;Has Internet
          </label>
        </div>

        <div className="fields py-5   w-72  mx-auto">
          <p className="text-sm mx-2.5">Price (usd)</p>
          <input
            type="number"
            value={values.price}
            onChange={handleChange}
            name="price"
            className="border  h-9 w-72 p-2 py-5 mt-3 text-sm   outline-none  border-gray-200 rounded-md bg-[#F7F7F7]"
          />
        </div>

        <div className="fields py-5   w-72  mx-auto">
          <p className="text-sm mx-2.5">Place</p>
          <input
            type="text"
            value={locationInp}
            onChange={(e) => setLocationInp(e.target.value)}
            className="border  h-9 w-72 p-2 py-5 mt-3 text-sm   outline-none  border-gray-200 rounded-md bg-[#F7F7F7]"
          />
          {showLocation ? (
            <>
              {locations.length > 0 ? (
                <div ref={wrapperRef} className="relative    ">
                  <button type="button" className=""></button>

                  <div className="absolute right-10   z-10 w-72 top-3 -mx-10  bg-white border border-gray-100 rounded-3xl  shadow-lg">
                    <div className="p-2 ">
                      <div className="block  py-2 text-sm text-gray-500  ">
                        {locations.map((location) => (
                          <div
                            onClick={() => {
                              setLocationInp("");
                              if (location.state == undefined) {
                                setLocationInp(
                                  `${location.name}, ${location.country}`
                                );
                              } else {
                                setLocationInp(
                                  `${location.name}, ${location.state}`
                                );
                              }

                              const timeout = setTimeout(() => {
                                setShowlocation(false);
                              }, 100);
                            }}
                            className="flex   items-center  text-center px-4 h-16 rounded-xl  cursor-pointer   hover:bg-gray-50   "
                          >
                            <div className="icon__location     bg-[#EBEBEB] px-4  py-3  rounded-lg">
                              <i className="fa-solid fa-location-dot text-xl"></i>
                            </div>
                            <p className="px-3    text-gray-600 text-base">
                              {location.name},
                              {location.state ? (
                                <> {location.state}</>
                              ) : (
                                <> {location.country}</>
                              )}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <button type="button" className=""></button>

                  <div className="absolute right-10 z-10 w-72 top-3 -mx-10   bg-white border border-gray-100 rounded-xl  shadow-lg">
                    <div className="p-2    ">
                      <a
                        href="#"
                        className="block  py-2 text-sm text-gray-500  "
                      >
                        <div className="text-center">No location found</div>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : null}
        </div>

        <div className="fields py-5   w-72  mx-auto">
          <p className="text-sm mx-2.5">Latitude</p>
          <input
            type="number"
            value={latitude}
            onChange={(e) => {
              setLatitude(e.target.value);
            }}
            className="border  h-9 w-72 p-2 py-5 mt-3 text-sm   outline-none  border-gray-200 rounded-md bg-[#F7F7F7]"
          />
        </div>

        <div className="fields py-5   w-72  mx-auto">
          <p className="text-sm mx-2.5">Longitude</p>
          <input
            type="number"
            value={longitude}
            onChange={(e) => {
              setLongitude(e.target.value);
            }}
            className="border  h-9 w-72 p-2 py-5 mt-3 text-sm   outline-none  border-gray-200 rounded-md bg-[#F7F7F7]"
          />
        </div>

        <div className="fields    w-72  mx-auto">
          <p
            onClick={() => {
              if (navigator.geolocation) {
                navigator.geolocation.watchPosition(function (position) {
                  console.log("Latitude is :", position.coords.latitude);
                  console.log("Longitude is :", position.coords.longitude);
                  setLatitude(position.coords.latitude);
                  setLongitude(position.coords.longitude);
                });
              }
            }}
            className=" mx-2 font-semibold underline cursor-pointer"
          >
            Use current location
          </p>
        </div>

        <div className="fields py-5   w-72  mx-auto">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 "
            htmlFor="file_input"
          >
            Upload image(s)&nbsp;
            {images.length > 0 ? (
              <>{images.length} images selected</>
            ) : (
              <>No image selected</>
            )}
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none       p-1   "
            id="file_input"
            type="file"
            onChange={handleImgChange}
          />
        </div>

        <br />
        <div className=" m-auto w-72 ">
          {!houseType ||
          !values.price ||
          !values.guests ||
          !values.total_occupancy ||
          !values.total_bedrooms ||
          !values.total_bathrooms ||
          !values.summary ||
          !values.address ||
          !locationInp ||
          !categoryType ? (
            <button className="p-1.5 rounded-md cursor-default   bg-[#545454] text-white font-medium w-72  ">
              Create
            </button>
          ) : (
            <button
              onClick={() => {
                if (!buttonLoading) {
                  handleSubmit();
                }
              }}
              className="p-1.5 rounded-md   bg-[#333333] hover:bg-[#333333f3] text-white font-medium w-72  "
            >
              {buttonLoading ? (
                <div className="flex mx-24">
                  {" "}
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="inline  h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                  <p>Create</p>
                </div>
              ) : (
                <> Create</>
              )}
            </button>
          )}
        </div>
        <br />
        <br />
      </div>{" "}
    </div>
  );
};

export default CreateRoom;
