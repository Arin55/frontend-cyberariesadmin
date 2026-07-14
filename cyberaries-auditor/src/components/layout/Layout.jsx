import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import './Layout.css';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {sidebarOpen && (
        <div 
          className="sidebar-mobile-backdrop" 
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      <div className="app-main">
        <TopNavbar onToggleSidebar={() => setSidebarOpen(true)} />
        <main className="page-container">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
