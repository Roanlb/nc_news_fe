import './App.css';
import React, { Component } from 'react';
import Header from './components/Header';
import NavBar from './components/NavBar';
import ArticleList from './components/ArticleList';
import SingleArticle from './components/SingleArticle';
import ErrorPage from './components/ErrorPage';
import { Router } from '@reach/router';

class App extends Component {
  state = {
    username: 'jessjelly'
  };

  render() {
    return (
      <div className="App">
        <Header user={this.state.username} className="Header" />
        <NavBar />
        <Router className="ArticleView">
          <ArticleList path="/" mainFeed={true} className="ArticleList" />
          <ArticleList
            path="/:topic"
            mainFeed={false}
            className="ArticleList"
          />
          <SingleArticle
            path="/:topic/:article_id"
            user={this.state.username}
          />
          <ErrorPage default />
        </Router>
      </div>
    );
  }
}

export default App;
