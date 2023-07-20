
import './App.css';

import PokemonList from './components/PokemonList';

function App() {

  //const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className="App">
     <h1>Pokémon Finder</h1>
      <PokemonList />
    </div>
  );
}

export default App;
