import React from 'react'


class Summury extends React.Component {
    constructor() {
        super();
        this.state = {
            totalScore: 0,
            addScore: 0,
            bestScore: JSON.parse(localStorage.getItem('bestScore')) || 0,
        };
       
    }
    
    render(){
        return (
            <header>
            <h1 className="title" >2048</h1>
            <section className="results">
                <div className="score">
                    <h2>Score</h2>
                    <div>{this.state.totalScore}</div>
                </div>
                <div className="best">
                    <h2>Best</h2>
                    <div >{this.state.bestScore}</div>
                </div>
            </section>
        </header>
        );
    }
}

export default Summury
