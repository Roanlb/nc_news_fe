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
      <div>
        <h4>Stories by topic</h4>
        {this.state.topics.map(topic => {
          return (
            <>
              <Link to={topic.slug}>{topic.slug}</Link>
              <h6>{topic.description}</h6>
            </>
          );
        })}
      </div>
    );
  }
}

export default NavBar;
