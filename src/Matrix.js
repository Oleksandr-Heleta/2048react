import React from 'react';

class Matrix extends React.Component {
    constructor(){
        super();
        this.state = {
            size: {
                width: 4,
                height: 4,
            },
            grid: [
                ['', '', '', ''],
                ['', '', '', ''],
                ['', '', '', ''],
                ['', '', '', ''],
            ],
            addCount: 0,
            cell: []
        };
       
       this.onClickNewGame = this.onClickNewGame.bind(this);


    }
    shouldComponentUpdate(){
        if(this.props.action === 'newGame') {
          this.onClickNewGame();
          return true;
        };
    }
    onClickNewGame(){
        this.setState({grid: [
                ['2', '', '', ''],
                ['', '', '', ''],
                ['', '', '', ''],
                ['', '', '', ''],
        ]})
        
    }
    render(){
        console.log(this.props);
        let attributes = this.state,
            i = 0,
            j = 1,
            
            str = attributes.grid.map(row =>
                
                <div key={i += 10} className="row">
                {row.map(cell =>
                   <div key={ i + (j+=1)} className={"cell appear-"+cell} >{cell}</div>
                )}
               </div>
            )
            
    return (
           
           <div className="table">
            {str}
            </div>
         
        );
    }
}


export default Matrix