import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-slate-700 text-white py-3 px-6 shadow-md">
      {/* Logo */}
      <div className="logo">
        <span className="font-bold text-2xl">i-Task - Add all your todos at one place</span>
      </div>

      {/* Navigation Links */}
      <ul className="flex gap-8">
        <li className="cursor-pointer hover:font-bold transition-all">Home</li>
        <li className="cursor-pointer hover:font-bold transition-all">Your Tasks</li>
      </ul>
    </nav>
  );
};

export default Navbar;
