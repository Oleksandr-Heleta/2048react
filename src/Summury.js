import React from 'react'


class Summury extends React.Component {
    constructor() {
        super();


    }

    render() {
        let { addScore,
            totalScore,
            bestScore
        } = this.props.foRender;

        return (
            <header>
                <h1 className="title" >2048</h1>
                <section className="results">
                    <div className="score">
                        <h2>Score</h2>
                        {addScore > 0
                            ? <div className="scoreAddition">{addScore}</div>
                            : null}
                        <div>{totalScore}</div>
                    </div>
                    <div className="best">
                        <h2>Best</h2>
                        <div >{bestScore}</div>
                    </div>
                </section>
            </header>
        );
    }




}

export default Summury
