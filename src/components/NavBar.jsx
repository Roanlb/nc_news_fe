import React, { Component } from 'react';
import * as api from '../utils/axiosRequests';
import { Link } from '@reach/router';

class NavBar extends Component {
  state = { topics: [], isLoading: true, err: '' };

  componentDidMount() {
    api
      .getTopics()
      .then(topics => {
        this.setState({ topics: topics, isLoading: false });
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
      <div className="NavBar">
        <h4 className="NavBarTitle"> Stories by topic</h4>
        {this.state.isLoading && <h4>Loading...</h4>}
        {this.state.err ? (
          <h1>Oops! Couldn't find today's topics</h1>
        ) : (
          <div className="NavBarList">
            {this.state.topics.map(topic => {
              return (
                <div className="NavButton" key={topic.slug}>
                  <Link to={topic.slug}>{topic.slug}</Link>
                  <h6>{topic.description}</h6>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
export default NavBar;
