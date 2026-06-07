import React from 'react';
import { Sun, Moon } from 'lucide-react';

function Navbar({ isDark, setIsDark }) {
  return (
    <header className="navbar">
      <div className="logo-container">
        <span className="logo-text">CleanURL</span>
      </div>
      <button 
        className="theme-toggle btn" 
        onClick={() => setIsDark(!isDark)}
        title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </header>
  );
}

export default Navbar;
