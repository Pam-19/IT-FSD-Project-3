import React from 'react'



    const SearchBar = ({ setSearchTerm }) => {
        const handleChange = event => {
          setSearchTerm(event.target.value);
        };

  return (
    

    <div>
        <div>Pokemon Search Bar </div>
      <input
      type="text"
      id="search"
      placeholder="        Search Here !!!"
      onChange={handleChange}
    />
    </div>
  )
}
export default SearchBar;
