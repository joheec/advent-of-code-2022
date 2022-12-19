import fs from 'fs';

// const input = fs.readFileSync('./input-test-1.txt', 'utf8');
// const input = fs.readFileSync('./input-test-2.txt', 'utf8');
// const input = fs.readFileSync('./input-test-3.txt', 'utf8');
const input = fs.readFileSync('./input.txt', 'utf8');

const assignments = getGroupAssignments(input);
const fullyContainedTotal = assignments.reduce((totalOverlapCount, group) => {
    // return isFullyContained(group) ? totalOverlapCount + 1 : totalOverlapCount
    return isPartiallyContained(group) ? totalOverlapCount + 1 : totalOverlapCount
}, 0);

console.log(fullyContainedTotal);

function getGroupAssignments(input) {
    return input
        .split('\n')
        .map(group => (
            group.split(',').map(assignement => {
                const [ min, max ] = assignement.split('-');
                return { min: Number(min), max: Number(max) };
            })
        ));
}

function isPartiallyContained(group) {
    const { min: minA, max: maxA } = group[0];
    const { min: minB, max: maxB } = group[1];

    if (minA < minB) {
        return maxA >= minB;
    } else if (minA > minB) {
        return minA <= maxB
    } else {
        return true;
    }
}

function isFullyContained(group) {
    const { min: minA, max: maxA } = group[0];
    const { min: minB, max: maxB } = group[1];

    if (minA < minB) {
        return maxB <= maxA;
    } else if (minB < minA) {
        return maxA <= maxB;
    } else {
        return true;
    }
}