import React from 'react';
import ActorsCard from './ActorsCard';
import { FlexGrid } from '../common/FlexGrid';

const ActorsGrid = ({ actors }) => {
  return (
    <FlexGrid>
      {actors.map(data => {
        return (
          <ActorsCard
            key={data.person.id}
            name={data.person.name}
            country={data.person.country ? data.person.country.name : null}
            birthday={data.person.birthday}
            deathday={data.person.deathday}
            gender={data.person.gender}
            image={
              data.person.image
                ? data.person.image.medium
                : '/imageNotFound.png'
            }
          />
        );
      })}
    </FlexGrid>
  );
};

export default ActorsGrid;