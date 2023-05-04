class Rotor {
    #ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    #offset = 0;
    #nextRotor = null;

    constructor (startingPosition, nextRotor) {
        this.#offset = startingPosition;

        if (nextRotor) {
            this.#nextRotor = nextRotor;
        }
    }
    
    increment () {
        const nextPosition = this.#offset + 1;

        if (nextPosition > this.#ALPHABET.length - 1) {
            this.#offset = 0;

            if (this.#nextRotor) {
                this.#nextRotor.increment();
            }
        }
        else {
            this.#offset = nextPosition;
        }
    } 

    getLetter (letter) {
        const letterIndex = this.#ALPHABET.findIndex(alphabetLetter => alphabetLetter === letter);
        const offset = (letterIndex + this.#offset) % this.#ALPHABET.length;

        return this.#ALPHABET[offset];
    }
}

module.exports = Rotor;
