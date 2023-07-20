import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import './PokemonList.css';
import Header from './Header';

const PokemonList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemonData, setPokemonData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=250')
      .then(response => response.json())
      .then(data => {
        const promises = data.results.map(pokemon =>
          fetch(pokemon.url).then(response => response.json())
        );

        Promise.all(promises).then(detailedData => {
          setPokemonData(detailedData);
        });
      });
  }, []);

  const filteredData = pokemonData.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Header />
      <SearchBar setSearchTerm={setSearchTerm} />
      <div className="pokemon-list-wrapper">
        <div className="pokemon-grid">
          {paginatedData.map(pokemon => (
            <div className="pokemon-card" key={pokemon.name}>
              <span id="name">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</span>
              <img src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} />
              <p>CP: {pokemon.base_experience}</p>
              <p>Attack: {pokemon.stats[1].base_stat}</p>
              <p>Defense: {pokemon.stats[2].base_stat}</p>
              <p>Type: {pokemon.types.map(type => type.type.name.toUpperCase()).join(', ')}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="pagination-wrapper">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default PokemonList;
