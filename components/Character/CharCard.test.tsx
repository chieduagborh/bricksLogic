import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CharCard from "./CharCard";
import React from "react";

const char = {
  name: "Rick Sanchez",
  species: "Human",
  status: "Alive",
  gender: "",
  origin: {
    name: "",
  },
  location: {
    name: "Earth (C-137)",
    url: "https://rickandmortyapi.com/api/location/1/",
  },
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  episode: [],
};

describe("CharCard", () => {
  it("should render the name, species, status, location, and image of the character", () => {
    render(
      <CharCard
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

    expect(
      screen.getByRole("heading", { name: /Rick Sanchez/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Species: Human/i)).toBeInTheDocument();
    expect(screen.getByText(/Alive/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Rick Sanchez/i)).toHaveAttribute(
      "src",
      char.image
    );
  });
});
