class Plugboard {
    #settings = null;

    constructor (settings) {
        this.#settings = settings;
    }

    convert (letter) {
        const convertedLetter = this.#settings[letter];

        return convertedLetter ?? letter;
    }
}

module.exports = Plugboard;
