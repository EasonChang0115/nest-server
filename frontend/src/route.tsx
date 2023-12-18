import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home.tsx';
import About from './pages/About.tsx';

const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/about',
    element: <About />,
  },
];

function AppRoutes() {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}

export default AppRoutes;
