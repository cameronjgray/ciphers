const ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

function keywordCipher (message, offset, alphabet) {
    let encryptedMessage = '';

    for(let i = 0; i < message.length; i++) {
        const currentLetter = message[i].toUpperCase();
        const letterPos = alphabet.findIndex(letter => letter === currentLetter);

        if (letterPos >= 0) {
            let offsetIndex = (letterPos + offset) % alphabet.length;

            if (offsetIndex < 0) {
                offsetIndex = alphabet.length - Math.abs(offsetIndex);
            }

            encryptedMessage += alphabet[offsetIndex];
        }
        else {
            encryptedMessage += ' ';
        }
    }

    return encryptedMessage;
}

function hasRepeatLetters(keyword) {
    return keyword.split("").some((letter, index, string) => {
        return string.lastIndexOf(letter) !== index;
    });
}

function rearrangeAlphabet (keyword) {
    if (!keyword) {
        console.log('No keyword provided, using regular alphabet');
        return ALPHABET;
    }
    
    const keywordHasRepeatLetters = hasRepeatLetters(keyword);

    if (keywordHasRepeatLetters) {
        console.log('Key invalid due to repeat letters, using regular alphabet');
        return ALPHABET;
    }
    
    const rearrangedAlphabet = [...keyword.split("")];

    ALPHABET.forEach(letter => {
        const letterExistsInKeyword = keyword.indexOf(letter);
        
        if(letterExistsInKeyword < 0) {
            rearrangedAlphabet.push(letter);
        } 
    });
    
    return rearrangedAlphabet;
}

const message = process.argv[2];
const offset = parseInt(process.argv[3]);
const keyword = process.argv[4];

if (!message || !offset) {
    console.log('message or offset not provided. Format: node keyword.js [message] [offset] [keyword]');
    return;
}

const alphabet = rearrangeAlphabet(keyword?.toUpperCase());

const encryptedMessage = keywordCipher(message, offset, alphabet);

console.log(encryptedMessage);
