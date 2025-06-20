import './App.css'
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import Home from './components/Home';
import APIProject from './components/APIProject';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AppBar position="static" color="primary" sx={{ mb: 4, boxShadow: 3 }}>
          <Toolbar>
            <Typography 
              variant="h6" 
              sx={{ flexGrow: 1, fontWeight: 'bold', letterSpacing: 1 }}
            >
              Joyrobotking.com
            </Typography>
            <Box 
              component="nav" 
              sx={{ display: 'flex', gap: 2 }}
            >
              <Button 
          color="inherit" 
          component={Link} 
          to="/" 
          sx={{ textTransform: 'none', fontSize: '1rem' }}
              >
          Home
              </Button>
              <Button 
          color="inherit" 
          component={Link} 
          to="/api-project" 
          sx={{ textTransform: 'none', fontSize: '1rem' }}
              >
          API Project
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/api-project" element={<APIProject />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
