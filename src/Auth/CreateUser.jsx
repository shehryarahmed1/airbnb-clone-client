import React, { useEffect } from "react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { app, storage } from "../Firebaseconfig/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from "axios";
const CreateUser = () => {
  const navigate = useNavigate();

  const [buttonLoading, setbuttonLoading] = useState(false);
  const [showCountry, setShowCountry] = useState(false);
  const [countryInp, setCountryInp] = useState("");
  const [image, setImage] = useState(
    "https://t4.ftcdn.net/jpg/03/31/69/91/360_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg"
  );
  const [progress, setProgress] = useState();
  const [imageSelected, setImageSelected] = useState(false);
  const [countries, setCountries] = useState([]);
  const [values, setValues] = useState([
    {
      name: "",
      email: "",
      work: "",
      about: "",
      password: "",
      confirmPassword: "",
      phone: "",
    },
  ]);
  function handleChange(evt) {
    const value = evt.target.value;
    setValues({
      ...values,
      [evt.target.name]: value,
    });
  }
  function handleImgChange(e) {
    const element = e.target.files[0];
    const storageRef = ref(
      storage,
      `images/${Math.floor(Math.random() * 962975179234)}`
    );
    const uploadTask = uploadBytesResumable(storageRef, element);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setProgress(progress);
      },
      (error) => {
        console.log(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImage(downloadURL);
          setImageSelected(true);
          // toast.success("Room created");
        });
      }
    );
  }
  useEffect(() => {
    if (countryInp.length > 0) {
      axios
        .get(`https://restcountries.com/v3.1/name/${countryInp}`)
        .then((response) => {
          setCountries(response.data);

          console.log(response);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  }, [countryInp]);

  return (
    <div className="bg-[#FF595D]">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white p-5 rounded-lg w-96   ">
        <div className="create m-auto w-28  py-3  ">
          <div className="font-semibold text-3xl text-[#555555] ">Sign up</div>
        </div>
        <div className="fields py-5   w-72  mx-auto">
          <p className="text-sm mx-2.5">Name</p>
          <input
            type="text"
            value={values.name}
            onChange={handleChange}
            name="name"
            className="border  h-9 w-72 p-2 py-5 mt-3 text-sm   outline-none  border-gray-200 rounded-md bg-[#F7F7F7]"
          />
        </div>
        <div className="fields py-5   w-72  mx-auto">
          <p className="text-sm mx-2.5">Email</p>
          <input
            type="email"
            value={values.email}
            onChange={handleChange}
            name="email"
            className="border  h-9 w-72 p-2 py-5 mt-3 text-sm   outline-none  border-gray-200 rounded-md bg-[#F7F7F7]"
          />
        </div>
        <div className="fields py-5   w-72  mx-auto">
          <p className="text-sm mx-2.5">Password</p>
          <input
            type="password"
            value={values.password}
            onChange={handleChange}
            name="password"
            className="border  h-9 w-72 p-2 py-5 mt-3 text-sm   outline-none  border-gray-200 rounded-md bg-[#F7F7F7]"
          />
        </div>
        <div className="fields py-5   w-72  mx-auto">
          <p className="text-sm mx-2.5">Confirm Passowrd</p>
          <input
            type="password"
            value={values.confirmPassword}
            onChange={handleChange}
            name="confirmPassword"
            className="border  h-9 w-72 p-2 py-5 mt-3 text-sm   outline-none  border-gray-200 rounded-md bg-[#F7F7F7]"
          />
        </div>
        <div className="fields py-5   w-72  mx-auto">
          <p className="text-sm mx-2.5">Work</p>
          <input
            type="text"
            value={values.work}
            onChange={handleChange}
            name="work"
            className="border  h-9 w-72 p-2 py-5 mt-3 text-sm   outline-none  border-gray-200 rounded-md bg-[#F7F7F7]"
          />
        </div>
        <div className="fields py-5   w-72  mx-auto">
          <p className="text-sm mx-2.5">Country</p>
          <input
            type="text"
            value={countryInp}
            name="country"
            onFocus={() => {
              setShowCountry(true);

              console.log("True");
            }}
            onBlur={() =>
              setTimeout(function () {
                setShowCountry(false);
                console.log("False");
              }, 500)
            }
            autocomplete="off"
            onChange={(e) => setCountryInp(e.target.value)}
            className="border  h-9 w-72 p-2 py-5 mt-3 text-sm   outline-none  border-gray-200 rounded-md bg-[#F7F7F7]"
          />
          {showCountry ? (
            <>
              {countryInp.length > 0 ? (
                <div className="relative    ">
                  <button type="button" className=""></button>

                  <div className="absolute  top-1  z-10 w-72  bg-white border border-gray-100 rounded-3xl  shadow-lg">
                    <div className="p-2 ">
                      <div className="block  py-2 text-sm text-gray-500  ">
                        {countries.map((country) => (
                          <div
                            onClick={() => {
                              setCountryInp(country.name.common);

                              const timeout = setTimeout(() => {
                                setShowCountry(false);
                              }, 100);
                            }}
                            className="flex   items-center  text-center px-4 h-16 rounded-xl  cursor-pointer   hover:bg-gray-50   "
                          >
                            <div className="icon__location     bg-[#EBEBEB] px-1.5  py-1.5  rounded-lg">
                              <img
                                src={country.flags.png}
                                alt=""
                                className="h-8 w-12 rounded-md object-cover"
                              />
                            </div>
                            <p className="px-3    text-gray-600 text-base">
                              {country.name.common}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : // <div className="relative">
              //   <button type="button" className=""></button>

              //   <div className="absolute right-10 z-10 w-72 -top-10   bg-white border border-gray-100 rounded-xl  shadow-lg">
              //     <div className="p-2    ">
              //       <a
              //         href="#"
              //         className="block  py-2 text-sm text-gray-500  "
              //       >
              //         <div className="text-center">No country found</div>
              //       </a>
              //     </div>
              //   </div>
              // </div>
              null}
            </>
          ) : null}
        </div>
        <div className="fields py-5   w-72  mx-auto">
          <p className="text-sm mx-2.5">Phone</p>
          <input
            value={values.phone}
            onChange={handleChange}
            name="phone"
            type="number"
            className="border  h-9 w-72 p-2 py-5 mt-3 text-sm   outline-none  border-gray-200 rounded-md bg-[#F7F7F7]"
          />
        </div>
        <div className="fields py-5   w-72  mx-auto">
          <p className="text-sm mx-2.5">About</p>
          <input
            value={values.about}
            onChange={handleChange}
            name="about"
            type="text"
            className="border  h-9 w-72 p-2 py-5 mt-3 text-sm   outline-none  border-gray-200 rounded-md bg-[#F7F7F7]"
          />
        </div>
        <div className="mx-7">
          <label
            className="block mb-2 text-sm font-medium  "
            htmlFor="file_input"
          >
            {imageSelected ? (
              <>
                <img
                  src={image}
                  className="h-10 w-10 object-cover rounded-md border border-gray-200"
                  alt=""
                />
              </>
            ) : (
              <>
                {progress ? <>{progress}%&nbsp;</> : null}
                Choose a profile picture?
              </>
            )}
          </label>
          <input
            className="block  p-1  w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 "
            id="file_input"
            type="file"
            onChange={handleImgChange}
          />
        </div>
        {values.password == values.confirmPassword ? null : (
          <div className="px-8 text-sm text-red-600">
            Password is not matching{" "}
          </div>
        )}

        <br />
        <div
          onClick={() => {
            console.log(values);
          }}
          className=" m-auto w-72 "
        >
          {!values.name ||
          !values.email ||
          !values.password ||
          !values.confirmPassword ||
          !values.work ||
          !countryInp ||
          !values.phone ||
          !values.about ||
          values.password != values.confirmPassword ? (
            <button className="p-1.5 rounded-md cursor-default   bg-[#545454] text-white font-medium w-72  ">
              Sign up
            </button>
          ) : (
            <button
              onClick={() => {
                if (!buttonLoading) {
                  setbuttonLoading(true);
                  const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      name: values.name,
                      email: values.email,
                      password: values.password,
                      work: values.work,
                      about: values.about,
                      phone: values.phone,
                      country: countryInp,
                      profile_image: image,
                    }),
                  };
                  fetch("http://localhost:7000/signup", requestOptions)
                    .then(async (response) => {
                      const isJson = response.headers
                        .get("content-type")
                        ?.includes("application/json");
                      const data = isJson && (await response.json());

                      // check for error response
                      if (!response.ok) {
                        // get error message from body or default to response status
                        console.log(data);
                        // const error = (data && data.message) || response.status;
                        setbuttonLoading(false);
                        return toast.error(data.error);
                      }
                      console.log(data);
                      setbuttonLoading(false);
                      setTimeout(() => {
                        navigate("/login");
                      }, 100);
                    })
                    .catch((error) => {
                      console.error("There was an error!", error);
                    });
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
                  <p>Sign up</p>
                </div>
              ) : (
                <> Sign up</>
              )}
            </button>
          )}
        </div>
        <br />
        <br />

        <div className="flex  w-[15rem] text-[#A9A6AE] mx-auto">
          <div className=" ">Don't have an account?&nbsp;</div>
          <div
            onClick={() => {
              navigate("/login");
            }}
            className="underline cursor-pointer"
          >
            Sign in{" "}
          </div>
        </div>
        <br />
      </div>{" "}
    </div>
  );
};

export default CreateUser;
