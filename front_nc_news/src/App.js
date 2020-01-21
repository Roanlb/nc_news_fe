import './App.css';
import React, { Component } from 'react';
import Header from './components/Header';
import NavBar from './components/NavBar';
import ArticleList from './components/ArticleList';
import SingleArticle from './components/SingleArticle';
import { Router } from '@reach/router';

class App extends Component {
  state = {
    username: 'jessjelly'
  };

  render() {
    return (
      <div className="App">
        <Header user={this.state.username} />
        <NavBar />
        <Router>
          <ArticleList path="/" mainFeed={true} />
          <ArticleList path="/:topic" mainFeed={false} />
          <SingleArticle
            path="/:topic/:article_id"
            user={this.state.username}
          />
        </Router>
      </div>
    );
  }
}

export default App;
