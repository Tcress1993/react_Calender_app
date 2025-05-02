import './app.css';
import Calendar from './components/calendar';
import Authentication from './components/authentication';

import {HashRouter, Routes,  Route} from 'react-router-dom';
import {HashRouter, Routes, Route, Navigate} from 'react-router-dom';
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
  
  return (
    <div className="App">
      <HashRouter> {/* The Router component */}
        <Calendar/>
        <Routes>
          {/* only navigate to the calender route if the user is authenticated */}
          <Route path = '/' element = {isAuthenticated ? <Navigate to={"/calendar"} /> : <Authentication setIsAuthenticated={setIsAuthenticated} />} />
          <Route path = '/signin' element = {isAuthenticated ? <Navigate to={"/calendar"} /> : <Authentication setIsAuthenticated={setIsAuthenticated} />} />
          <Route path = '/register' element = {isAuthenticated ? <Navigate to={"/calendar"} /> : <Authentication setIsAuthenticated={setIsAuthenticated} />} />
          <Route path = '/calendar' element ={isAuthenticated ? <Calendar /> : <Navigate to={"/signin"} />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
