import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home.js';
import User from './components/User.js';
import SignIn from './components/SignIn.js';
import SecureRoute from './components/SecureRoute.js';

function App() {
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
