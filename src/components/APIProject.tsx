import React, { useState, useMemo } from 'react';
import { Box, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel, Card, CardContent, CardMedia, Link as MuiLink, Paper, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import { RAWGClient, type Game } from '../RAWG';
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from '@mui/icons-material/Close';
import type { SelectChangeEvent } from '@mui/material';

function APIProject() {
    const client = new RAWGClient("a14b240a14354297b43f4258c84ac284");
    const [rawGames, setRawGames] = useState<Game[]>([]);
    const [input, setInput] = useState('');
    const [filter, setFilter] = useState('latest');
    const [excludeZeroRating, setExcludeZeroRating] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedGame, setSelectedGame] = useState<Game | null>(null);

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
            setLoading(true);
            setError(null); // Clear previous errors
            client.searchGames(input, { simulateError: false }) // Added optional parameter for error simulation
                .then(response => {
                    setRawGames(response.results);
                })
                .catch(error => {
                    console.error(error);
                    setError("Error: Unable to access RAWG API");
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setRawGames([]);
        }
    };

    const handleFilterChange = (event: SelectChangeEvent) => {
        setFilter(event.target.value);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && input && !loading) {
            handleSearch();
        }
    };

    const handleCardClick = (game: Game) => {
        setSelectedGame(game);
    };

    const handleCloseModal = () => {
        setSelectedGame(null);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
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
                    onKeyPress={handleKeyPress}
                    sx={{ minWidth: 250 }}
                    disabled={loading}
                />
                <Button variant="contained" onClick={handleSearch} disabled={!input || loading} sx={{ height: 56 }}>
                    {loading ? <CircularProgress size={24} /> : 'Search'}
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
            <Paper 
                elevation={0}                sx={{ 
                    p: 3, 
                    border: '2px solid black',
                    borderRadius: 2,
                    bgcolor: '#e0e0e0'
                }}
            >
                {error ? (
                    <Paper elevation={3} sx={{ mb: 2, p: 2, bgcolor: 'error.light' }}>
                        <Typography align="center" sx={{ color: 'error.contrastText', fontWeight: 'bold' }}>
                            {"Error: Unable to access RAWG API. This may be due to an update to the RAWG API or an issue with the provided API key."}
                        </Typography>
                    </Paper>
                ) : filteredGames.length === 0 ? (
                    <Typography align="center" sx={{ gridColumn: '1/-1' }}>No Results</Typography>
                ) : (
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
                        {filteredGames.map((game: Game) => (
                            <Card 
                                key={game.id} 
                                sx={{ 
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    bgcolor: 'white',
                                    boxShadow: 2,
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: 4
                                    }
                                }}
                                onClick={() => handleCardClick(game)}
                            >
                                <Box sx={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
                                    {game.background_image && (
                                        <CardMedia
                                            component="img"
                                            image={game.background_image}
                                            alt={game.name}
                                            sx={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                    )}
                                </Box>
                                <CardContent sx={{ flexGrow: 1, bgcolor: 'white' }}>
                                    <Typography variant="h6" noWrap>{game.name}</Typography>
                                    <Typography variant="body2">Rating: {game.rating}</Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                )}
            </Paper>

            <Dialog
                open={selectedGame !== null}
                onClose={handleCloseModal}
                maxWidth="md"
                fullWidth
            >
                {selectedGame && (
                    <>
                        <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6" component="div" sx={{ pr: 4 }}>
                                {selectedGame.name}
                            </Typography>
                            <IconButton
                                aria-label="close"
                                onClick={handleCloseModal}
                                sx={{ position: 'absolute', right: 8, top: 8 }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent dividers>
                            {selectedGame.background_image && (
                                <Box sx={{ position: 'relative', width: '100%', paddingTop: '56.25%', mb: 2 }}>
                                    <CardMedia
                                        component="img"
                                        image={selectedGame.background_image}
                                        alt={selectedGame.name}
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            borderRadius: 1
                                        }}
                                    />
                                </Box>
                            )}
                            <Box sx={{ display: 'grid', gap: 2 }}>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                    Rating: {selectedGame.rating} / 5
                                </Typography>
                                {selectedGame.released && (
                                    <Typography variant="body1">
                                        Release Date: {formatDate(selectedGame.released)}
                                    </Typography>
                                )}
                                {selectedGame.platforms && (
                                    <Typography variant="body1">
                                        Platforms: {selectedGame.platforms.map(p => p.platform.name).join(', ')}
                                    </Typography>
                                )}
                                {selectedGame.genres && (
                                    <Typography variant="body1">
                                        Genres: {selectedGame.genres.map(g => g.name).join(', ')}
                                    </Typography>
                                )}
                            </Box>
                        </DialogContent>                        <DialogActions>
                            <Button onClick={handleCloseModal}>Close</Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </Box>
    );
}

export default APIProject;
