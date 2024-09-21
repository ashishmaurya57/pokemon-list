import React from "react";

const PokemonCard = ({ name, image }) => {
  return (
    <div className="pokemon-card">
      <img src={image} alt={name} className="pokemon-image" />
      <h3>{name}</h3>
    </div>
  );
};

export default PokemonCard;
