import React from 'react'

import Summury from './Summury'
import Matrix from './Matrix'

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      action: null
    }
    this.onClickNewGame = this.onClickNewGame.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }
  onClickNewGame(){
      this.setState({action: 'newGame'})
  }
  onKeyDown(e){
    let key = e.code;
    
    switch (key) {
      case 'ArrowUp': 
            this.setState({action: 'Up'});
            break;
      case 'ArrowDown': 
            this.setState({action: 'Down'});
            break;
      case 'ArrowLeft': 
            this.setState({action: 'Left'});
            break;
      case 'ArrowRight': 
            this.setState({action: 'Right'});
            break;
      default : break;
    }
    
  }
  componentDidMount(){
    window.onkeydown = this.onKeyDown
  }
  render(){
    
    return (
    <div onKeyDown={this.onKeyDown}>
      <Summury />
      <Matrix action={this.state.action}/>
      <div className="buttonBlock">
        <button className="newGameBtn" onClick={this.onClickNewGame}>New Game</button>
      </div>
    </div>
  );
  }
}

export default App;
