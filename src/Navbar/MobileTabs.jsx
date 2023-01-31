import React from "react";

const MobileTabs = () => {
  return (
    <div>
      <div className="w-full h-screen  ">
        {/* <section id="bottom-navigation" className="md:hidden block fixed inset-x-0 bottom-0 z-10 bg-white shadow"> // if shown only tablet/mobile*/}
        <section
          id="bottom-navigation"
          className="block fixed inset-x-0 bottom-0 z-10 bg-white shadow"
        >
          <div id="tabs" className="flex border-t  justify-between">
            <a
              href="#"
              className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1"
            >
              <i className="fa-solid fa-magnifying-glass text-2xl text-[#ff385c]"></i>
              <span className="tab tab-kategori block text-xs text-[#b0b0b0]">
                Explore
              </span>
            </a>
            <a
              href="#"
              className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1"
            >
              <i className="fa-solid fa-plane text-2xl text-[#b0b0b0]"></i>
              <span className="tab tab-kategori block text-xs text-[#b0b0b0]">
                Trips
              </span>
            </a>
            <a
              href="#"
              className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1"
            >
              <i className="fa-solid fa-gauge text-2xl text-[#b0b0b0]"></i>
              <span className="tab tab-kategori block text-xs text-[#b0b0b0]">
                Dashabord
              </span>
            </a>
            <a
              href="#"
              className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1"
            >
              <i className="fa-solid fa-user  text-2xl text-[#b0b0b0]"></i>
              <span className="tab tab-kategori block text-xs text-[#b0b0b0]">
                Profile
              </span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MobileTabs;
