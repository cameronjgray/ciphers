function findAllIndexes (letter, string) {
    const positions = [];

    const findNextLetter = (letter, startingPos) => {
        if (startingPos >= string.length) {
            return;
        }

        const position = string.indexOf(letter, startingPos);

        if (position >= 0) {
            positions.push(position);
            findNextLetter(letter, position + 1);
        }

        return;
    }
    
    findNextLetter(letter, string);

    return positions;
}

function bookCipher(passage, message) {
    const passageByLines = passage.split("\n");
    let encryptedMessage = "";

    message.split("").forEach(letter => {
        const letterExists = passage.split("").findIndex(passageLetter => letter === passageLetter);
        if (letterExists < 0) {
            encryptedMessage += " " + letter;
            return;
        }

        const allPositionsOfLetter = [];

        passageByLines.forEach((line, lineIndex) => allPositionsOfLetter.push(findAllIndexes(letter, line).map(index => `${lineIndex}:${index}`)));
        
        if (!allPositionsOfLetter.length) {
            encryptedMessage += letter;
            return;
        }

        const filteredAllPositionsOfLetter = allPositionsOfLetter.filter(line => line.length > 0);

        if (!filteredAllPositionsOfLetter.length) {
            encryptedMessage += letter;
            return;
        }

        const randomLine = Math.floor(Math.random() * filteredAllPositionsOfLetter.length);
        const randomPositionIndex = Math.floor(Math.random() * filteredAllPositionsOfLetter[randomLine].length);
        const randomPosition = filteredAllPositionsOfLetter[randomLine][randomPositionIndex];
        
        encryptedMessage += " " + randomPosition;
    });
    
    return encryptedMessage;
}

const passage = 'something is happening. Test test. \nThe quick brown fox jumped over the lazy dog.';
const message = 'cameron';
const encryptedMessage = bookCipher(passage, message);

console.log(encryptedMessage);
