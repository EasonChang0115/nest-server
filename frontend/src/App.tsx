import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.tsx';
import Header from './components/Layouts/Header.tsx';
import AppRoutes from './route.tsx';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
