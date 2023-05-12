class Rotor {
    #ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    #firstHalf = [];
    #secondHalf = [];
    #offset = 0;
    #nextRotor = null;

    constructor (startingPosition, nextRotor) {
        this.#offset = startingPosition;
        
        let offset = startingPosition;

        for(let i = 0; i < this.#ALPHABET.length; i++) {
            if (this.#firstHalf.length < this.#ALPHABET.length / 2) {
                this.#firstHalf.push(this.#ALPHABET[offset]);
            }
            else {
                this.#secondHalf.push(this.#ALPHABET[offset]);
            }

            offset++;
            
            if(offset === this.#ALPHABET.length) {
                offset = 0;
            }
        }

        if (nextRotor) {
            this.#nextRotor = nextRotor;
        }

        console.log(this.#firstHalf, this.#secondHalf);
    }
    
    increment () {
        const firstHalfDrop = this.#firstHalf[0];
        const secondHalfDrop = this.#secondHalf[this.#secondHalf.length - 1];

        this.#firstHalf = [ ...this.#firstHalf.slice(1), secondHalfDrop ];
        this.#secondHalf = [firstHalfDrop, ...this.#secondHalf.slice(0, this.#secondHalf.length - 1)];
        
        this.#offset += 1;

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
        
        console.log(firstHalfIndex, secondHalfIndex);

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
