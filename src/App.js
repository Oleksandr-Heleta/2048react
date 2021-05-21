import React from 'react'

import Summury from './Summury'
import Matrix from './Matrix'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      totalScore: 0,
      addScore: 0,
      bestScore: JSON.parse(localStorage.getItem('bestScore')) || 0,
    };
    this.onClickNewGame = this.onClickNewGame.bind(this);
    this.keyAction = this.keyAction.bind(this);
  }
  onClickNewGame() {
    this.setState({ totalScore: 0 })

  }
  keyAction(addCount) {
    this.setState(() => {
      let best;
      let total = this.state.totalScore + addCount;
      if (total > this.state.bestScore) {
        best = total;
        localStorage.setItem('bestScore', JSON.stringify(best));
      } else {
        best = this.state.bestScore;
      }
      return {
        addScore: addCount,
        totalScore: total,
        bestScore: best
      }
    })


  }





  render() {

    return (
      <div >
        <Summury foRender={this.state}
        />
        <Matrix newGame={this.onClickNewGame}
          keyAction={this.keyAction} />

      </div>
    );
  }
}

export default App;
