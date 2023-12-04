import React, { useReducer, useEffect } from "react";
import ShowCard from "./ShowCard";

const usePersistedReducer = (reducer, initialState, localStorageKey) => {
  const [state, dispath] = useReducer(reducer, initialState, (initial) => {
    const persistedValue = localStorage.getItem(localStorageKey);

    return persistedValue ? JSON.parse(persistedValue) : initial;
  });

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(state));
  }, [state, localStorageKey]);

  return [state, dispath];
};

const starredShowsReducer = (currentStarred, action) => {
  switch (action.type) {
    case "STAR":
      return currentStarred.concat(action.showId);
    case "UNSTAR":
      return currentStarred.filter((showId) => showId !== action.showId);
    default:
      return currentStarred;
  }
};

const ShowGrid = ({ shows }) => {
  const [starredShows, dispatchStarred] = usePersistedReducer(
    starredShowsReducer,
    [],
    "starredShows"
  );

  const onStarMeClick = (showId) => {
    const isStarred = starredShows.includes(showId);

    if (isStarred) {
      dispatchStarred({ type: "UNSTAR", showId });
    } else {
      dispatchStarred({ type: "STAR", showId });
    }
  };

  return (
    <div>
      {shows.map((data) => {
        return (
          <ShowCard
            key={data.show.id}
            name={data.show.name}
            image={
              data.show.image ? data.show.image.medium : "/imageNotFound.png"
            }
            id={data.show.id}
            summary={data.show.summary}
            onStarMeClick={onStarMeClick}
          />
        );
      })}
    </div>
  );
};

export default ShowGrid;
