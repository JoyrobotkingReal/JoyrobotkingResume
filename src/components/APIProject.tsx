import React, { useState, useMemo } from 'react';
import { Box, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel, Card, CardContent, CardMedia, Link as MuiLink } from '@mui/material';
import { RAWGClient, type Game } from '../RAWG';

function APIProject() {
    const client = new RAWGClient("a14b240a14354297b43f4258c84ac284");
    const [rawGames, setRawGames] = useState<Game[]>([]);
    const [input, setInput] = useState('');
    const [filter, setFilter] = useState('latest');
    const [excludeZeroRating, setExcludeZeroRating] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    const filteredGames = useMemo(() => {
        let games = [...rawGames];
        if (excludeZeroRating) {
            games = games.filter(game => game.rating > 0);
        }
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
    }, [rawGames, filter, excludeZeroRating]);

    const handleSearch = () => {
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

    const handleFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setFilter(event.target.value as string);
    };

    return (
        <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4, p: 2 }}>
            <Typography variant="h3" align="center" gutterBottom>Video Game Search API</Typography>
            <Typography align="center" sx={{ mb: 2 }}>
                This is a simple tool that uses a free Video Game Database API to allow you to search video games, intended to showcase my ability to use APIs for useful purposes!
            </Typography>
            <MuiLink href="https://rawg.io/" target="_blank" rel="noopener noreferrer" underline="hover" sx={{ display: 'block', textAlign: 'center', mb: 3 }}>
                RAWG.io is the API source of the data and images you see on this page!
            </MuiLink>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, flexWrap: 'wrap', mb: 3 }}>
                <TextField
                    label="Search for games..."
                    variant="outlined"
                    value={input}
                    onChange={handleInputChange}
                    sx={{ minWidth: 250 }}
                />
                <Button variant="contained" onClick={handleSearch} disabled={!input} sx={{ height: 56 }}>
                    Search
                </Button>
                <FormControl sx={{ minWidth: 180 }}>
                    <InputLabel id="filter-label">Sort By</InputLabel>
                    <Select
                        labelId="filter-label"
                        value={filter}
                        label="Sort By"
                        onChange={handleFilterChange}
                    >
                        <MenuItem value="latest">Latest Released</MenuItem>
                        <MenuItem value="oldest">Oldest Released</MenuItem>
                        <MenuItem value="highest_rating">Highest Rating</MenuItem>
                        <MenuItem value="lowest_rating">Lowest Rating</MenuItem>
                    </Select>
                </FormControl>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={excludeZeroRating}
                            onChange={(e) => setExcludeZeroRating(e.target.checked)}
                        />
                    }
                    label="Exclude Ratings of 0"
                />
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
                {filteredGames.length === 0 ? (
                    <Typography align="center" sx={{ gridColumn: '1/-1' }}>No Results</Typography>
                ) : (
                    filteredGames.map((game: Game) => (
                        <Card key={game.id} sx={{ maxWidth: 345, mx: 'auto' }}>
                            {game.background_image && (
                                <CardMedia
                                    component="img"
                                    height="180"
                                    image={game.background_image}
                                    alt={game.name}
                                />
                            )}
                            <CardContent>
                                <Typography variant="h6">{game.name}</Typography>
                                <Typography variant="body2">Rating: {game.rating}</Typography>
                            </CardContent>
                        </Card>
                    ))
                )}
            </Box>
        </Box>
    );
}

export default APIProject;
