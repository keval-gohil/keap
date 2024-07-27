"use client"
import React, { useState } from 'react';
import '@/components/styles/style.css';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div 
      className="click-dropdown" 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
    >
      <button className={`dropdown-toggle ${isOpen ? 'open-drop-menu' : ''}`}>
        <span>Categories</span>
        <i className="iconamoon--arrow-down-2"></i>
      </button>

      <ul className={`drop-menu ${isOpen ? 'open-drop-menu' : ''}`}>
        <li className="menu-item"><a href="#">Poor Peter Parker</a></li>
        <li className="menu-item"><a href="#">Friendly Neighborhood Spiderman</a></li>
        <li className="menu-item"><a href="#">Mexican</a></li>
      </ul>
    </div>
  );
};

export default Dropdown;
