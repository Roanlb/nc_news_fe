import React from 'react';
import { Link } from '@reach/router';

const Header = ({ user }) => {
  return (
    <div className="Header">
      <Link to={'/'}>
        <h3>NC News </h3>
      </Link>
      <h4>
        {user ? `Welcome ${user}, you are logged in` : 'You are not logged in'}
      </h4>
    </div>
  );
};

export default Header;
