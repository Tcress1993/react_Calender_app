import './app.css';
import Header from './components/header';
import Calendar from './components/calendar';
import Authentication from './components/authentication';
import {HashRouter, Routes,  Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <HashRouter> {/* The Router component */}
        <Header />
        <Routes>
          <Route path="/" element={<Calendar />} />
          <Route path="/signin" element={<Authentication />}/>
          {/*... other routes */}
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
