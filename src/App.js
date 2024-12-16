import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home.js';
import User from './components/User.js';
import SignIn from './components/SignIn.js';
import SecureRoute from './components/SecureRoute.js';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCookie } from './features/userSlice.js';
import { loggedUser } from './features/loginSlice.js';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const token = getCookie('userToken');

    if (token) {
      dispatch(loggedUser({ token }));  
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/user" element={
          <SecureRoute>
            <User />
          </SecureRoute>
        } />
      </Routes>
    </Router>

  );
}

export default App;
