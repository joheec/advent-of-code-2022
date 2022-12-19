import fs from 'fs';

const GROUP_SIZE = 3;
// const input = fs.readFileSync('./input-test.txt', 'utf8');
// console.log(getTotalPriority(input), 157);
// console.log(getTotalPriority(input, GROUP_SIZE), 70);

const input = fs.readFileSync('./input.txt', 'utf8');
console.log(getTotalPriority(input, GROUP_SIZE));

function getTotalPriority(input, groupSize) {
    const bags = getBags(input);
    const groupBags = getGroupBags(bags, groupSize);

    // return bags.reduce((total, bag) => {
    //     const compartments = getCompartments(bag);
    //     const item = getRepeatedItem(compartments)
    //     const priority = getItemPriority(item);
    //     return total + priority;
    // }, 0);
    
    return groupBags.reduce((total, group) => {
        const item = getRepeatedItem(group)
        const priority = getItemPriority(item);
        return total + priority;
    }, 0);
}

function getBags(input) {
    return input.split('\n');
}

function getCompartments(bag) {
    const size = Math.ceil(bag.length / 2);
    return [bag.slice(0, size), bag.slice(size)];
}

function getGroupBags(bags, groupSize) {
    let groupBags = [];
    let currentBag;

    for (let i = 0; i < bags.length; i++) {
        if (i % groupSize === 0) {
            currentBag = [];
            groupBags.push(currentBag);
        }

        currentBag.push(bags[i]);
    }

    return groupBags;
}

function getRepeatedItem(group) {
    let repeated = group[0].split('');
    for (let i = 1; i < group.length; i++) {
        const map = group[i].split('').reduce((agg, item) => ({ ...agg, [item]: true }), {});
        repeated = repeated.filter(item => map[item]);
    }
    return repeated[0];
}

function getItemPriority(item) {
    const ascii = item.charCodeAt(0);
    return ascii > 90 ? ascii - 96 : ascii - 38;
}
