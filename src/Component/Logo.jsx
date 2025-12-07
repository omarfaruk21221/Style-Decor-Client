import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <div className="flex items-center">
          <img
            className="w-15 h-15 flex items-center pag-4"
            src="../../public/assets/logo2.png"
            alt="logo"
          />
          <Link
            to="/"
            className="btn btn-ghost text-lg md:text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          >
            Style Decor
          </Link>
        </div>
    );
};

export default Logo;