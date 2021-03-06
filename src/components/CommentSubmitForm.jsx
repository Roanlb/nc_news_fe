import React from 'react';

const CommentSubmitForm = ({
  handlePostComment,
  commentToPost,
  commentWarning,
  handleChange
}) => {
  return (
    <form onSubmit={handlePostComment}>
      <h3>Post a comment: </h3>
      <textarea
        required
        className="CommentInput"
        name="commentPost"
        id="commentPost"
        onChange={handleChange}
        value={commentToPost}
        placeholder={commentWarning}
      ></textarea>
      <input className="SubmitButton" type="submit" />
    </form>
  );
};

export default CommentSubmitForm;
