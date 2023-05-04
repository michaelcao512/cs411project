import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { myContext } from './Context'

import LoginPage from './Containers/LoginPage/LoginPage';
import ResultsPage from './Containers/ResultsPage/ResultsPage';
import ErrorPage from './Containers/ErrorPage/ErrorPage';

function App() {
    const userObject = useContext(myContext);
    console.log(userObject);
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
