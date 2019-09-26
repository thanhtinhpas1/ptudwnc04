import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './Game.css';
import * as serviceWorker from './serviceWorker';

function Square(props) {
    const win = props.squaresWin.indexOf(props.index) !== -1 ? 'win' : null;
    const classes = `square ${win}`;
    return (
        // <div className={>
        <button className={classes} onClick={props.onClick}>
            {props.value}
        </button>
        // </div>
    );
}

class Board extends React.Component {

    renderSquare(i) {
        return (
            <Square
                squaresWin={this.props.squaresWin}
                key={i}
                index={i}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        var rows = [];
        for (var i = 0; i < 20; i++) {
            var tmp = [];
            for (var j = 0; j < 20; j++) {
                var val = i * 20 + j;
                tmp.push(this.renderSquare(val));
            }
            rows.push(
                <div key={val} className="board-row">
                    {tmp}
                </div>
            );
        }

        return (
            <div>
                {rows}
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(400).fill(null),
                position: []
            }],
            isIncrease: true,
            position: [],
            xIsNext: true,
            status: 'Next player: X',
            isWin: false,
            stepNumber: 0,
            active: -1,
            squaresWin: [],
        };
    }

    handleClick(i) {
        var history = this.state.history.slice(0, this.state.stepNumber + 1);
        var current = history[history.length - 1];
        var squares = current.squares.slice();
        const positions = current.position.slice();
        if (!squares[i] && !this.state.isWin) {
            squares[i] = this.state.xIsNext ? 'X' : 'O';
            const winner = calculateWinner(squares);
            var status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
            var isWin = false;
            var squaresWin = [];
            if (winner) {
                status = 'Winner: ' + squares[winner[0]];
                isWin = true;
                squaresWin = winner;
            }
            this.setState({
                history: history.concat([{
                    squares: squares,
                    position: positions.concat(String(i))
                }]),
                xIsNext: !this.state.xIsNext,
                stepNumber: history.length,
                status: status,
                isWin: isWin,
                squaresWin: squaresWin
            });
            //check again
        }

    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
            active: step,
            squaresWin: []
        });
        const history = this.state.history.slice(0, this.state.history.length);
        const current = history[step];
        const squares = current.squares.slice();
        var winner = calculateWinner(squares);
        if (winner) {
            this.setState({
                status: 'Winner: ' + squares[winner[0]],
                isWin: true,
                squaresWin: winner
            })
        }
        else {
            this.setState({
                status: 'Next player: ' + (this.state.xIsNext ? 'X' : 'O'),
                isWin: false,
                squaresWin: []
            })
        }
    }

    backStep() {
        let step = this.state.stepNumber - 1;

        if (step === 0) return;
        this.jumpTo(step);
    }
    nextStep() {
        let step = this.state.stepNumber + 1;
        if (step === this.state.history.length) return;
        this.jumpTo(step);
    }

    sortIncrease() {
        if (this.state.isIncrease) return;
        this.setState({
            isIncrease: true
        })
    }

    sortDescrease() {
        if (!this.state.isIncrease) return;
        this.setState({
            isIncrease: false
        })
    }

    render() {
        var history = this.state.history;
        const current = history[this.state.stepNumber];
        var desc;
        var moves;
        moves = history.map((step, move) => {
            desc = move ?
                'Go to move #' + move + ' Position:#' :
                'Go to game start';
            return (
                <li key={move} >
                    <button className={this.state.active === move ? 'active' : null} onClick={() => this.jumpTo(move)}>{desc} {step.position[move - 1]}</button>
                </li>
            );
        });

        if (!this.state.isIncrease) {
            moves = moves.reverse();
        }

        return (
            <div className="game">
                <div className="game-info">
                    <div className="status">
                        {this.state.status}
                        <div className="step">

                            <button onClick={() => this.backStep()}>Back</button>
                            <button onClick={() => this.nextStep()}>Next</button>
                        </div>
                    </div>
                    <button onClick={() => this.sortIncrease()}>Sort Increase</button>
                    <button onClick={() => this.sortDescrease()}>Sort Decrease</button>
                    <ol>{moves}</ol>
                </div>
                <div className="game-board">
                    <Board squares={current.squares}
                        squaresWin={this.state.squaresWin}
                        onClick={i => this.handleClick(i)}
                    />
                </div>
            </div>
        );
    }
}
// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);


function calculateWinner(squares) {
    const lines = [];
    //case 1
    for (var index1 = 0; index1 < 20; index1++) {
        for (var next1 = 0; next1 < 16; next1++) {
            var tmp = [];
            for (var move1 = 0; move1 < 5; move1++) tmp.push(index1 * 20 + next1 + move1);
            lines.push(tmp);
        }
    }
    //case 2
    for (var index2 = 0; index2 < 16; index2++) {
        for (var next2 = 0; next2 < 20; next2++) {
            var tmp1 = [];
            for (var move2 = 0; move2 < 5; move2++) {
                tmp1.push((index2 + move2) * 20 + next2);
            }
            lines.push(tmp1);
        }
    }

    //case 3
    for (var index3 = 0; index3 < 16; index3++) {
        for (var next3 = 0; next3 < 16; next3++) {
            var tmp2 = [];
            for (var move3 = 0; move3 < 5; move3++) {
                var value = (index3 + move3) * 20 + move3 + next3;
                tmp2.push(value);
            }
            lines.push(tmp2);
        }
    }

    //case 4
    for (var index4 = 0; index4 < 16; index4++) {
        for (var j = 19; j > 3; j--) {
            var tmp3 = [];
            for (var move4 = 0; move4 < 5; move4++) {
                var value1 = (index4 + move4) * 20 + j - move4;
                tmp3.push(value1);
            }
            lines.push(tmp3);
        }
    }

    for (let index5 = 0; index5 < lines.length; index5++) {
        const [a, b, c, d, e] = lines[index5];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d] && squares[a] === squares[e]) {
            // case 1

            if (b - a === 1) {
                var count = 0;
                var rowA = Math.floor(a / 20);
                var colA = a % 20;
                var rowE = Math.floor(e / 20);
                var colE = e % 20;

                for (let next6 = rowA * 20; next6 < rowA * 20 + colA; next6++) {
                    if (squares[next6] !== squares[a] && squares[next6]) {
                        count = count + 1;
                        break;
                    }
                }

                for (let next7 = rowE * 20 + colE + 1; next7 < rowE * 20 + 20; next7++) {
                    if (squares[next7] && squares[next7] !== squares[a]) {
                        count = count + 1;
                        break;
                    }
                }
                if (count <= 1) {
                    return [a, b, c, d, e];
                }
            }

            //case 2
            else if (b - a === 20) {
                var rowA1 = Math.floor(a / 20);
                var rowE1 = Math.floor(e / 20);
                var next9 = a % 20;
                var count1 = 0;
                for (var id = 0; id < rowA1; id++) {
                    var idx = id * 20 + next9;
                    if (squares[idx] && squares[idx] !== squares[a]) {
                        count1 = count1 + 1;
                        break;
                    }
                }

                for (var id1 = rowE1 + 1; id1 < 20; id1++) {
                    var idx5 = id1 * 20 + next9;
                    if (squares[idx5] && squares[idx5] !== squares[a]) {
                        count1 = count1 + 1;
                        break;
                    }
                }
                if (count1 <= 1) return [a, b, c, d, e];

            }

            //case 3

            //end
            else if (b - a === 21) {
                var count2 = 0;
                var rowA4 = Math.floor(a / 20);
                var colA4 = Math.floor(a % 20);
                var rowStart = rowA4 - colA4;

                var rowE4 = Math.floor(a / 20);
                var colE4 = a % 20;
                var start = rowE4 * 20 + colE4;
                for (var j4 = 0; j4 < colA4; j4++) {
                    var value2 = (rowStart + j4) * 20 + j4;
                    if (squares[value2] && squares[value2] !== squares[a]) {
                        count2 = count2 + 1;
                        break;
                    }
                }
                for (var id2 = rowE4 + 1; id2 < 20; id2++) {
                    if (squares[start + 21] && squares[start + 21] !== squares[e]) {
                        count2 = count2 + 1;
                        break;
                    }
                    start = start + 21;
                }
                if (count2 <= 1) {
                    return [a, b, c, d, e];
                }
            }


            //case 4
            //b-a=19
            else {
                var count3 = 0;
                var rowA3 = Math.floor(a / 20);
                var colA3 = a % 20;
                var rowE3 = Math.floor(e / 20);
                var colE3 = e % 20;
                var rowStart2 = rowA3 - 20 + colA3;
                var start2 = (rowA3 - 1) * 20 + colA3 + 1;
                for (var next11 = rowA3 - 1; next11 >= rowStart2; next11--) {
                    if (squares[start2] && squares[a] !== squares[start2]) {
                        count3 = count3 + 1;
                        break;
                    }
                    start2 = start2 - 19;
                }

                var rowEnd = 19;
                if (colE3 < (19 - rowE3)) {
                    rowEnd = rowE3 + colE3;
                }
                var end = rowE3 * 20 + colE3 + 19;
                for (var next12 = rowE3 + 1; next12 <= rowEnd; next12++) {
                    if (squares[end] && squares[end] !== squares[e]) {
                        count3 = count3 + 1;
                        break;
                    }
                    end = end + 19;
                }

                if (count3 <= 1) return [a, b, c, d, e];
            }
        }
    }
    return null;
}


serviceWorker.unregister();
