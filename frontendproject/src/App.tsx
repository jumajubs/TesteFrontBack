import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Users from './pages/Users';
import EditUser from './pages/EditUser';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<Users />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
        <Route path="/" element={<Login />} /> {/* Rota padrão redireciona para o login */}
      </Routes>
    </Router>
  );
};

export default App;