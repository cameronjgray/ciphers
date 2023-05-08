class Plugboard {
    #settings = null;

    constructor (settings) {
        this.#settings = settings;
    }

    convert (letter) {
        const keysIndex = Object.keys(this.#settings).findIndex(keyLetter => keyLetter === letter);
        const valuesIndex = Object.values(this.#settings).findIndex(valueLetter => valueLetter === letter);

        if (keysIndex >= 0) {
            return Object.values(this.#settings)[keysIndex];
        }
        else if (valuesIndex >=0) {
            return Object.keys(this.#settings)[valuesIndex];
        }
        else {
            return letter;
        }
    }
}

module.exports = Plugboard;
