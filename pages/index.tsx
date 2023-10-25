import { NextPage } from "next";
import Image from "next/image";
import CharList from "@/components/Character/CharList";
import logo from "/public/assets/images/rick-morty-banner.png";

const Home: NextPage = () => {
  return (
    <div className="h-full bg-slate-200 pb-10">
      <div className="bg-black">
        <Image
          src={logo}
          alt="rick and morty logo"
          className="md:w-[50%] md:m-auto"
        />
      </div>
      <CharList />
    </div>
  );
};

export default Home;
