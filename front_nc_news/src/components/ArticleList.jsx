import React, { Component } from 'react';
import * as api from '../utils/axiosRequests';
import ArticleCard from '../components/ArticleCard';

class ArticleList extends Component {
  state = { articles: [] };

  componentDidMount() {
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

  handleSelectChange = ({ target: { value } }) => {
    console.log(value, 'value');
    console.log(this.props.topic, 'this proprs topic');
    api.getSortedArticles(this.props.topic, value).then(articles => {
      this.setState({ articles: articles });
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
        <ul>
          {this.state.articles.map(article => {
            console.log(article.comment_count);
            console.log(article.created_at);
            return (
              <ArticleCard
                key={article.article_id}
                title={article.title}
                body={article.body}
                topic={article.topic}
                id={article.article_id}
                mainFeed={this.props.mainFeed}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ArticleList;
