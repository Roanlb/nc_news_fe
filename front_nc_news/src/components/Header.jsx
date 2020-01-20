import React from 'react';

const Header = ({ user }) => {
  return (
    <div>
      <h3>NC News </h3>
      <h4>
        {user ? `Welcome {user}, you are logged in` : 'You are not logged in'}
      </h4>
    </div>
  );
};

export default Header;
