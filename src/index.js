import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './Game.css';
import * as serviceWorker from './serviceWorker';
import calculateWinner from './WinnerUtils';
import Board from './Board';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(400).fill(null),
                position: [],
            }],
            isIncrease: true,
            xIsNext: true,
            status: 'Next player: X',
            isWin: false,
            stepNumber: 0,
            squaresWin: [],
            isActive: -1,
        };
    }

    handleClick(i) {
        const { history, isWin, xIsNext, squaresWin, stepNumber } = this.state;
        const cloneHistory = history.slice(0, stepNumber + 1);
        const current = cloneHistory[cloneHistory.length - 1];
        const squares = current.squares.slice();
        const positions = current.position.slice();
        if (!squares[i] && !isWin) {
            squares[i] = xIsNext ? 'X' : 'O';
            const winner = calculateWinner(squares);
            const status = `Next player: ${xIsNext ? 'X' : 'O'}`;
            if (winner) {
                this.setState({
                    history: cloneHistory.concat([{
                        squares,
                        position: positions.concat(String(i))
                    }]),
                    status: `Winner: ${squares[winner[0]]}`,
                    isWin: true,
                    squaresWin: winner,
                    stepNumber: cloneHistory.length,
                })
            }

            else this.setState({
                history: cloneHistory.concat([{
                    squares,
                    position: positions.concat(String(i))
                }]),
                status,
                isWin,
                squaresWin,
                xIsNext: !xIsNext,
                stepNumber: cloneHistory.length,
            });
            // check again
        }
    }

    jumpTo(step) {
        const { history, xIsNext } = this.state;
        const cloneHistory = history.slice(0, history.length);
        const current = cloneHistory[step];
        const squares = current.squares.slice();
        const winner = calculateWinner(squares);
        if (winner) {
            this.setState({
                stepNumber: step,
                xIsNext: (step % 2) === 0,
                status: `Winner: ${squares[winner[0]]}`,
                isWin: true,
                squaresWin: winner,
                isActive: step
            })
        }
        else {
            // active: step
            this.setState({
                stepNumber: step,
                xIsNext: (step % 2) === 0,
                status: `Next player: ${xIsNext ? 'X' : 'O'}`,
                isWin: false,
                squaresWin: [],
                isActive: step
            })
        }
    }

    sortIncrease() {
        const { isIncrease } = this.state;
        if (isIncrease) return;
        this.setState({
            isIncrease: true
        })
    }

    sortDescrease() {
        const { isIncrease } = this.state;
        if (!isIncrease) return;
        this.setState({
            isIncrease: false
        })
    }

    render() {
        const { history, stepNumber, status, squaresWin, isIncrease, isActive } = this.state;
        const current = history[stepNumber];
        let desc;
        let moves;
        moves = history.map((step, move) => {
            desc = move ?
                `Go to move #${move} Position:#` :
                'Go to game start';
            return (
                <li key={step.position} >
                    <button type="button" className={isActive === move ? 'active' : null} onClick={() => this.jumpTo(move)}>{desc} {step.position[move - 1]}</button>
                </li>
            );
        });

        if (!isIncrease) {
            moves = moves.reverse();
        }

        return (
            <div className="game">
                <div className="game-info">
                    <div className="status">
                        {status}
                        <div className="step">
                            <button type="button" onClick={() => this.sortIncrease()}>Sort Increase</button>
                            <button type="button" onClick={() => this.sortDescrease()}>Sort Decrease</button>
                        </div>
                    </div>
                    <ol>{moves}</ol>
                </div>
                <div className="game-board">
                    <Board squares={current.squares}
                        squaresWin={squaresWin}
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

serviceWorker.unregister();
