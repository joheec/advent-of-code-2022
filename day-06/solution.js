import fs from 'fs';

const input = fs.readFileSync('./input-0.txt', 'utf8');
// const input = fs.readFileSync('./input-1.txt', 'utf8');
// const input = fs.readFileSync('./input-2.txt', 'utf8');

// const markerLength = 4;
// console.log(getPacket(input), 10);

const markerLength = 14;
//console.log(getPacket(input), 19);
console.log(getPacket(input));

function getPacket(input) {
    for (let i = 0; i < input.length; i++) {
        const testMarker = new Set(input.slice(i, i + markerLength).split(''));
        if (testMarker.size === markerLength) {
            return i + markerLength;
        }
    }
}