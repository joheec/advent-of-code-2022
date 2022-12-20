import fs from 'fs';
import cloneDeep from 'lodash.clonedeep';

// const input = fs.readFileSync('./input-1.txt', 'utf8').split('\n\n');
const input = fs.readFileSync('./input-0.txt', 'utf8').split('\n\n');

const initialStacks = getStacks(input[0]);
const finalStacks = moveCrates(initialStacks, input[1]);
console.log(getTopCrates(finalStacks));

function getStacks(initialStacks) {
    const inputs = initialStacks.split('\n');
    const rows = inputs.slice(0, -1);
    const columnCount = Number(inputs[inputs.length - 1].split(' ').slice(-2)[0]); 
    const columnWidth = 4;

    const stacks = Array(columnCount).fill(0).map(_ => []);

    rows.forEach((row) => {
        for (let i = 0; i < columnCount; ++i) {
            const index = i * columnWidth;
            const crate = row.slice(index, index + columnWidth).split('')[1];
            if (crate !== ' ') {
                stacks[i].push(crate);
            }
        }
    });

    return stacks;
}

function moveCrates(initialStacks, moves) {
    const stacks = cloneDeep(initialStacks);
    const steps = moves.split('\n');
    
    for (let i = 0; i < steps.length; i++) {
        const items = steps[i].split(' ');
        let times = Number(items[1]);
        const initialColumn = Number(items[3] - 1);
        const finalColumn = Number(items[5] - 1);
    
        // move one crate at a time
        // while(times > 0) {
        //     const crate = stacks[initialColumn].shift();
        //     stacks[finalColumn] = [crate, ...stacks[finalColumn]];
        //     times -= 1;
        // }

        // move number of crates at a time
        const crates = stacks[initialColumn].splice(0, times);
        stacks[finalColumn] = [...crates, ...stacks[finalColumn]];
    }

    return stacks;
}

function getTopCrates(stacks) {
    return stacks.reduce((tops, stack) => tops+stack[0], '');
}