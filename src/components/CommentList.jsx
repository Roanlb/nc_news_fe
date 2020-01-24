import React from 'react';
import Voter from './Voter';

const CommentList = ({ comments, handleDelete, user }) => {
  return (
    <ul className="CommentList">
      {comments.map(comment => {
        return (
          <li
            key={comment.comment_id}
            id={comment.comment_id}
            className="OneComment"
          >
            <h5 className="CommentText">{comment.author}</h5>
            <p className="CommentText">{comment.body}</p>
            <Voter
              votes={comment.votes}
              type="comments"
              id={comment.comment_id}
            />
            <h6 className="CommentText">Created at: {comment.created_at}</h6>
            {user === comment.author && (
              <button className="DeleteButton" onClick={handleDelete}>
                Delete
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default CommentList;
