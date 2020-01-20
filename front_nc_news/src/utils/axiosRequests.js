const axios = require('axios');

const getTopics = topic => {
  return axios
    .get('https://roanncnewsserver.herokuapp.com/api/topics')
    .then(({ data: { topics } }) => {
      return topics;
    });
};

const getAllArticles = specifiedTopic => {
  return axios
    .get('https://roanncnewsserver.herokuapp.com/api/articles', {
      params: {
        topic: specifiedTopic
      }
    })
    .then(({ data: { articles } }) => {
      return articles;
    });
};

module.exports = { getTopics, getAllArticles };
