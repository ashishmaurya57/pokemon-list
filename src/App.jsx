import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "./components/PokemonCard";
import Search from "./components/Search";
import './App.css';

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=50");
        const results = response.data.results;

        const pokemonDataPromises = results.map(async (pokemon) => {
          const res = await axios.get(pokemon.url);
          return {
            name: pokemon.name,
            image: res.data.sprites.front_default,
          };
        });

        const pokemonData = await Promise.all(pokemonDataPromises);
        setPokemonList(pokemonData);
        setFilteredPokemon(pokemonData);
      } catch (error) {
        console.error("Error fetching Pokémon data", error);
      }
    };

    fetchPokemonData();
  }, []);

  useEffect(() => {
    const filtered = pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPokemon(filtered);
  }, [searchQuery, pokemonList]);

  return (
    <div className="app-container">
      <h1>Pokémon List</h1>
      <Search setSearchQuery={setSearchQuery} />
      
      <div className="pokemon-grid">
        {filteredPokemon.length > 0 ? (
          filteredPokemon.map((pokemon, index) => (
            <PokemonCard key={index} name={pokemon.name} image={pokemon.image} />
          ))
        ) : (
          <p>No Pokémon found!</p>
        )}
      </div>
    </div>
  );
};

export default App;
