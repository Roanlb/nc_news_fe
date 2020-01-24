import React, { Component } from 'react';
import { Link } from '@reach/router';
import * as api from '../utils/axiosRequests';
import Voter from './Voter';
import CommentList from './CommentList';
import ErrorPage from './ErrorPage';
import CommentSubmitForm from './CommentSubmitForm';

class SingleArticle extends Component {
  state = {
    article: {},
    comments: [],
    commentToPost: '',
    err: '',
    commentWarning: ''
  };

  handleChange = ({
    event: {
      target: { value }
    }
  }) => {
    this.setState({ commentToPost: value });
  };

  handlePostComment = event => {
    event.preventDefault();
    if (!this.state.commentToPost || !this.props.user) {
      this.setState({
        commentWarning:
          'You must be signed in and have filled in the comment box in order to post a comment'
      });
    } else {
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
  };

  handleDelete = ({
    event: {
      target: {
        parentElement: { id }
      }
    }
  }) => {
    let comment_id = id;
    api.deleteComment(comment_id).then(() => {
      api
        .getArticleComments(this.props.article_id)
        .then(comments => {
          this.setState({ comments: comments });
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
    });
  };

  componentDidMount() {
    Promise.all([
      api.getSingleArticle(this.props.article_id),
      api.getArticleComments(this.props.article_id)
    ])
      .then(resolutions => {
        this.setState({
          article: resolutions[0],
          comments: resolutions[1]
        });
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

  render() {
    return (
      <div id={this.props.article_id}>
        {this.state.err ? (
          <ErrorPage err={this.state.err} />
        ) : (
          <>
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
            <CommentSubmitForm
              handlePostComment={this.handlePostComment}
              handleChange={this.handleChange}
              commentToPost={this.state.commentToPost}
              commentWarning={this.state.commentWarning}
            />
            {this.state.comments && (
              <CommentList
                comments={this.state.comments}
                handleDelete={this.handleDelete}
                user={this.props.user}
              />
            )}
          </>
        )}
      </div>
    );
  }
}
export default SingleArticle;
