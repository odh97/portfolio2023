import React from 'react';
import "./App.scss";
// Route
import {Routes, Route, BrowserRouter} from 'react-router-dom';
// components import
import PortfolioCP  from './components/PortfolioCP';

function App() {
return(
  <div className="App">
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path='/' element={<PortfolioCP />} />
        <Route path='*' element={<><h1>404</h1><div>없는페이지에요~</div></>}/>
      </Routes>
    </BrowserRouter>
  </div>
);
};


export default App;