import React from 'react';
import Sidebar from '../scenes/global/Sidebar';
import Topbar from '../scenes/global/Topbar';

const MainLayout = ({ children }) => {
  return (
    <div>
      <Sidebar />
      <div className="content">
        <Topbar />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;