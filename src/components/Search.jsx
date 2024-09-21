import React from "react";

const Search = ({ setSearchQuery }) => {
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search Pokémon..."
        onChange={handleInputChange}
        className="search-input"
      />
    </div>
  );
};

export default Search;
