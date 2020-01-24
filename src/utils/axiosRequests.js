const axios = require('axios');

const getTopics = () => {
  return axios
    .get('https://roanncnewsserver.herokuapp.com/api/topics')
    .then(({ data: { topics } }) => {
      return topics;
    });
};

const getSingleArticle = id => {
  return axios
    .get(`https://roanncnewsserver.herokuapp.com/api/articles/${id}`)
    .then(({ data: { article } }) => {
      return article;
    });
};

const getArticleComments = id => {
  return axios
    .get(`https://roanncnewsserver.herokuapp.com/api/articles/${id}/comments`)
    .then(({ data: { comments } }) => {
      return comments;
    });
};

const getSortedArticles = (specifiedTopic, selector) => {
  return axios
    .get(`https://roanncnewsserver.herokuapp.com/api/articles`, {
      params: { topic: specifiedTopic, sort_by: selector }
    })
    .then(({ data: { articles } }) => {
      return articles;
    });
};

const postComment = (comment, user, id) => {
  return axios.post(
    `https://roanncnewsserver.herokuapp.com/api/articles/${id}/comments`,
    { username: user, body: comment }
  );
};

const deleteComment = id => {
  return axios.delete(
    `https://roanncnewsserver.herokuapp.com/api/comments/${id}`
  );
};

const vertasilePatch = (increment, id, type) => {
  return axios.patch(
    `https://roanncnewsserver.herokuapp.com/api/${type}/${id}`,
    {
      inc_votes: increment
    }
  );
};

module.exports = {
  getTopics,
  getSingleArticle,
  getArticleComments,
  getSortedArticles,
  postComment,
  deleteComment,
  vertasilePatch
};
