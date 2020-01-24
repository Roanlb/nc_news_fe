import React from 'react';

const ArticleSelector = ({ handleSelectChange }) => {
  return (
    <aside>
      <h4>Sort by:</h4>
      <select
        name="articleSelector"
        id="articleSelector"
        onChange={handleSelectChange}
      >
        <option value="created_at">Date created</option>
        <option value="comment_count">Comment count</option>
        <option value="votes">Votes</option>
      </select>
    </aside>
  );
};

export default ArticleSelector;
