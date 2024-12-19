import React from 'react';
import { Link } from 'react-router-dom';
import argentBankLogo from '../assets/img/argentBankLogo.png';
import { logout } from '../features/loginSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchUser } from '../features/userSlice';
import { updateUser, updateUsername } from '../features/userSlice';


const User = () => {

  const dispatch = useDispatch();

  const deconnexionEffective = () => {
    dispatch(logout());
    localStorage.removeItem("userToken");
  };

  // Récupératio données User 

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const {username, firstName, lastName} = useSelector((state) => state.user);

  // Gestion du form pour le changement du pseudo

  const [editUsername, setNewEdit] = useState(false);
  const [newUsername, setNewUsername] = useState("");

  const envoieUpdateUsername = async (event) => {
    event.preventDefault();
    
    try {
      await dispatch(updateUser(newUsername));
      dispatch(updateUsername(newUsername));
      setNewEdit(false);

    } catch (error) {
      console.error('Erreur lors de la mise à jour du nom d\'utilisateur:', error);
    }
  }

    return (
      <div className="main bg-dark">
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
            <Link className="main-nav-item" to="/user">
              <i className="fa fa-user-circle"></i>
              {username}
            </Link>
            <Link className="main-nav-item" to="/" onClick={deconnexionEffective}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </Link>
          </div>
        </nav>
  
        <div className="header">
          <h1 className={editUsername ? 'edit-header' : ''}>
            {editUsername ? 'Edit user info' : `Welcome back, ${username}!`}
          </h1>

          {/* Gestion du form */}

          {!editUsername? (
          <button className="edit-button" onClick={() => setNewEdit(true)}>Edit Name</button>
          ) : (
            <form onSubmit={envoieUpdateUsername}>
              <section className='user-info'>
                <div className='user-info-labels'>

                  <div className='form'>
                  <label htmlFor="username">Username:</label>
                  </div>
                  <div className='form'>
                  <label htmlFor="firstName">First Name:</label>
                  </div>
                  <div className='form'>
                  <label htmlFor="lastName">Last Name:</label>
                  </div>

                </div>

                <div className='user-info-valeurs'>

                  <div className='form'>
                    <input type='text' id='username' value={newUsername} onChange={(event) => setNewUsername(event.target.value)}
                required/>
                  </div>
                  <div className='form'>
                    <input type='text' id='firstname' value={firstName} disabled/>
                  </div>
                  <div className='form'>
                    <input type='text' id='lastname' value={lastName} disabled/>
                  </div>
                </div>
              </section>

               <div className='boutons-form'>
                <button type='submit'>
                  Save
                </button>
                <button type='button' onClick={() => setNewEdit(false)}>
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
  
        <h2 className="sr-only">Accounts</h2>
  
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
  
        <footer className="footer">
          <p className="footer-text">Copyright 2020 Argent Bank</p>
        </footer>
      </div>
    );
  };
  
  export default User;
  
