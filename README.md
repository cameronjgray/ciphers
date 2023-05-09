# Ciphers :lock:
This project is an investigation into different ciphers and writing them in Node. This project is just for general interest and who doesn't want to feel like a spy? :sunglasses:

OMZ KAG IADW AGF ITMF FTUE EMKE?

## Substitution Ciphers
These ciphers are the most simple. We have a simple Caesar Cipher and then a Caesar Cipher with a key.

### Caesar Cipher
For this cipher a message is provided along with an offset. The offset can be negative or positive and shifts the alphabet one way or another. If you were encrypting the letter "A" with an offset of 5 then it would shift along to "F", "B" would shift along to "G" and so on. To decrypt this you would then provide the encrypted message and negative 5.

It's not a very secure cipher as letters will always be encoded with the same letter. This means you can see where double letters are which is something that could be exploited to break the cipher. The simple Caesar Cipher is also very weak to brute force attacks as there are only 26 possibilities.

An say I encrypted the message "I don't like sand. It's coarse, and rough, and irritating, and it gets everywhere." with an offset of 12. It would look something like this:

```
U PAZ F XUWQ EMZP UF E OAMDEQ MZP DAGST MZP UDDUFMFUZS MZP UF SQFE QHQDKITQDQ
```
A very important message to send of course.

### Caesar Cipher with key
This version of a Caesar Cipher is a vast improvement on the original. Here a key is provided along with the message and the offset. The key should not have any duplicate letters. It is then placed at the start of the alphabet with all the letters in it removed from the alphabet. So if the key is "something" then the alphabet used to encrypt would look like this:
`SOMETHINGABCDFJKLPQRUVWXYZ`. This makes it much hard to brute force without having the key.

## Book Cipher 
To use a Book Cipher a passage is provided along with the message you want to encrypt. The passage should contain all the letters used in the message you want to encrypt. Then for each letter in the message the algorithm will find that letter in the passage and return it's position in the format [line:position]. A slightly stronger way of doing it (and the one implemented here) is to randomise the position of duplicate letters. Say that you have to encrypt the letter "t" twice. Then it would make the encryption stronger to use two different "t"s in the passage. The strength of this cipher is really dependant on the provided passage.

Say the message I want to encrypt is "Ciphers are cool" and I use this passage:

```
Did you ever hear the tragedy of Darth Plagueis The Wise? I thought not. 
It’s not a story the Jedi would tell you. It’s a Sith legend. Darth Plagueis 
was a Dark Lord of the Sith, so powerful and so wise he could use the Force 
to influence the midichlorians to create life… He had such a knowledge of the 
dark side that he could even keep the ones he cared about from dying. The dark 
side of the Force is a pathway to many abilities some consider to be unnatural. 
He became so powerful… the only thing he was afraid of was losing his power, 
which eventually, of course, he did. Unfortunately, he taught his apprentice 
everything he knew, then his apprentice killed him in his sleep. Ironic. 
He could save others from death, but not himself
```
This would become:
```
6:5 7:33 8:30 0:61 2:21 3:35 6:57 4:9 8:29 5:14 5:10 9:13 3:21 7:22 0:69 6:20
```
These ciphers have commonly used a bible verse in the past. The longer the passage the stronger the encryption but the longer it takes to decrypt at the other end. Maybe best to just use `book.js` with the `-d` flag! :wink:

## Enigma Machine
This is a virtual version of the Enigma machine that was used in WW2 by the Germans and that Alan Turing and his team managed to crack. With it being such an important piece of computer history I wanted to try and re-create one.

The machine has 2 parts: the rotors and the plugboard. When a letter is pressed it goes through the plugboard, then through the rotors and then back through the plugboard. The rotors are just simple substiution ciphers and the plugboard is just 10 letter pairs that swap one letter for another. Despite all this the level of encryption is pretty staggering for the time.

I built the machine using classes and modelled it after the real life one but in theory you could give it as many rotors as you want! The data structure I used for the rotors was a linked list but other than that the machine is pretty straight forward.

Note: there is currently a small issue with longer strings being passed to the machine due to the incrementation of the rotors but I'm working on it :sweat_smile:

Happy Encrypting!
