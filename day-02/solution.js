import { readFileSync } from 'fs';

const getOutcomeScore = (player, opponent) => {
    const scores = {
        rock: {
            rock: 3,
            paper: 0,
            scissor: 6,
        },
        paper: {
            rock: 6,
            paper: 3,
            scissor: 0,
        },
        scissor: {
            rock: 0,
            paper: 6,
            scissor: 3,
        },
    };

    return scores[player][opponent];
};

const getHandScore = (player) => {
    const scores = {
        rock: 1,
        paper: 2,
        scissor: 3,
    };

    return scores[player];
};

const getRoundScore = ({ player, opponent }) => getOutcomeScore(player, opponent) + getHandScore(player);

const getOpponentHand = (hand) => {
    const plays = {
        A: 'rock',
        B: 'paper',
        C: 'scissor',
    };

    return plays[hand];
};

const getPlayerHand = (opponent, outcome) => {
    const plays = {
        rock: {
            X: 'scissor', // lose
            Y: 'rock', // tie
            Z: 'paper', // win
        },
        paper: {
            X: 'rock', // lose
            Y: 'paper', // tie
            Z: 'scissor', // win
        },
        scissor: {
            X: 'paper', // lose
            Y: 'scissor', // tie
            Z: 'rock', // win
        },
    };

    return plays[opponent][outcome];
};

const getGameScore = (input) => {
    const game = input.split('\n').map(r => {
        const round = r.split(' ');
        const opponent = getOpponentHand(round[0]);
        const player = getPlayerHand(opponent, round[1]);

        return { opponent, player };
    });

    return game.reduce((totalScore, round) => totalScore + getRoundScore(round), 0);
};

const inputFiles = { submission: './input.txt', test: './input-test.txt' };

// const input = readFileSync(inputFiles.test, { encoding: 'utf8' });
// console.log(getGameScore(input), 15);
// console.log(getGameScore(input), 12);

const input = readFileSync(inputFiles.submission, { encoding: 'utf8' });
console.log(getGameScore(input));
