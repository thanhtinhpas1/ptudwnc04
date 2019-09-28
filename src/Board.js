import React from 'react';
import Square from './Square';

class Board extends React.Component {

    renderSquare(i) {
        const { squaresWin, squares, onClick} = this.props;
        return (
            <Square
                squaresWin={squaresWin}
                key={i}
                index={i}
                value={squares[i]}
                onClick={() => onClick(i)}
            />
        );
    }

    render() {
        const rows = [];
        for (let i = 0; i < 20; i += 1) {
            const tmp = [];
            let val;
            for (let j = 0; j < 20; j += 1) {
                val = i * 20 + j;
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

export default Board;