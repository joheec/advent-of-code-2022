import { count } from 'console';
import fs from 'fs';

// const input = fs.readFileSync('./input-sample.txt', 'utf8');
// const output = 21;
const input = fs.readFileSync('./input-test.txt', 'utf8');
// const input = fs.readFileSync('./input-sample-b.txt', 'utf8');

const trees = getTrees(input);
// console.log(getVisibleTreeCount(trees), 21);
console.log(getMaxScenicScore(trees), 8);

// function getVisibleTreeCount(trees) {
function getMaxScenicScore(trees) {
    const rows = trees.length;
    const columns = trees[0].length;
    // let visibleTreeCount = (rows + columns) * 2 - 4; // trees on edge of grid
    let maxScore = 0;

    for (let r = 1; r < rows - 1; r++) {
        for (let c = 1; c < columns - 1; c++) {
                const treeScore = getTopScore(trees, r, c) * getBottomScore(trees, r, c) * getLeftScore(trees, r, c) * getRightScore(trees, r, c);
                maxScore =  maxScore > treeScore ? maxScore : treeScore;

            // if(
            //     isVisibleTop(trees, r, c)
            //     || isVisibleBottom(trees, r, c)
            //     || isVisibleLeft(trees, r, c)
            //     || isVisisibleRight(trees, r, c)
            // ) {
            //     visibleTreeCount += 1
            // }
        }
    }

    //return visibleTreeCount;
    return maxScore;
}

function getTopScore(trees, row, column) {
    let countTracker = 0;
    for (let r = row - 1; r >= 0; r--) {
        countTracker += 1;
        if (trees[row][column] <= trees[r][column]) {
            return countTracker;
        }
    }

    return countTracker;
}

function getBottomScore(trees, row, column) {
    let countTracker = 0;
    for (let r = row + 1; r < trees.length; r++) {
        countTracker += 1;
        if (trees[row][column] <= trees[r][column]) {
            return countTracker;
        }
    }

    return countTracker;
}

function getLeftScore(trees, row, column) {
    let countTracker = 0;
    for (let c = column - 1; c >= 0; c--) {
        countTracker += 1;
        if(trees[row][column] <= trees[row][c]) {
            return countTracker;
        }
    }

    return countTracker;
}

function getRightScore(trees, row, column) {
    let countTracker = 0;
    for (let c = column + 1; c < trees[0].length; c++) {
        countTracker += 1;
        if(trees[row][column] <= trees[row][c]) {
            return countTracker;
        }
    }

    return countTracker;
}

function getTrees(input) {
    return input.split('\n').map(row => row.split('').map(letter => Number(letter)));
}

// function isVisibleTop(trees, row, column) {
//     for (let r = row - 1; r >= 0; r--) {
//         if (trees[row][column] <= trees[r][column]) {
//             return false;
//         }
//     }
// 
//     return true;
// }
// 
// function isVisibleBottom(trees, row, column) {
//     for (let r = row + 1; r < trees.length; r++) {
//         if (trees[row][column] <= trees[r][column]) {
//             return false;
//         }
//     }
// 
//     return true;
// }
// 
// function isVisibleLeft(trees, row, column) {
//     for (let c = column - 1; c >= 0; c--) {
//         if(trees[row][column] <= trees[row][c]) {
//             return false;
//         }
//     }
// 
//     return true;
// }
// 
// function isVisisibleRight(trees, row, column) {
//     for (let c = column + 1; c < trees[0].length; c++) {
//         if(trees[row][column] <= trees[row][c]) {
//             return false;
//         }
//     }
// 
//     return true;
// }
// 
// function getTrees(input) {
//     return input.split('\n').map(row => row.split('').map(letter => Number(letter)));
// }