import React from 'react';
import { Link } from '@reach/router';
import Voter from './Voter';

const ArticleCard = ({ title, id, topic, mainFeed, votes }) => {
  return (
    <li className="ArticleCard">
      <Link to={`/${topic}/${id}`} article_id={id} className="ArticleTitle">
        <h4>{title}</h4>
      </Link>

      <aside className="ArticleSeeAllVoter">
        <Voter votes={votes} type="articles" id={id} />

        {mainFeed && (
          <Link to={`/${topic}`}>
            <h6>See all {topic} stories</h6>
          </Link>
        )}
      </aside>
      {/* <p>{body}</p> */}
    </li>
  );
};

export default ArticleCard;
