import React from 'react'


function Summury(props) {


    let { addScore,
        totalScore,
        bestScore
    } = props.foRender;

    console.log('render summ', addScore);

    return (
        <header>
            <h1 className="title" >2048</h1>
            <section className="results">
                <div className="score">
                    <h2>Score</h2>
                    <div>{totalScore}</div>
                    {addScore > 0 &&
                        <div className="scoreAddition">+{addScore}</div>
                    }
                </div>
                <div className="best">
                    <h2>Best</h2>
                    <div >{bestScore}</div>
                </div>
            </section>
        </header>
    );

}

export default Summury
