import React, { Component } from 'react';
import * as api from '../utils/axiosRequests';
import ArticleCard from '../components/ArticleCard';

class ArticleList extends Component {
  state = { specifiedTopic: '', articles: [] };

  componentDidMount() {
    api.getAllArticles().then(articles => {
      this.setState({ articles: articles });
      console.log(this.state);
    });
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.articles.map(article => {
            return (
              <ArticleCard
                key={article.article_id}
                title={article.title}
                body={article.body}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ArticleList;
