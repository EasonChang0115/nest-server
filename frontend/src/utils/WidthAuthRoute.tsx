import React, { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.tsx';

const WithPrivateRoute = ({ children }) => {
  const { isLogin } = useAuth();

  console.log(isLogin);

  if (isLogin) {
    return children;
  }

  return <Navigate to="/login" />;
};

export default WithPrivateRoute;
