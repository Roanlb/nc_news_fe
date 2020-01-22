import React, { Component } from 'react';
import * as api from '../utils/axiosRequests';

class Voter extends Component {
  state = {
    optimisticVotes: 0,
    type: 'none'
  };

  componentDidMount() {
    this.setState({ type: this.props.type });
  }

  handleVote = event => {
    let increment = +event.target.id;
    let id = event.target.parentElement.parentElement.id;
    let type = this.props.type;
    if (this.state.optimisticVotes !== 0) {
      api.vertasilePatch(-this.state.optimisticVotes, id, type);
      this.setState({ optimisticVotes: 0 });
    } else {
      api.vertasilePatch(increment, id, type).then(() => {
        this.setState({ optimisticVotes: increment });
        console.log(this.state.optimisticVotes);
      });
    }
  };

  render() {
    return (
      <div>
        <button onClick={this.handleVote} id="1">
          Upvote
        </button>
        <p>
          {this.state.optimisticVotes
            ? this.props.votes + this.state.optimisticVotes
            : this.props.votes}
        </p>
        <button onClick={this.handleVote} id="-1">
          Downvote
        </button>
      </div>
    );
  }
}

export default Voter;
