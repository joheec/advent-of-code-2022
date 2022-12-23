import fs from 'fs';

// const input = fs.readFileSync('./input-sample.txt', 'utf8');
// const output = 21;
const input = fs.readFileSync('./input-test.txt', 'utf8');

const trees = getTrees(input);
console.log(getVisibleTreeCount(trees), 21);

function getVisibleTreeCount(trees) {
    const rows = trees.length;
    const columns = trees[0].length;
    let visibleTreeCount = (rows + columns) * 2 - 4; // trees on edge of grid

    for (let r = 1; r < rows - 1; r++) {
        for (let c = 1; c < columns - 1; c++) {
            const tree = trees[r][c];
            if(
                isVisibleTop(trees, r, c)
                || isVisibleBottom(trees, r, c)
                || isVisibleLeft(trees, r, c)
                || isVisisibleRight(trees, r, c)
            ) {
                visibleTreeCount += 1
            }
        }
    }

    return visibleTreeCount;
}

function isVisibleTop(trees, row, column) {
    for (let r = row - 1; r >= 0; r--) {
        if (trees[row][column] <= trees[r][column]) {
            return false;
        }
    }

    return true;
}

function isVisibleBottom(trees, row, column) {
    for (let r = row + 1; r < trees.length; r++) {
        if (trees[row][column] <= trees[r][column]) {
            return false;
        }
    }

    return true;
}

function isVisibleLeft(trees, row, column) {
    for (let c = column - 1; c >= 0; c--) {
        if(trees[row][column] <= trees[row][c]) {
            return false;
        }
    }

    return true;
}

function isVisisibleRight(trees, row, column) {
    for (let c = column + 1; c < trees[0].length; c++) {
        if(trees[row][column] <= trees[row][c]) {
            return false;
        }
    }

    return true;
}

function getTrees(input) {
    return input.split('\n').map(row => row.split('').map(letter => Number(letter)));
}