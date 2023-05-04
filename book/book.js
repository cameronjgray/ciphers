const fs = require('fs');

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

const fileName = process.argv[2];
const message = process.argv[3];

if (!fileName || !message) {
    console.error('Please provide a file for encryption and a message to encrypt. Format: node book.js [fileName] [message]');
    return;
}

fs.readFile(`book/${fileName}`, 'utf8', (err, passage) => {
    if (err) {
        console.error(`Failed to open file ${fileName}`);
        return;
    }
    
    const encryptedMessage = bookCipher(passage, message);
    console.log(encryptedMessage);
});
