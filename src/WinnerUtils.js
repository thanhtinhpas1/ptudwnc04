
export default function calculateWinner(squares) {
    const lines = [];
    // case 1
    for (let index1 = 0; index1 < 20; index1 += 1) {
        for (let next1 = 0; next1 < 16; next1 += 1) {
            const tmp = [];
            for (let move1 = 0; move1 < 5; move1 += 1) tmp.push(index1 * 20 + next1 + move1);
            lines.push(tmp);
        }
    }
    // case 2
    for (let index2 = 0; index2 < 16; index2 += 1) {
        for (let next2 = 0; next2 < 20; next2 += 1) {
            const tmp1 = [];
            for (let move2 = 0; move2 < 5; move2 += 1) {
                tmp1.push((index2 + move2) * 20 + next2);
            }
            lines.push(tmp1);
        }
    }

    // case 3
    for (let index3 = 0; index3 < 16; index3 += 1) {
        for (let next3 = 0; next3 < 16; next3 += 1) {
            const tmp2 = [];
            for (let move3 = 0; move3 < 5; move3 += 1) {
                const value = (index3 + move3) * 20 + move3 + next3;
                tmp2.push(value);
            }
            lines.push(tmp2);
        }
    }

    // case 4
    for (let index4 = 0; index4 < 16; index4 += 1) {
        for (let j = 19; j > 3; j -= 1) {
            const tmp3 = [];
            for (let move4 = 0; move4 < 5; move4 += 1) {
                const value1 = (index4 + move4) * 20 + j - move4;
                tmp3.push(value1);
            }
            lines.push(tmp3);
        }
    }

    for (let index5 = 0; index5 < lines.length; index5 += 1) {
        const [a, b, c, d, e] = lines[index5];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d] && squares[a] === squares[e]) {
            // case 1

            if (b - a === 1) {
                let count = 0;
                const rowA = Math.floor(a / 20);
                const colA = a % 20;
                const rowE = Math.floor(e / 20);
                const colE = e % 20;

                for (let next6 = rowA * 20; next6 < rowA * 20 + colA; next6 += 1) {
                    if (squares[next6] !== squares[a] && squares[next6]) {
                        count += 1;
                        break;
                    }
                }

                for (let next7 = rowE * 20 + colE + 1; next7 < rowE * 20 + 20; next7 += 1) {
                    if (squares[next7] && squares[next7] !== squares[a]) {
                        count += 1;
                        break;
                    }
                }
                if (count <= 1) {
                    return [a, b, c, d, e];
                }
            }

            // case 2
            else if (b - a === 20) {
                const rowA1 = Math.floor(a / 20);
                const rowE1 = Math.floor(e / 20);
                const next9 = a % 20;
                let count1 = 0;
                for (let id = 0; id < rowA1; id += 1) {
                    const idx = id * 20 + next9;
                    if (squares[idx] && squares[idx] !== squares[a]) {
                        count1 += 1;
                        break;
                    }
                }

                for (let id1 = rowE1 + 1; id1 < 20; id1 += 1) {
                    const idx5 = id1 * 20 + next9;
                    if (squares[idx5] && squares[idx5] !== squares[a]) {
                        count1 += 1;
                        break;
                    }
                }
                if (count1 <= 1) return [a, b, c, d, e];

            }

            // case 3

            // end
            else if (b - a === 21) {
                let count2 = 0;
                const rowA4 = Math.floor(a / 20);
                const colA4 = Math.floor(a % 20);
                const rowStart = rowA4 - colA4;

                const rowE4 = Math.floor(a / 20);
                const colE4 = a % 20;
                let start = rowE4 * 20 + colE4;
                for (let j4 = 0; j4 < colA4; j4 += 1) {
                    const value2 = (rowStart + j4) * 20 + j4;
                    if (squares[value2] && squares[value2] !== squares[a]) {
                        count2 += 1;
                        break;
                    }
                }
                for (let id2 = rowE4 + 1; id2 < 20; id2 += 1) {
                    if (squares[start + 21] && squares[start + 21] !== squares[e]) {
                        count2 += 1;
                        break;
                    }
                    start += 21;
                }
                if (count2 <= 1) {
                    return [a, b, c, d, e];
                }
            }


            // case 4
            // b-a=19
            else {
                let count3 = 0;
                const rowA3 = Math.floor(a / 20);
                const colA3 = a % 20;
                const rowE3 = Math.floor(e / 20);
                const colE3 = e % 20;
                const rowStart2 = rowA3 - 20 + colA3;
                let start2 = (rowA3 - 1) * 20 + colA3 + 1;
                for (let next11 = rowA3 - 1; next11 >= rowStart2; next11 -= 1) {
                    if (squares[start2] && squares[a] !== squares[start2]) {
                        count3 += 1;
                        break;
                    }
                    start2 -= 19;
                }

                let rowEnd = 19;
                if (colE3 < (19 - rowE3)) {
                    rowEnd = rowE3 + colE3;
                }
                let end = rowE3 * 20 + colE3 + 19;
                for (let next12 = rowE3 + 1; next12 <= rowEnd; next12 += 1) {
                    if (squares[end] && squares[end] !== squares[e]) {
                        count3 += 1;
                        break;
                    }
                    end += 19;
                }

                if (count3 <= 1) return [a, b, c, d, e];
            }
        }
    }
    return null;
}
