import Image from "next/image";
import notfound from "/public/assets/images/oh-geez.jpg";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center">
      <h4 className="p-5 text-2xl font-semibold text-rm-brown">
        Oh Geez, try looking for another Character.
      </h4>
      <Image
        src={notfound}
        alt="rick and morty logo"
        className="md:w-[60%] rounded-full"
      />
    </div>
  );
};

export default NotFound;
