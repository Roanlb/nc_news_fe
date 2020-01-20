import React, { Component } from 'react';
import * as api from '../utils/axiosRequests';
import ArticleCard from '../components/ArticleCard';

class ArticleList extends Component {
  state = { articles: [] };

  componentDidMount() {
    console.log(this.props.topic);
    api.getAllArticles(this.props.topic).then(articles => {
      this.setState({ articles: articles });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.topic !== prevProps.topic) {
      api.getAllArticles(this.props.topic).then(articles => {
        this.setState({
          articles: articles
        });
      });
    }
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
