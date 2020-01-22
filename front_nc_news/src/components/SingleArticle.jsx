import React, { Component } from 'react';
import { Link } from '@reach/router';
import * as api from '../utils/axiosRequests';
import Voter from './Voter';
import CommentList from './CommentList';

class SingleArticle extends Component {
  state = {
    article: {},
    comments: [],
    commentToPost: ''
  };

  handleChange = event => {
    this.setState({ commentToPost: event.target.value });
  };

  handlePostComment = event => {
    event.preventDefault();
    let commentToPost = this.state.commentToPost;
    let user = this.props.user;
    let article_id = this.props.article_id;
    api
      .postComment(commentToPost, user, article_id)
      .then(({ data: { comment } }) => {
        this.setState(currentState => {
          return {
            comments: [comment, ...currentState.comments],
            commentToPost: ''
          };
        });
      });
  };

  handleDelete = event => {
    let comment_id = event.target.parentElement.id;
    api.deleteComment(comment_id).then(() => {
      api.getArticleComments(this.props.article_id).then(comments => {
        this.setState({ comments: comments });
      });
    });
  };

  componentDidMount() {
    Promise.all([
      api.getSingleArticle(this.props.article_id),
      api.getArticleComments(this.props.article_id)
    ]).then(resolutions => {
      this.setState({
        article: resolutions[0],
        comments: resolutions[1]
      });
    });
  }

  render() {
    return (
      <div id={this.props.article_id}>
        <h2>{this.state.article.title}</h2>
        <Voter
          votes={this.state.article.votes}
          type="articles"
          id={this.props.article_id}
        />
        <Link to={`/${this.state.article.topic}`}>
          <h6>See all {this.state.article.topic} stories</h6>
        </Link>
        <p>{this.state.article.body}</p>
        <h4>Comments</h4>
        <form onSubmit={this.handlePostComment}>
          <h3>Post a comment: </h3>
          <textarea
            name="commentPost"
            id="commentPost"
            cols="60"
            rows="10"
            onChange={this.handleChange}
            value={this.state.commentToPost}
          ></textarea>
          <input type="submit" />
        </form>
        {this.state.comments && (
          <CommentList
            comments={this.state.comments}
            handleDelete={this.handleDelete}
            user={this.user}
          />
        )}
      </div>
    );
  }
}

export default SingleArticle;
