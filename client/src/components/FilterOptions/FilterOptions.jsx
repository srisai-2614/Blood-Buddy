// components/FilterOptions.jsx
import React from 'react';
import './FilterOptions.css'
const FilterOptions = ({ title, options, onSelect }) => {
  return (
    <div className="filter-options">
      <label>{title}:</label>
      <select onChange={(e) => onSelect(e.target.value)}>
        <option value="">All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterOptions;
