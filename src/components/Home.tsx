import React from 'react';

function Home() {
  return (
    <div className="home">
      <div className="header-container">
        <img src="/src/assets/Profile.webp" alt="Profile" className="profile-image" />
        <header>
          <h1 style={{ color: 'cornflowerblue' }}>Joyrobotking <span style={{ fontSize: '0.7em', color: 'lime' }}>(J.F)</span></h1>
          <p>Game Developer & Web Developer</p>
        </header>
        <section className="about">
          <h2>About Me</h2>
          <p>
            Passionate game developer and web developer with a love for creating engaging and innovative experiences.
          </p>
          <p>
            I figured I'd make this website to act as a kind of resume, showcasing my skills and projects.
          </p>
          <p>
            Explore my projects below, or navigate through the site using the menu above to discover more examples of my web development expertise.
          </p>
          <p>
            I made this website somewhat quickly to show on my resume, so it may not be the most polished, but I will be updating it with more projects and features soon.
          </p>
        </section>
      </div>
      <section className="projects">
        <h2>Projects</h2>
        <div className="project-list">
          <div className="project">
            <img src="/src/assets/V3Banner.webp" alt="Project" className="project-image" />
            <h3>War of The Worlds: Multiplayer Survival! [V3]</h3>
            <p>A Roblox game I made a few years ago with over 2.4 million unique visits, based on the 2005 War of The Worlds movie starring Tom Cruise.</p>
            <a href="https://www.roblox.com/games/12978643688/" target="_blank" rel="noopener noreferrer" className="project-link">View Project</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
