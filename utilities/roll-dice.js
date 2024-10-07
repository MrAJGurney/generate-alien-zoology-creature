import { assertIsNumber } from "./asserts.js";

const getRandomWholeNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const rollD10 = () => getRandomWholeNumber(1,10);

export const rollD50 = () => {
    const tensDigit = [
        0, 0,
        10, 10,
        20, 20,
        30, 30,
        40, 40,
        ][rollD10() - 1];
    const onesDigit = rollD10();
    return tensDigit + onesDigit;
}

export const newUniqueD50Roll = previousRolls => {
    if ((new Set(previousRolls)).size >= 50) {
        throw new Error("All results have been rolled.");
    }

    previousRolls.forEach(roll => assertIsNumber(roll));

    let newRoll;

    // this is not a good implementation for generating a new trait, but it is functional and readable
    do {
        newRoll = rollD50();
    } while (previousRolls.includes(newRoll))

    return newRoll;
}
