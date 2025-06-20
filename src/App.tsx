import './App.css'
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import Home from './components/Home';
import APIProject from './components/APIProject';

function App() {
  // const [count, setCount] = useState(0)

  // const client = new RAWGClient("a14b240a14354297b43f4258c84ac284");

  // client.searchGames("The Witcher 3: Wild Hunt")
  //     .then(response => {
  //         console.log(response.results);
  //     })
  //     .catch(error => {
  //         console.error(error);
  //     });

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/api-project">API Project</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/api-project" element={<APIProject />} />
          </Routes>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App
