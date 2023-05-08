const Rotor = require('./rotor.js');
const Plugboard = require('./plugboard.js');
const rotors = require('./config/rotorConfig.js');
const plugboardConfig = require('./config/plugboardConfig.js');
const ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

class Enigma {
    #firstRotor = null;
    #secondRotor = null;
    #thirdRotor = null;
    #plugboard = null;

    constructor (rotors, plugboard) {
        const thirdRotor = new Rotor(rotors[2], null);
        const secondRotor = new Rotor(rotors[1], thirdRotor);
        const firstRotor = new Rotor(rotors[0], secondRotor);

        this.#firstRotor = firstRotor;
        this.#secondRotor = secondRotor;
        this.#thirdRotor = thirdRotor;
        this.#plugboard = new Plugboard(plugboard);
    }

    enter (letter) {
        let convertedLetter = letter.toUpperCase();
        
        if (!ALPHABET.includes(convertedLetter)) {
            return convertedLetter;
        }

        convertedLetter = this.#plugboard.convert(convertedLetter);
        convertedLetter = this.#firstRotor.getLetter(convertedLetter);
        convertedLetter = this.#secondRotor.getLetter(convertedLetter);
        convertedLetter = this.#thirdRotor.getLetter(convertedLetter);
        convertedLetter = this.#plugboard.convert(convertedLetter);

        this.#firstRotor.increment();

        return convertedLetter;
    }
}

const message = process.argv[2];

if (!message) {
    console.error('No message to encrypt/decrypt has been provided. Format: node enigma.js [message]');
    return;
}

let output = '';
const enigma = new Enigma(rotors, plugboardConfig);

message.split("").forEach(letter => {
    output += enigma.enter(letter);
});

console.log(output);
