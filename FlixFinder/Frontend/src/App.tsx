import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './Containers/LoginPage/LoginPage';
import ResultsPage from './Containers/ResultsPage/ResultsPage';
import ErrorPage from './Containers/ErrorPage/ErrorPage';

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
