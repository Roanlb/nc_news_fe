import React, { Component } from 'react';
import * as api from '../utils/axiosRequests';
import ArticleCard from '../components/ArticleCard';
import ErrorPage from './ErrorPage';
import ArticleSelector from './ArticleSelector';

class ArticleList extends Component {
  state = { articles: [], isLoading: true, err: '' };

  handleChange(topic, value) {
    api
      .getSortedArticles(topic, value)
      .then(articles => {
        this.setState({ articles: articles, isLoading: false });
      })
      .catch(
        ({
          response: {
            data: { msg }
          }
        }) => {
          this.setState({ err: msg, isLoading: false });
        }
      );
  }

  componentDidMount() {
    this.handleChange(this.props.topic);
  }

  componentDidUpdate(prevProps) {
    if (this.props.topic !== prevProps.topic) {
      this.handleChange(this.props.topic);
    }
  }

  handleSelectChange = ({ target: { value } }) => {
    this.handleChange(this.props.topic, value);
  };

  render() {
    return (
      <div>
        {!this.state.err && (
          <h1 className="ArticleListTitle">
            {this.props.topic ? '/' + this.props.topic : 'All Articles'}
          </h1>
        )}
        <ArticleSelector handleSelectChange={this.handleSelectChange} />

        <ul className="ArticleList">
          {this.state.isLoading && !this.state.err && <h4>Loading...</h4>}
          {this.state.articles.map(article => {
            return (
              <ArticleCard
                key={article.article_id}
                title={article.title}
                votes={article.votes}
                topic={article.topic}
                id={article.article_id}
                mainFeed={this.props.mainFeed}
                comment_count={article.comment_count}
              />
            );
          })}
        </ul>

        {this.state.err && <ErrorPage err={this.state.err} />}
      </div>
    );
  }
}

export default ArticleList;
