import React, { useState, useMemo } from 'react';
import './APIProject.css';
import { RAWGClient, type Game } from '../RAWG';

function APIProject() {
    const client = new RAWGClient("a14b240a14354297b43f4258c84ac284");
    const [rawGames, setRawGames] = useState<Game[]>([]);
    const [input, setInput] = useState('');
    const [filter, setFilter] = useState('latest');
    const [excludeZeroRating, setExcludeZeroRating] = useState(false); const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    // Reactively filter games whenever rawGames, filter, or excludeZeroRating changes
    const filteredGames = useMemo(() => {
        let games = [...rawGames];

        // Apply zero rating filter first
        if (excludeZeroRating) {
            games = games.filter(game => game.rating > 0);
        }

        // Apply sorting filter
        if (filter === 'latest') {
            games.sort((a: Game, b: Game) => new Date(b.released).getTime() - new Date(a.released).getTime());
        } else if (filter === 'oldest') {
            games.sort((a: Game, b: Game) => new Date(a.released).getTime() - new Date(b.released).getTime());
        } else if (filter === 'highest_rating') {
            games.sort((a: Game, b: Game) => b.rating - a.rating);
        } else if (filter === 'lowest_rating') {
            games.sort((a: Game, b: Game) => a.rating - b.rating);
        }

        return games;
    }, [rawGames, filter, excludeZeroRating]); const handleSearch = () => {
        if (input) {
            client.searchGames(input)
                .then(response => {
                    setRawGames(response.results);
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            setRawGames([]);
        }
    };

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(event.target.value);
    };

    return (
        <div>
            <h1>Video Game Search API</h1>
            <p>This is a simple tool that uses a free Video Game Database API to allow you to search video games, intended to showcase my ability to use APIs for useful purposes!</p>
            <a href="https://rawg.io/" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', width: '100%' }}>
                RAWG.io is the API source of the data and images you see on this page!
            </a>
            <div className="search-container">
                <div className="input-button-container">
                    <input
                        type="text"
                        placeholder="Search for games..."
                        value={input}
                        onChange={handleInputChange}
                    />
                    <button onClick={handleSearch} disabled={!input}>
                        Search
                    </button>
                </div>
                <select value={filter} onChange={handleFilterChange}>
                    <option value="latest">Latest Released</option>
                    <option value="oldest">Oldest Released</option>
                    <option value="highest_rating">Highest Rating</option>
                    <option value="lowest_rating">Lowest Rating</option>
                </select>                <label className="exclude-zero-rating">
                    Exclude Ratings of 0:
                    <input
                        type="checkbox"
                        checked={excludeZeroRating}
                        onChange={(e) => setExcludeZeroRating(e.target.checked)}
                    />
                </label>
            </div>
            <div className="game-results">
                {filteredGames.length === 0 ? (
                    <p>No Results</p>
                ) : (
                    filteredGames.map((game: Game) => (
                        <div key={game.id} className="game-card">
                            <img src={game.background_image} alt={game.name} />
                            <h3>{game.name}</h3>
                            <p>Rating: {game.rating}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default APIProject;
