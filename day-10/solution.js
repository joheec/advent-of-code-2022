import fs from 'fs';

// const input = fs.readFileSync('./input-test.txt', 'utf8');
const input = fs.readFileSync('./input-submit.txt', 'utf8');
// console.log(getSignalStrength(input), 13140);
const output = fs.readFileSync('./output-test.txt', 'utf8');

console.log(getSprites(input) + '\n');
console.log(output);

function getSprites(input) {
    const columns = 40;
    let currentCycle = 0;
    let spritePosition = 1;
    let image = '';

    input.split('\n').forEach(command => {
        let currentColumn = currentCycle % columns;
        if (currentColumn === 0) {
            image += '\n';
        }

        image += getSpriteImage(currentColumn, spritePosition);

        currentCycle += 1;
        currentColumn = currentCycle % columns;

        if (command.includes('addx')) {
            image += getSpriteImage(currentColumn, spritePosition);
            currentCycle += 1;
            spritePosition += Number(command.split(' ')[1]);
        }
    });

    return image;
}

function getSpriteImage(imageColumn, spritePosition) {
    return imageColumn >= spritePosition - 1 && imageColumn <= spritePosition + 1 ? '#' : '.';
}


function getSignalStrength(input) {
    const initialCycle = 20;
    const cycleIncrements = 40;
    let currentCycle = 0;
    let totalSignal = 0;

    const isAddedStrength = (cycle) => ((cycle - initialCycle) % cycleIncrements === 0);

    input.split('\n').reduce((strength, signal) => {
        currentCycle +=1;

        if (isAddedStrength(currentCycle)) {
            totalSignal += strength * currentCycle;
        }

        if (signal === 'noop') {
            return strength;
        } 

        // if not noop, is addx
        currentCycle += 1;

        if (isAddedStrength(currentCycle)) {
            totalSignal += strength * currentCycle;
        }

        strength += Number(signal.split(' ')[1]);
        return strength;
    }, 1);

    return totalSignal;
}