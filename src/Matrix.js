import React from 'react';
import { getRandom, similarArr } from './utils';

class Matrix extends React.Component {
    constructor() {
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
        this.onKeyDown = this.onKeyDown.bind(this);

    }

    onClickNewGame() {
        this.props.newGame("5");
        console.log("do onClick");
        this.setState(() => {
            let grid = [
                ['', '2', '', ''],
                ['', '', '', ''],
                ['', '', '', ''],
                ['', '', '', ''],
            ];
            let cell = [];
            this.randomGrid(this.state);
            this.randomGrid(this.state);
            return {
                grid: grid,
                cell: cell
            }
        })


    }
    onKeyDown(e) {
        let key = e.code;
        this.setState({ cell: [] });
        let cloneArr = this.state.grid;

        switch (key) {
            case 'ArrowUp':
                console.log("up");
                // this.setState({ action: 'Up' });
                break;
            case 'ArrowDown':
                // this.setState({ action: 'Down' });
                break;
            case 'ArrowLeft':
                this.setState({ grid: this.moveHorizont(this.state.grid, 'left') });
                break;
            case 'ArrowRight':
                this.setState({ grid: this.moveHorizont(this.state.grid, 'right') });
                break;
            default: break;
        }
        if (similarArr(cloneArr, this.state.grid)) return this.props.keyAction(this.state.addCount);
        this.randomGrid(this.state);
        return this.props.keyAction(this.state.addCount);
    }

    componentDidMount() {
        window.onkeydown = this.onKeyDown
    }

    render() {
        console.log("render");
        let attributes = this.state,
            i = 0,
            j = 1,

            str = attributes.grid.map(row =>

                <div key={i += 10} className="row">
                    {row.map(cell =>
                        <div key={i + (j += 1)} className={"cell appear-" + cell} >{cell}</div>
                    )}
                </div>
            )

        return (
            <>
                <div className="table">
                    {str}
                </div>
                <div className="buttonBlock">
                    <button className="newGameBtn"
                        onClick={this.onClickNewGame}
                    >New Game</button>
                </div>
            </>

        );
    }

    randomGrid(attributes) {
        console.log("do random");
        let j = getRandom(0, attributes.size.height - 1);
        let i = getRandom(0, attributes.size.width - 1);
        if (attributes.grid[j][i] === '') {
            this.setState(() => {
                this.state.grid[j][i] = '2';
                this.state.cell.push([j, i]);
            })
            console.log(this.state);
            return;
        }
        return this.randomGrid(attributes);
    }

    moveHorizont(grids, move) {
        this.setState({ addCount: 0 });
        let res = grids.map(j => {
            let numberArr = [];
            switch (move) {
                case 'left':
                    numberArr = this.fullArr(j);
                    break;
                case 'right':
                    numberArr = this.fullArr(j.reverse()).reverse();
                    break;
                default:
                    return;
            }

            let diffLength = j.length - numberArr.length;
            let emptyArr = [];
            for (let i = 0; i < diffLength; i += 1) {
                emptyArr.push('');
            }
            switch (move) {
                case 'left':
                    return j = numberArr.concat(emptyArr);
                case 'right':
                    return j = emptyArr.concat(numberArr);
                default:
                    return;
            }
        })
        return res;
    }

    fullArr(arr) {
        const stack = [];
        let score = 0;
        for (let char of arr) {
            if (char !== '') findChar(char);
        }
        function findChar(char) {
            if (stack.length > 0 && stack[stack.length - 1].char === char) {
                stack[stack.length - 1].appeared++;
                if (stack[stack.length - 1].appeared === 2) {
                    stack.pop();
                    char = +char * 2;
                    score += char;
                    char = String(char);
                    findChar(char);
                }
            } else {
                stack.push({ char, appeared: 1 });
            }
        }
        let res = [];
        stack.forEach(n => {
            res.push(n.char);
        })
        this.setState(() => { return { addCount: this.state.addCount + score } });
        return res;
    }
}


export default Matrix