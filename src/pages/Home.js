import React, { useState } from 'react';
import { searchForShows, searchForPeople } from '../api/tvmaze';
const Home = () => {
  const [searchStr, setSearchStr] = useState('');
  const [apiData, setApiData] = useState([]);
  const [apiDataError, setApiDataError] = useState(null);
  const [serachOption, setSearchOption] = useState('shows');

  const onSearchInputChnage = e => {
    setSearchStr(e.target.value);
  };

  const onRadioChange = e => {
    setSearchOption(e.target.value);
  };

  const onSearch = async e => {
    e.preventDefault();
    try {
      setApiDataError(null);
      if (serachOption === 'shows') {
        const result = await searchForShows(searchStr);
        setApiData(result);
      } else {
        const result = await searchForPeople(searchStr);
        setApiData(result);
      }
    } catch (error) {
      setApiDataError(error);
    }
  };

  const renderApiData = () => {
    if (apiDataError) {
      return <div>Error Occurred: {apiDataError.message}</div>;
    }

    if (apiData) {
      return apiData[0]?.show
        ? apiData.map(data => {
            return <div key={data.show.id}> {data.show.name}</div>;
          })
        : apiData.map(data => {
            return <div key={data.person.id}> {data.person.name}</div>;
          });
    }

    return null;
  };
  return (
    <div>
      <form onSubmit={onSearch}>
        <input type="text" value={searchStr} onChange={onSearchInputChnage} />
        <label>
          Shows
          <input
            type="radio"
            name="search-option"
            value="shows"
            checked={serachOption === 'shows'}
            onChange={onRadioChange}
          />
        </label>

        <label>
          Actors
          <input
            type="radio"
            name="search-option"
            value="actors"
            checked={serachOption === 'actors'}
            onChange={onRadioChange}
          />
        </label>

        <button type="submit">Search</button>
      </form>

      <div>{renderApiData()}</div>
    </div>
  );
};

export default Home;
