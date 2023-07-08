import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import LoginForm from './LoginForm';
import UserList from './UserList';

function App() {
  const [token, setToken] = useState(null);

  const handleLogin = (username, password) => {
    fetch('https://localhost:7018/security/createToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error de inicio de sesión');
        }
      })
      .then(data => {
        setToken(data.token);
      })
      .catch(error => {
        console.error('Error de inicio de sesión:', error);
      });
  };

  const handleLogout = () => {
    setToken(null);
  };

  return (
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route path="/" element={token ? <Navigate to="/user-list" /> : <LoginForm onLogin={handleLogin} />} />
          <Route path="/user-list" element={token ? <UserList token={token} onLogout={handleLogout} /> : <Navigate to="/" />} />
        </Route>
      </Routes>
  );
}

export default App;
