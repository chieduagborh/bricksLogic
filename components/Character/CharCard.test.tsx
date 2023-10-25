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
    expect(screen.getByText(/Earth (C-137)/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Rick Sanchez/i)).toHaveAttribute(
      "src",
      char.image
    );
  });

  it("should render a modal with a list of episodes when the user clicks on the 'See list of Episodes' link", () => {
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

    const seeEpisodesLink = screen.getByText(/See list of Episodes/i);
    expect(seeEpisodesLink).toBeInTheDocument();

    seeEpisodesLink.click();

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
