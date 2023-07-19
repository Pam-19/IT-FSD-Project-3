import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';

const PokemonList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
      .then(response => response.json())
      .then(data => {
        // Fetch detailed data for each Pokémon
        const promises = data.results.map(pokemon =>
          fetch(pokemon.url).then(response => response.json())
        );

        // Wait for all promises to resolve and set the data
        Promise.all(promises).then(detailedData => {
          setPokemonData(detailedData);
        });
      });
  }, []);

  const filteredData = pokemonData.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <SearchBar setSearchTerm={setSearchTerm} />
      <div>
        {filteredData.map(pokemon => (
          <div key={pokemon.name}>
            <span id="name">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</span>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>CP: {pokemon.base_experience}</p>
            <p>Attack: {pokemon.stats[1].base_stat}</p>
            <p>Defense: {pokemon.stats[2].base_stat}</p>
            <p>Type: {pokemon.types.map(type => type.type.name).join(', ')}</p>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
