import React, { Component } from 'react';
import * as api from '../utils/axiosRequests';
import ArticleCard from '../components/ArticleCard';
import ErrorPage from './ErrorPage';

class ArticleList extends Component {
  state = { articles: [], isLoading: true, err: '' };

  componentDidMount() {
    api
      .getSortedArticles(this.props.topic)
      .then(articles => {
        this.setState({ articles: articles, isLoading: false });
      })
      .catch(({ response }) => {
        console.log(response);
        this.setState({ err: response.data.msg, isLoading: false });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.topic !== prevProps.topic) {
      api
        .getSortedArticles(this.props.topic)
        .then(articles => {
          this.setState({
            articles: articles
          });
        })
        .catch(({ response }) => {
          this.setState({ err: response.data.msg, isLoading: false });
        });
    }
  }

  handleSelectChange = ({ target: { value } }) => {
    console.log(value, 'value');
    console.log(this.props.topic, 'this proprs topic');
    api.getSortedArticles(this.props.topic, value).then(articles => {
      this.setState({ articles: articles }).catch(({ response }) => {
        this.setState({ err: response.data.msg, isLoading: false });
      });
    });
  };

  render() {
    return (
      <div>
        <aside>
          <h4>Sort by:</h4>
          <select
            name="articleSelector"
            id="articleSelector"
            onChange={this.handleSelectChange}
          >
            <option value="created_at">Date created</option>
            <option value="comment_count">Comment count</option>
            <option value="votes">Votes</option>
          </select>
        </aside>

        <ul className="ArticleList">
          {this.state.isLoading && !this.state.err && <h4>Loading...</h4>}
          {this.state.articles.map(article => {
            console.log(article.votes);
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
