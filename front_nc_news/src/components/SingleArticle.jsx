import React, { Component } from 'react';
import { Link } from '@reach/router';
import * as api from '../utils/axiosRequests';
import Voter from './Voter';

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
          return { comments: [comment, ...currentState.comments] };
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
        <Voter votes={this.state.article.votes} type="articles" />
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
            cols="30"
            rows="10"
            onChange={this.handleChange}
          ></textarea>
          <input type="submit" />
        </form>
        <ul>
          {this.state.comments.map(comment => {
            return (
              <li key={comment.comment_id} id={comment.comment_id}>
                <h5>{comment.author}</h5>
                <p>{comment.body}</p>
                <h5>Votes: {comment.votes}</h5>
                <h6>Created at: {comment.created_at}</h6>
                {this.props.user === comment.author && (
                  <button onClick={this.handleDelete}>Delete</button>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default SingleArticle;
