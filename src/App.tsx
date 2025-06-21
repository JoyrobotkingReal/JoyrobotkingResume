import './App.css'
import { HashRouter, Route, Link, Routes } from 'react-router-dom';
import Home from './components/Home';
import APIProject from './components/APIProject';
import { AppBar, Toolbar, Typography, Box, Button, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useState, useEffect } from 'react';

function App() {
  const [isTransparent, setIsTransparent] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsTransparent(true);
      } else {
        setIsTransparent(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMouseEnter = () => {
    setIsTransparent(false);
  };

  return (
    <HashRouter>
      <div className="App" style={{ paddingTop: '64px' }}>
        <AppBar 
          position="fixed" 
          color="primary" 
          sx={{ 
            mb: 4, 
            boxShadow: 3, 
            backgroundColor: isTransparent ? 'rgba(63, 81, 181, 0.8)' : 'rgba(63, 81, 181, 1)',
            transition: 'background-color 0.3s ease'
          }}
          onMouseEnter={handleMouseEnter}
        >
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
                sx={{ 
                  textTransform: 'none', 
                  fontSize: '1rem', 
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.6)',
                  }
                }}
              >
                Home
              </Button>
              <Button 
                color="inherit" 
                component={Link} 
                to="/api-project" 
                sx={{ 
                  textTransform: 'none', 
                  fontSize: '1rem', 
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.6)',
                  }
                }}
              >
                API Project
              </Button>
              <IconButton
                color="inherit"
                component="a"
                href="https://github.com/JoyrobotkingReal"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                sx={{ ml: 1 }}
              >
                <GitHubIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/api-project" element={<APIProject />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App
