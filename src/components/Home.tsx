import React from 'react';
import { Box, Typography, Avatar, Paper, Link as MuiLink, Card, CardContent, CardMedia } from '@mui/material';
import TitleTypewriter from './TitleTypewritter';

function Home() {
  return (
    <Box className="home" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3, backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4, width: '100%', maxWidth: 900, borderRadius: 2 }}>
      <Box className="header-container" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <Avatar src="/src/assets/Profile.webp" alt="Profile" sx={{ width: 150, height: 150, mb: 2, boxShadow: 3 }} />
        <header>
        <Typography variant="h2" sx={{ color: 'cornflowerblue', mb: 1, fontWeight: 'bold' }}>
          Joyrobotking <Box component="span" sx={{ fontSize: '0.7em', color: 'lime', fontWeight: 'normal' }}>(J.F)</Box>
        </Typography>
        <Typography variant="h5" sx={{ color: 'text.secondary', mb: 2, fontStyle: 'italic' }}><TitleTypewriter></TitleTypewriter></Typography>
        </header>
        <section className="about" style={{ maxWidth: 800 }}>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold', color: 'darkslategray' }}>About Me</Typography>
        <Typography paragraph sx={{ lineHeight: 1.6 }}>
          Passionate game developer and web developer with a love for creating engaging and innovative experiences.
        </Typography>
        <Typography paragraph sx={{ lineHeight: 1.6 }}>
          I figured I'd make this website to act as a kind of resume, showcasing my skills and projects.
        </Typography>
        <Typography paragraph sx={{ lineHeight: 1.6 }}>
          Explore my projects below, or navigate through the site using the menu above to discover more examples of my web development expertise.
        </Typography>
        <Typography paragraph sx={{ lineHeight: 1.6 }}>
          I made this website somewhat quickly to show on my resume, so it may not be the most polished, but I will be updating it with more projects and features soon.
        </Typography>
        </section>
      </Box>
      </Paper>
      <Box className="projects" sx={{ width: '100%', maxWidth: 900, textAlign: 'center', mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: 'darkslategray' }}>Projects</Typography>
      <Box className="project-list" sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
        <Card className="project" sx={{ width: 320, m: 2, borderRadius: 2, boxShadow: 3 }}>
        <CardMedia
          component="img"
          height="180"
          image="/src/assets/V3Banner.webp"
          alt="Project"
          sx={{ borderRadius: '4px 4px 0 0' }}
        />
        <CardContent>
          <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
          War of The Worlds: Multiplayer Survival! [V3]
          </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary', lineHeight: 1.6 }}>
            A Roblox game I made a few years ago with over <Box component="span" sx={{ fontWeight: 'bold', color: 'lime' }}>2.4 million</Box> unique visits, based on the 2005 War of The Worlds movie starring Tom Cruise.
            </Typography>
          <MuiLink href="https://www.roblox.com/games/12978643688/" target="_blank" rel="noopener noreferrer" underline="hover" sx={{ color: 'cornflowerblue', fontWeight: 'bold', width: '100%', display: 'inline-block', textAlign: 'center' }}>
          View Project
          </MuiLink>
        </CardContent>
        </Card>
      </Box>
      </Box>
    </Box>
  );
}

export default Home;
