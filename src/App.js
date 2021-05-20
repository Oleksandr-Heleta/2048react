import React from 'react'

import Summury from './Summury'
import Matrix from './Matrix'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      addCount: null
    }
    this.onClickNewGame = this.onClickNewGame.bind(this);

  }
  onClickNewGame(e) {
    console.log('do newGame ' + e);

  }
  keyAction(e) {
    this.setState({ addCount: e });
  }





  render() {

    return (
      <div >
        <Summury addCount={this.addCount} />
        <Matrix newGame={this.onClickNewGame}
          keyAction={this.keyAction} />

      </div>
    );
  }
}

export default App;
