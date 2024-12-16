import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Modification de {route} en {children} car React ne comprennait pas automatiquement qu'il faut encapsuler les enfants
//pour sécuriser la route du profil.
const SecureRoute = ({children}) => {

    const userLog = useSelector((state) => state.login.userLog);

    if (!userLog) {
        return <Navigate to="/sign-in" />;
    }
    return children;
};

export default SecureRoute;