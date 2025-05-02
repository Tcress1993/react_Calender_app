import './app.css';
import Calendar from './components/calendar';
import Authentication from './components/authentication';

import {HashRouter, Routes,  Route, Navigate, Link} from 'react-router-dom';

import {useState, useEffect} from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //make sure the first thing the user sees is the log in screen and not the calendar
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout =() => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
  }
  
  return (
    <div className="App">
      <HashRouter>
        <nav className = "banner">
          <ul className = "nav-links">
            <li>
              <Link to='/signin' className = {!isAuthenticated ? 'active' : ''}>
                {isAuthenticated ? 'Logout' : 'Login'}
              </Link>
            </li>
            <li>
              <Link to={'/calendar'} className = {isAuthenticated ? '' : 'disabled'} onClick = {(e)=> {if (!isAuthenticated) e.preventDefault();}}>
                Calendar
              </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Calendar />} />
          <Route path="/signin" element={<Authentication />}/>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
