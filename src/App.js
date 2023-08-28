import React from 'react';
import "./App.scss";
// Route
import {Routes, Route} from 'react-router-dom';
// components import
import PortfolioCP  from './components/PortfolioCP';

function App() {
return(
  <div className="App">
    <Routes>
      <Route path='/' element={<PortfolioCP />} />
      <Route path='*' element={<><h1>404</h1><div>없는페이지에요~</div></>}/>
    </Routes>
  </div>
);
};


export default App;