import React, { Component } from 'react';
import * as api from '../utils/axiosRequests';

class Voter extends Component {
  state = {
    optimisticVotes: 0
  };

  handleVote = event => {
    let increment = +event.target.id;
    let id = this.props.id;
    let type = this.props.type;
    if (this.state.optimisticVotes !== 0) {
      api.vertasilePatch(-this.state.optimisticVotes, id, type);
      this.setState({ optimisticVotes: 0 });
    } else {
      api.vertasilePatch(increment, id, type).then(() => {
        this.setState({ optimisticVotes: increment });
      });
    }
  };

  render() {
    return (
      <div className="Voter">
        <h5>Votes: </h5>

        <button className="VoteButton" onClick={this.handleVote} id="1">
          Upvote
        </button>
        <p>
          {this.state.optimisticVotes
            ? this.props.votes + this.state.optimisticVotes
            : this.props.votes}
        </p>
        <button className="VoteButton" onClick={this.handleVote} id="-1">
          Downvote
        </button>
      </div>
    );
  }
}

export default Voter;
