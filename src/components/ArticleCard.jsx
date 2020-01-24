import React from 'react';
import { Link } from '@reach/router';
import Voter from './Voter';

const ArticleCard = ({ title, id, topic, mainFeed, votes, comment_count }) => {
  return (
    <li className="ArticleCard">
      <Link to={`/${topic}/${id}`} article_id={id} className="ArticleTitle">
        <h4>{title}</h4>
      </Link>

      <aside className="ArticleVoter">
        <Voter votes={votes} type="articles" id={id} />
      </aside>

      {mainFeed ? (
        <Link className="ArticleSeeAll" to={`/${topic}`}>
          <h6>See all {topic} stories</h6>
        </Link>
      ) : (
        <h6>Comment count: {comment_count}</h6>
      )}
    </li>
  );
};

export default ArticleCard;
