/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
    let chessboard = []
    for (let i = 0; i < n; i++) {
        let init = []
        for (let j = 0; j < n; j++) {
            init.push('.')
        }
        chessboard.push(init)
    }
    let result = []
    _getSolveNQueens(n, 0)
    return result

    function _getSolveNQueens(n, column) {
        if (column === n) {
            return result.push(chessboard.map(item => item.join('')))
        }
        for (let row = 0; row < n; row++) {
            if (_check(row, column)) {
                chessboard[row][column] = 'Q'
                _getSolveNQueens(n, column + 1)
                chessboard[row][column] = '.'
            }
        }
    }


    // 检查位置 (row, column) 是否可以放置皇后
    function _check(row, column) {
        // 行判断
        for (let i = 0; i < row; i ++) {
            if (chessboard[i][column] === 'Q') {
                return false
            }
        }

        // 列判断
        for (let i = 0; i < column; i ++) {
            if (chessboard[row][i] === 'Q') {
                return false
            }
        }

        // 左上角判断
        let vRow = row - 1, vColumn = column - 1
        for (; vRow >= 0 && vColumn >= 0; vColumn--, vRow--) {
            if (chessboard[vRow][vColumn] === 'Q') {
                return false
            }
        }

        // 右下角判断
        vRow = row + 1, vColumn = column - 1
        for (; vRow < n && vColumn >= 0; vColumn--, vRow++) {
            if (chessboard[vRow][vColumn] === 'Q') {
                return false
            }
        }

        return true
    }
};

console.log(solveNQueens(4))
