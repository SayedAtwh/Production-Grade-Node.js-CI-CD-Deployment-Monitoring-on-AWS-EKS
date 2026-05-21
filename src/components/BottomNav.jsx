import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Briefcase, Bookmark, Settings } from 'lucide-react';
import './BottomNav.css';

const BottomNav = () => {
  return (
    <div className="bottom-nav">
      <NavLink
        to="/"
        className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
      >
        <Home size={24} />
        <span>الرئيسية</span>
      </NavLink>
      <NavLink
        to="/companies"
        className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
      >
        <Briefcase size={24} />
        <span>الشركات</span>
      </NavLink>
      <NavLink
        to="/saved-jobs"
        className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
      >
        <Bookmark size={24} />
        <span>المحفوظة</span>
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
      >
        <Settings size={24} />
        <span>حسابي</span>
      </NavLink>
    </div>
  );
};

export default BottomNav;
