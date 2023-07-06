
import { useState } from "react";
import React from "react";

const SearchComponent = ({ onSearch }) => {
  const [searchCriteria, setSearchCriteria] = useState('');

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchCriteria(value);
    onSearch(value); 
  };

  return (
    <div>
      <input
        type="text"
        value={searchCriteria}
        onChange={handleInputChange}
        style={{
          backgroundColor: 'lightblue',
          fontWeight: 'bold',
          borderRadius: '20px',
          color: 'black',
          padding: '5px',
        }}
      />
      <button
        onClick={() => onSearch(searchCriteria)}
        style={{
          backgroundColor: 'darkblue',
          fontWeight: 'bold',
          borderRadius: '20px',
          color: 'yellow',
          padding: '5px 10px',
          marginLeft: '5px',
        }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchComponent;
