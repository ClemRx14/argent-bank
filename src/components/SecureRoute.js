import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SecureRoute = ({route}) => {

    const userLog = useSelector((state) => state.userLog);

    if (!userLog) {
        return <Navigate to="/sign-in" />;
    }
    return route;
};

export default SecureRoute;