import React from 'react';
import { getRandom, similarArr } from './utils';

class Matrix extends React.PureComponent {
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
        let cell = [];
        let grid;
        let cloneArr = this.state.grid;
        let turnGrids;
        switch (key) {
            case 'ArrowUp':
                turnGrids = this.rowInColum(this.state.grid);
                turnGrids = this.moveHorizont(turnGrids, 'left');
                grid = this.rowInColum(turnGrids);
                break;
            case 'ArrowDown':
                turnGrids = this.rowInColum(this.state.grid);
                turnGrids = this.moveHorizont(turnGrids, 'right');
                grid = this.rowInColum(turnGrids);
                break;
            case 'ArrowLeft':
                grid = this.moveHorizont(this.state.grid, 'left');
                break;
            case 'ArrowRight':
                grid = this.moveHorizont(this.state.grid, 'right');
                break;
            default: break;
        }
        if (similarArr(cloneArr, grid)) {
            this.setState({ cell: cell });
            return this.props.keyAction(this.state.addCount)
        };
        this.setState(() => this.randomGrid({ grid, cell }));
        return this.props.keyAction(this.state.addCount);
    }

    componentDidMount() {
        window.onkeydown = this.onKeyDown;
    }

    render() {
        console.log("render matr");
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

        let count = 0;
        let res = grids.map(j => {
            let resArr = [];
            let numberArr = [];
            switch (move) {
                case 'left':
                    resArr = this.fullArr(j, count);
                    numberArr = resArr[0];
                    count = resArr[1];
                    break;
                case 'right':
                    resArr = this.fullArr(j.reverse(), count);
                    numberArr = resArr[0].reverse();
                    count = resArr[1];
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
        console.log(count);
        this.setState({ addCount: count });
        return res;
    }

    fullArr(arr, count) {
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

        count += score;
        return [res, count];
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