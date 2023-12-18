import React from 'react';
import { Route, Routes } from 'react-router-dom';
import WithPrivateRoute from './utils/WidthAuthRoute.tsx';

import Home from './pages/Home.tsx';
import Profile from './pages/Profile.tsx';
import Login from './pages/Login.tsx';

const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/profile',
    element: <Profile />,
    isAuth: true,
  },
];

function AppRoutes() {
  return (
    <Routes>
      {routes.map((route, index) => {
        if (route.isAuth) {
          return (
            <Route
              key={index}
              path={route.path}
              element={<WithPrivateRoute>{route.element}</WithPrivateRoute>}
            />
          );
        } else {
          return (
            <Route key={index} path={route.path} element={route.element} />
          );
        }
      })}
    </Routes>
  );
}

export default AppRoutes;
