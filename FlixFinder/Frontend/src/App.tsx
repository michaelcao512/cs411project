import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { myContext } from './Context';

import LoginPage from './Containers/LoginPage/LoginPage';
import ResultsPage from './Containers/ResultsPage/ResultsPage';
import ErrorPage from './Containers/ErrorPage/ErrorPage';

function App() {
    const context = useContext(myContext);
    return (
        <Router>
            <Routes>
                {context ? (<Route path="/results" element={<ResultsPage />}></Route>) :(<Route path="/" element={<LoginPage />}></Route>)}
                <Route path="*" element={<ErrorPage />}></Route>
            </Routes>
        </Router>
    );
}

export default App;
