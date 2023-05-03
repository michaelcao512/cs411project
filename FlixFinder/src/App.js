import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';


import LoginPage from './containers/LoginPage/LoginPage.tsx';
import ResultsPage from './containers/ResultsPage/ResultsPage.tsx';
import ErrorPage from './containers/ErrorPage/ErrorPage.tsx';

/*function App() {
  return (
    <div>
      <ErrorPage></ErrorPage>
    </div>
  );
}*/

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>}></Route>
        <Route path="/results" element={<ResultsPage/>}></Route>
        <Route path="/error" element={<ErrorPage/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
