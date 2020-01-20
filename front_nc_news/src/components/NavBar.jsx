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
      <>
        <h4>Stories by topic</h4>
        {this.state.topics.map(topic => {
          return (
            <div key={topic.slug}>
              <Link to={topic.slug}>{topic.slug}</Link>
              <h6>{topic.description}</h6>
            </div>
          );
        })}
      </>
    );
  }
}
export default NavBar;
