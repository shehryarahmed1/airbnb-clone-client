import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { app, storage } from "../Firebaseconfig/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
const MyAccount = () => {
  const [name, setName] = useState("");
  const [work, setWork] = useState("");
  const [about, setAbout] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(100);
  const [showCountry, setShowCountry] = useState(false);
  const [countryInp, setCountryInp] = useState("");
  const [countries, setCountries] = useState([]);
  const [prevEmail, setPrevEmail] = useState("");
  const [email, setEmail] = useState("");
  const [buttonLoading, setbuttonLoading] = useState("");

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

  const handleSubmit = async () => {
    try {
      const { data } = await axios({
        method: "put",
        headers: {
          token: localStorage.getItem("token"),
        },
        url: "http://localhost:7000/api/update/user",
        data: {
          name,
          work,
          country: countryInp,
          phone,
          about,
          profile_image: image,
        },
      });

      console.log(data);
      window.location.reload(false);
    } catch (err) {
      if (err.response.status === 422) {
        toast.error(err.response.message);
      } else {
        console.log(err.message);
      }
    }
  };

  useEffect(() => {
    const headers = {
      token: localStorage.getItem("token"),
    };
    axios
      .get("http://localhost:7000/api/get/my/user", { headers })
      .then((response) => {
        setName(response.data[0].name);
        setWork(response.data[0].work);
        setAbout(response.data[0].about);
        setPhone(response.data[0].phone);
        setImage(response.data[0].profile_image);
        setPrevEmail(response.data[0].email);
        setEmail(response.data[0].email);
        setCountryInp(response.data[0].country);
        console.log(response.data[0]);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);
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
          // toast.success("Room created");
        });
      }
    );
  }
  return (
    <div className="bg-[#FF595D]   h-[5000px]  pt-16">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white p-5  m-auto  rounded-lg w-96   ">
        <div className="create m-auto w-16  py-3  ">
          <img
            src={image}
            alt=""
            className="h-16 w-16 rounded-full object-cover"
          />
          <div class="flex items-center justify-center w-full">
            <label
              for="dropzone-file"
              class="flex flex-col items-center justify-center w-full h-7    rounded-lg cursor-pointer     "
            >
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <p className="font-semibold cursor-pointer underline text-xs  mt-2 text-center ">
                  {progress != 100 ? <>{progress} %</> : <>Edit photo</>}
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                class="hidden"
                onChange={handleImgChange}
              />
            </label>
          </div>
        </div>

        <div className="fields py-5   w-72  mx-auto">
          <p className="text-sm mx-2.5">Name</p>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="border  h-9 w-72 p-2 py-5 mt-3 text-sm   outline-none  border-gray-200 rounded-md bg-[#F7F7F7]"
          />
        </div>

        <div className="fields py-5   w-72  mx-auto">
          <p className="text-sm mx-2.5">Work</p>
          <input
            type="text"
            value={work}
            onChange={(e) => {
              setWork(e.target.value);
            }}
            className="border  h-9 w-72 p-2 py-5 mt-3 text-sm   outline-none  border-gray-200 rounded-md bg-[#F7F7F7]"
          />
        </div>

        <div className="fields py-5   w-72  mx-auto">
          <p className="text-sm mx-2.5">About</p>
          <input
            type="text"
            value={about}
            onChange={(e) => {
              setAbout(e.target.value);
            }}
            className="border  h-9 w-72 p-2 py-5 mt-3 text-sm   outline-none  border-gray-200 rounded-md bg-[#F7F7F7]"
          />
        </div>

        <div className="fields py-5   w-72  mx-auto">
          <p className="text-sm mx-2.5">Phone</p>
          <input
            type="number"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            className="border  h-9 w-72 p-2 py-5 mt-3 text-sm   outline-none  border-gray-200 rounded-md bg-[#F7F7F7]"
          />
        </div>

        <div className="fields py-5   w-72  mx-auto">
          <p className="text-sm mx-2.5">Country</p>
          <input
            type="text"
            value={countryInp}
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

        <br />
        <div className=" m-auto w-72 ">
          {false ? (
            <button className="p-1.5 rounded-md cursor-default   bg-[#545454] text-white font-medium w-72  ">
              Update
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
                  <p>Update</p>
                </div>
              ) : (
                <> Update</>
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

export default MyAccount;
