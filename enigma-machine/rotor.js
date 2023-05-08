class Rotor {
    #ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    #firstHalf = [];
    #secondHalf = [];
    #offset = 0;
    #nextRotor = null;

    constructor (startingPosition, nextRotor) {
        this.#offset = startingPosition;
        let i = startingPosition;

        i = this.#setupRotorHalf(i, this.#firstHalf);
        i = this.#setupRotorHalf(i, this.#secondHalf);

        if (nextRotor) {
            this.#nextRotor = nextRotor;
        }
    }

    #setupRotorHalf (startingPosition, rotorHalf) {
        let i = startingPosition;

        while (rotorHalf.length < this.#ALPHABET.length / 2) {
            const letter = this.#ALPHABET[i];

            if (letter) {
                rotorHalf.push(letter);
                i++;
            }
            else {
                rotorHalf.push(this.#ALPHABET[0]);
                i = 1;
            }
        }

        return i;
    }
    
    increment () {
        const newFirstHalf = [this.#secondHalf[0], ...this.#firstHalf.slice(1, this.#firstHalf.length)];
        const newSecondHalf = [...this.#secondHalf.slice(1), this.#firstHalf[this.#firstHalf.length - 1]];

        this.#firstHalf = newFirstHalf;
        this.#secondHalf = newSecondHalf;
        
        this.#offset++;

        if (this.#offset > this.#ALPHABET.length - 1) {
            this.#offset = 0;
            
            if (this.#nextRotor) {
                this.#nextRotor.increment();
            }
        }
    } 

    getLetter (letter) {
        const firstHalfIndex = this.#firstHalf.findIndex(firstHalfLetter => firstHalfLetter === letter);
        const secondHalfIndex = this.#secondHalf.findIndex(secondHalfLetter => secondHalfLetter === letter);

        if (firstHalfIndex >= 0) {
            return this.#secondHalf[firstHalfIndex];
        }
        else if (secondHalfIndex >= 0) {
            return this.#firstHalf[secondHalfIndex];
        }
        else {
            return letter;
        }
    }
}

module.exports = Rotor;
