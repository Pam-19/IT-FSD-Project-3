import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import './PokemonList.css'; // Import the CSS file for styling

const PokemonList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemonData, setPokemonData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=200')
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

  // Pagination configuration
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  return (
    <div>
      <SearchBar setSearchTerm={setSearchTerm} />
      <div className="pokemon-list-wrapper">
      <div className="pokemon-grid">
        {paginatedData.map(pokemon => (
          <div className="pokemon-card" key={pokemon.name}>
            <span id="name">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</span>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>CP: {pokemon.base_experience}</p>
            <p>Attack: {pokemon.stats[1].base_stat}</p>
            <p>Defense: {pokemon.stats[2].base_stat}</p>
            <p>Type: {pokemon.types.map(type => type.type.name.toUpperCase()).join(', ')}</p>
            {/* Add more details as needed */}
          </div>
          
        ))}
      </div>
      <div className="pagination-wrapper">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      </div>
      </div>
    </div>
  );
};

export default PokemonList;
