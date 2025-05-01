import './app.css';
import Calendar from './components/calendar';
import Authentication from './components/authentication';

import {HashRouter, Routes,  Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <HashRouter> {/* The Router component */}
        <Calendar/>
        <Routes>
          <Route path="/" element={<Authentication/>} />
          <Route path="/signin" element={<Authentication />}/>
          <Route path="/register" element={<Authentication />}/>
          
          {/*... other routes */}
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
