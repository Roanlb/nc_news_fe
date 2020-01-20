import './App.css';
import React, { Component } from 'react';
import Header from './components/Header';
import NavBar from './components/NavBar';
import ArticleList from './components/ArticleList';
import { Router } from '@reach/router';

class App extends Component {
  state = {
    username: ''
  };

  render() {
    return (
      <div className="App">
        <Header />
        <NavBar />
        <Router>
          <ArticleList path="/" />
          <ArticleList path="/:topic" />
        </Router>
      </div>
    );
  }
}

export default App;
