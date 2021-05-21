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
        this.props.newGame();
        this.setState(() => {
            let startObj = {
                grid: [
                    ['', '', '', ''],
                    ['', '', '', ''],
                    ['', '', '', ''],
                    ['', '', '', ''],
                ],
                cell: []
            }
            this.randomGrid(startObj);
            this.randomGrid(startObj);
            return {
                grid: startObj.grid,
                cell: startObj.cell
            }
        })


    }
    onKeyDown(e) {
        let key = e.code;
        this.setState({ cell: [] });
        let cloneArr = this.state.grid;
        let turnGrids;
        switch (key) {
            case 'ArrowUp':
                turnGrids = this.rowInColum(this.state.grid);
                turnGrids = this.moveHorizont(turnGrids, 'left');
                this.setState({ grid: this.rowInColum(turnGrids) });
                break;
            case 'ArrowDown':
                turnGrids = this.rowInColum(this.state.grid);
                turnGrids = this.moveHorizont(turnGrids, 'right');
                this.setState({ grid: this.rowInColum(turnGrids) });
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
        let j = getRandom(0, attributes.grid.length - 1);
        let i = getRandom(0, attributes.grid[0].length - 1);
        if (attributes.grid[j][i] === '') {
            attributes.grid[j][i] = '2';
            attributes.cell.push([j, i]);
            return attributes;
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

    rowInColum(grids) {
        let turnArr = [];
        for (let j = 0; j < grids.length; j += 1) {
            turnArr.push([]);
            for (let i = 0; i < grids[j].length; i += 1) {
                turnArr[j].push('');
            }
        }

        for (let j = 0; j < grids.length; j += 1) {
            for (let i = 0; i < grids.length; i += 1) {
                turnArr[i][j] = grids[j][i];
            }
        }
        return turnArr;
    }
}


export default Matrix