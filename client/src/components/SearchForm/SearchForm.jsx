// components/SearchForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FilterOptions from '../FilterOptions/FilterOptions';
import SearchResults from '../SearchResults/SearchResults';
import './SearchForm.css';

const SearchForm = () => {
  const [searchForm, setSearchForm] = useState({
    bloodGroup: '',
    region: '',
  });

  const [userData, setUserData] = useState([]);
  const [bloodGroups, setBloodGroups] = useState([]);
  const [regions, setRegions] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000');
        setUserData(response.data);

        // Extract unique blood groups and regions from user data
        const uniqueBloodGroups = [...new Set(response.data.map((user) => user.Blood_Group))];
        const uniqueRegions = [...new Set(response.data.map((user) => user.Region))];

        setBloodGroups(uniqueBloodGroups);
        setRegions(uniqueRegions);
      } catch (error) {
        console.error('Error fetching user data:', error.response);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    const bloodGroupMatch = searchForm.bloodGroup ? (user) => user.Blood_Group === searchForm.bloodGroup : () => true;
    const regionMatch = searchForm.region ? (user) => user.Region === searchForm.region : () => true;
    const results = userData.filter((user) => bloodGroupMatch(user) && regionMatch(user));
    setFilteredResults(results);
  };
 
  return (
    <div className='SearchContainer'>
        <div className='register-form container'>
          <h2>Search</h2>
        
          <div>
              <FilterOptions
                title="Blood Group"
                options={bloodGroups}
                onSelect={(value) => setSearchForm((prevForm) => ({ ...prevForm, bloodGroup: value }))}
              />
              <FilterOptions
                title="Region"
                options={regions}
                onSelect={(value) => setSearchForm((prevForm) => ({ ...prevForm, region: value }))}
              />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
      <SearchResults results={filteredResults} />
    </div>
  );
};

export default SearchForm;
