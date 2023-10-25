import React, { useState, useEffect } from "react";
import { useGetCharactersQuery } from "generated/graphql";
import CharCard from "@/components/Character/CharCard";
import NotFound from "../NotFound";

export const CharList = () => {
  const [homeChar, setHomeChar] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const { loading, data, fetchMore } = useGetCharactersQuery({
    variables: { name: searchTerm },
  });

  useEffect(() => {
    if (data && data.characters?.results) {
      const startChar = data.characters.results;
      const filteredChars = startChar.filter((char: any) => {
        if (selectedStatus === "Dead") {
          return char.status === "Dead";
        } else if (selectedStatus === "Alive") {
          return char.status === "Alive";
        } else if (selectedStatus === "unknown") {
          return char.status === "unknown";
        } else {
          return true;
        }
      });
      setHomeChar(filteredChars);
    }
  }, [loading, data, selectedStatus, searchTerm]);

  const handleStatusFilter = (e: any) => {
    let status = e.target.value;
    setSelectedStatus(status);
  };

  const handlePage = (isNext: boolean) =>
    fetchMore({
      variables: {
        page: isNext ? page + 1 : page - 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          characters: { ...prev.characters, ...fetchMoreResult.characters },
        });
      },
    }).then(() => {
      setPage((prevPage) => (isNext ? prevPage + 1 : prevPage - 1));
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

  return (
    <div className="flex flex-col items-center mt-10">
      <input
        type="text"
        placeholder="Search Name..."
        onChange={(e) => setSearchTerm(e.target.value)}
        className="h-12 rounded-lg border w-96 focus:border-gray-400 p-3 outline-none"
        value={searchTerm}
      />

      <div className="py-5 md:w-[85%] w-[initial] mb-5 self-center">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>

        <h3 className="text-md mb-2">Status</h3>
        <div className="btn-status">
          <button
            className="px-4 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-700"
            value="All"
            onClick={handleStatusFilter}
          >
            All
          </button>
          <button
            className="px-4 py-1 rounded-lg bg-green-500 text-white hover:bg-green-700"
            value="Alive"
            onClick={handleStatusFilter}
          >
            Alive
          </button>
          <button
            className="px-4 py-1 rounded-lg bg-red-500 text-white hover:bg-red-700"
            value="Dead"
            onClick={handleStatusFilter}
          >
            Dead
          </button>
          <button
            className="px-4 py-1 rounded-lg bg-gray-400 text-gray-800 hover:bg-gray-600"
            value="unknown"
            onClick={handleStatusFilter}
          >
            Unknown
          </button>
        </div>
      </div>

      {data && data?.characters?.results ? (
        homeChar.length === 0 ? (
          <NotFound />
        ) : (
          <div className="grid md:grid-cols-4 gap-4 place-items-center md:w-[85%] ">
            {homeChar
              .filter((char: any) => {
                if (searchTerm === "") {
                  return char;
                } else if (
                  char.name.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return char;
                }
              })
              .map((char: any, i: number) => {
                return (
                  <CharCard
                    key={i}
                    name={char.name}
                    species={char.species}
                    gender={char.gender}
                    status={char.status}
                    location={char.location.name}
                    image_url={char.image}
                    origin={char.origin.name}
                    episode={char.episode}
                  />
                );
              })}
          </div>
        )
      ) : (
        <div className="portal relative">
          <div className="portal-title">
            <span>Loading...</span>
          </div>
        </div>
      )}

      {homeChar.length !== 0 && (
        <div className="flex mt-10">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
            onClick={() => handlePage(false)}
            disabled={!data?.characters?.info?.prev}
          >
            Prev
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
            onClick={() => handlePage(true)}
            disabled={!data?.characters?.info?.next}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CharList;
