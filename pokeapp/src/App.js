import logo from './logo.svg';
import './App.css';
import SearchBar from './components/SearchBar';
import { useState } from 'react';
import PokemonList from './components/PokemonList';

function App() {

  //const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className="App">
     <h1>Pokémon Search</h1>
      <PokemonList />
    </div>
  );
}

export default App;
