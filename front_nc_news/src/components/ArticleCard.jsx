import React from 'react';

const ArticleCard = ({ title, body }) => {
  return (
    <li>
      <h4>{title}</h4>
      <p>{body}</p>
    </li>
  );
};

export default ArticleCard;
