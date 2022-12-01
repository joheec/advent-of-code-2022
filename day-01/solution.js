import { readFileSync } from 'fs';

const input = readFileSync('./input.txt', { encoding: 'utf8' });
const elfBags = input.split('\n\n');

function getMaxCalories(numOfElves) {
    if (numOfElves < 1) {
        return 0;
    }

    const maxCalories = elfBags.reduce((tracker, bag) => {
        const calories = bag.split('\n').reduce((total, cal) => Number(total) + Number(cal), 0);
        for (let i = numOfElves - 1; i >= 0; i--) {
            if (calories > tracker[i]) {
                return tracker.slice(1,i+1).concat(calories, tracker.slice(i + 1));
            }
        }
        return tracker;
    }, Array(numOfElves).fill(0))

    return maxCalories.reduce((total, cal) => Number(total) + Number(cal), 0);
}

console.log('Max Calories of 1 elf', getMaxCalories(1));
console.log('Max Calories of 3 elves', getMaxCalories(3));
