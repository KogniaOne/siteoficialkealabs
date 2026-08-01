import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './styles/global.css';
import Login from './components/Login';
import ClientHeader from './components/ClientHeader';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Builder from './pages/Builder';

interface UserData {
  email: string;
}

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem('access_token')
  );
  const [user, setUser] = useState<UserData | null>(null);

  const handleLogin = (userData: UserData): void => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = (): void => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('access_token');
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <BrowserRouter>
      <div className="App flex h-screen bg-gray-50">
        <Sidebar onLogout={handleLogout} />
        <div className="flex-1 flex flex-col md:ml-64">
          <ClientHeader onLogout={handleLogout} user={user || undefined} />
          <main className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/builder" element={<Builder />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
