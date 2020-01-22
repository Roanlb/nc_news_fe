import React from 'react';
import Voter from './Voter';

const CommentList = ({ comments }, handleDelete, user) => {
  console.log(comments);
  return (
    <ul>
      {comments.map(comment => {
        return (
          <li key={comment.comment_id} id={comment.comment_id}>
            <h5>{comment.author}</h5>
            <p>{comment.body}</p>
            <Voter
              votes={comment.votes}
              type="comments"
              id={comment.comment_id}
            />
            <h6>Created at: {comment.created_at}</h6>
            {user === comment.author && (
              <button onClick={handleDelete}>Delete</button>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default CommentList;
