import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/admin/Header';
import { Sidebar } from './components/admin/Sidebar';
import StudentsPage from './pages/StudentsPage';
import Chapter from './pages/chapter';
import DashBoard from './pages/Dashboard';
import Help from './pages/help-page';
import ReportsPage from './pages/reports';
import SettingsPage from './pages/settings';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="flex h-screen overflow-hidden bg-gray-100">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden relative z-10">
          <Header toggleSidebar={toggleSidebar} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto">
            <Routes>
              <Route path="/" element={<StudentsPage />} />
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/chapter" element={<Chapter/>} />
              <Route path="/students" element={<StudentsPage />} />
              <Route path="/help" element={<Help/>} />
              <Route path="/reports" element={<ReportsPage/>} />
              <Route path="/settings" element={<SettingsPage/>} />
              {/* Add more routes here as needed */}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;

