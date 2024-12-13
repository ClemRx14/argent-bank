import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import argentBankLogo from '../assets/img/argentBankLogo.png';
import { loginUser } from '../features/loginSlice.js';

function SignIn() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

// Recupération de l'état redux pour vérifier si l'user est connecté ou non 
  const { redirectionUser, error } = useSelector((state) => state.login || {});

  useEffect(() =>{
    if (redirectionUser) {
      navigate('/user');
    }
  }, [redirectionUser, navigate]);

  // Initialement nommé envoie mais event respecte les normes
  const envoieForm = (event) => {
    event.preventDefault();
    dispatch(loginUser({ email: username, password }))
    .then(() => {
      if(rememberMe) {
        localStorage.setItem("userEmail", username);
      }
      else {
        localStorage.removeItem("userEmail");
      }
    });
  };

// Préremplissage de l'émail si remember me est activé.

  useEffect(() => {
    const emailSaved = localStorage.getItem('userEmail');
    if (emailSaved) {
      setUsername(emailSaved);
      setRememberMe(true);
    }
  }, []);

  return (
    <div>
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src={argentBankLogo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        </div>
      </nav>

      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>

          {/* Si des erreurs dans le form d'envoie */}
          {error && (
            <div className='error-message'>
              {error}
            </div>
          )}

          <form onSubmit={envoieForm}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                // envoie = event
                onChange={(envoie) => setUsername(envoie.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(envoie) => setPassword(envoie.target.value)}
              />
            </div>
            <div className="input-remember">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button type="submit" className="sign-in-button">Sign In</button>
          </form>
        </section>
      </main>

      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </div>
  );
}

export default SignIn;
