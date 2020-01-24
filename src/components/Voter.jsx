import React, { Component } from 'react';
import * as api from '../utils/axiosRequests';

class Voter extends Component {
  state = {
    optimisticVotes: 0
  };

  handleVote = ({ target: { id } }) => {
    let increment = +id;
    let typeId = this.props.id;
    let type = this.props.type;
    if (this.state.optimisticVotes !== 0) {
      api.vertasilePatch(-this.state.optimisticVotes, typeId, type);
      this.setState({ optimisticVotes: 0 });
    } else {
      api.vertasilePatch(increment, typeId, type).then(() => {
        this.setState({ optimisticVotes: increment });
      });
    }
  };

  render() {
    return (
      <div className="Voter">
        <h5 className="VoterText">Votes: </h5>

        <button className="VoteButton" onClick={this.handleVote} id="1">
          Upvote
        </button>
        <p className="VoterText">
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
