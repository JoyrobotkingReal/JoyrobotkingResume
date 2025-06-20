import React from 'react';
import { RAWGClient } from '../RAWG';

function APIProject() {
    const client = new RAWGClient("a14b240a14354297b43f4258c84ac284");

    // TODO: Implement the API project functionality
  client.searchGames("The Witcher 3: Wild Hunt")
      .then(response => {
          console.log(response.results);
      })
      .catch(error => {
          console.error(error);
      });
  return (
    <div>
      <h1>API Project Page</h1>
      <p>This is the API project page.</p>
    </div>
  );
}

export default APIProject;
