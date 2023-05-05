import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { myContext } from './Context';

import ProtectedRoutes from './ProtectedRoutes';
import LoginPage from './Containers/LoginPage/LoginPage';
import ResultsPage from './Containers/ResultsPage/ResultsPage';
import ErrorPage from './Containers/ErrorPage/ErrorPage';

function App() {
    const userObject = useContext(myContext);
    var isAuth = true
    if(userObject == null)
      isAuth = false
    console.log(userObject);
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage/>}></Route>
                <Route element={<ProtectedRoutes auth={isAuth}/>}>
                  <Route path="/results" element={<ResultsPage/>}></Route>
                </Route>
                <Route path="/error" element={<ErrorPage/>}></Route>
            </Routes>
        </Router>
    );
}

export default App;
