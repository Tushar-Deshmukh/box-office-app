const baseUrl = 'https://api.tvmaze.com';
const apiGet = async queryString => {
  const response = await fetch(`${baseUrl}${queryString}`);
  const body = await response.json();

  return body;
};

export const searchForShows = query => apiGet(`/search/shows?q=${query}`);

export const searchForPeople = query => apiGet(`/search/people?q=${query}`);

export const getShowById = showId => apiGet(`/shows/${showId}?embed[]=seasons&embed[]=cast`);
