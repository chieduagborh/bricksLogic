import React, { useState } from "react";
import EpisodeModal from "../EpisodeModal";

interface Props {
  name: string;
  species: string;
  gender: string;
  status: string;
  location: string;
  image_url: string;
  origin: string;
  episode: any[];
}

const CharCard: React.FC<Props> = ({
  name,
  species,
  gender,
  status,
  location,
  image_url,
  origin,
  episode,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="hover:cursor-pointer relative group bg-gradient-to-b from-[#f0e14a] via-[#97ce4c] to-[#C3ED3F] text-center rounded-lg relative border-[#141414] border-2 border-solid shadow-[5px_5px_1px_1px_rgba(20,20,20,1)]">
        {(() => {
          if (status === "Dead") {
            return <div className={`absolute badge bg-dead`}>{status}</div>;
          } else if (status === "Alive") {
            return <div className={`absolute badge bg-alive`}>{status}</div>;
          } else {
            return <div className={`absolute badge bg-normal`}>{status}</div>;
          }
        })()}

        <img
          className="rounded-full"
          src={image_url}
          alt={"Image of " + name}
        ></img>
        <div className="bg-white rounded-lg absolute w-full bottom-[0%] opacity-[.85] py-2 h-[4rem] overflow-hidden transition-max-h duration-300 ease-in-out group-hover:h-[13rem]">
          <h2>{name}</h2>
          <h3>Species: {species}</h3>
          <div className="mt-2 text-left px-10 text-sm">
            <h5>
              Gender: <span className="">{gender}</span>
            </h5>
            <h5>
              Origin: <span>{origin}</span>
            </h5>
            <h5>
              Last known location:
              <br />
              <span>{location}</span>
            </h5>
            See list of Episodes:{" "}
            <span
              className="text-rm-pink font-bold cursor-zoom-in hover:text-rm-brown"
              onClick={openModal}
            >
              {episode.length}
            </span>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay absolute" onClick={closeModal}>
          <EpisodeModal episode={episode} />
        </div>
      )}
    </>
  );
};

export default CharCard;
