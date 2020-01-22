import React, { Component } from 'react';
import * as api from '../utils/axiosRequests';
import { Link } from '@reach/router';

class NavBar extends Component {
  state = { topics: [] };

  componentDidMount() {
    api.getTopics().then(topics => {
      this.setState({ topics: topics });
    });
  }

  render() {
    return (
      <div className="NavBar">
        <h4 className="NavBarTitle"> Stories by topic</h4>
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
      </div>
    );
  }
}
export default NavBar;
