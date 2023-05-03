const ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

function caesarCipher (message, offset) {
    let encryptedMessage = '';

    for(let i = 0; i < message.length; i++) {
        const currentLetter = message[i].toUpperCase();
        const letterPos = ALPHABET.findIndex(letter => letter === currentLetter);

        if (letterPos >= 0) {
            let offsetIndex = (letterPos + offset) % ALPHABET.length;

            if (offsetIndex < 0) {
                offsetIndex = ALPHABET.length - Math.abs(offsetIndex);
            }

            encryptedMessage += ALPHABET[offsetIndex];
        }
        else {
            encryptedMessage += ' ';
        }
    }

    return encryptedMessage;
}

const message = process.argv[2];
const offset = parseInt(process.argv[3]);

if (!message || !offset) {
    console.log('message or offset not provided. Format: node caesar.js [message] [offset]');
    return;
}
const encryptedMessage = caesarCipher(message, offset);

console.log(encryptedMessage);
