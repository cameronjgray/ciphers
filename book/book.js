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

function decryptBookCipher (passage, message) {
    const passageSplit = passage.split("\n");
    const messageSplit = message.split(" ");
    let decryptedMessage = "";

    messageSplit.forEach(letterKey => {
        const letterKeySplit = letterKey.split(":");
        
        if (letterKeySplit.length <= 1){
            decryptedMessage += letterKeySplit[0];
            return;
        }

        const line = letterKeySplit[0];
        const letter = letterKeySplit[1];

        decryptedMessage += passageSplit[line][letter];
    });

    return decryptedMessage;
}

const fileName = process.argv[2];
const message = process.argv[3];
const decrypt = process.argv[4];

if (!fileName || !message) {
    console.error('Please provide a file for encryption and a message to encrypt. Format: node book.js [fileName] [message]');
    return;
}

fs.readFile(fileName, 'utf8', (err, passage) => {
    if (err) {
        console.error(`Failed to open file ${fileName}`);
        return;
    }
    
    if (decrypt === "-d") {
        const decryptedMessage = decryptBookCipher(passage, message);
        console.log(decryptedMessage);
        return;
    }

    const encryptedMessage = bookCipher(passage, message);
    console.log(encryptedMessage);
});
