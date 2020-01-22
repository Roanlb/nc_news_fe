import React from 'react';
import { Link } from '@reach/router';

const ArticleCard = ({ title, body, id, topic, mainFeed }) => {
  return (
    <li>
      <Link to={`/${topic}/${id}`} article_id={id}>
        <h4>{title}</h4>
      </Link>

      {mainFeed && (
        <Link to={`/${topic}`}>
          <h6>See all {topic} stories</h6>
        </Link>
      )}

      {/* <p>{body}</p> */}
    </li>
  );
};

export default ArticleCard;
