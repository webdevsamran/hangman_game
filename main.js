const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainEl = document.getElementById('play-again');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard', 'valkyrie'];
let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// Show hidden word
function displayWord() {
    wordEl.innerHTML = `
    ${selectedWord.split('').map(letter=>`<span class="letter">${correctLetters.includes(letter)?letter:''}</span>`).join('')}
    `;
    const innerWord = wordEl.innerText.replace(/\n/g, '');
    // console.log(wordEl.innerText, innerWord);
    if (innerWord === selectedWord) {
        finalMessage.innerText = 'Congratulations! You won!';
        popup.style.display = "flex";
    }
}
// Update the wrong letters
function updateWrongLettersEl() {
    // console.log('Update the wrong letters');
    // Display wrong letters
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length>0?'<p>Wrong</p>':''}
    ${wrongLetters.map(letter=>`<span>${letter}</span>`)}
    `;
    // Display parts
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;
        if (index < errors) {
            part.style.display = "block";
        } else {
            part.style.display = "none";
        }
    });
    // Check if lost
    if (wrongLetters.length == figureParts.length) {
        finalMessage.innerText = 'Unfortunately you lost. ';
        popup.style.display = "flex";
    }
}
// Show notification
function showNotifications() {
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show')
    }, 2000)
}
// Keydown letter press
window.addEventListener('keydown', e => {
    // console.log(e.keyCode);
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;
        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else {
                showNotifications();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLettersEl();
            } else {
                showNotifications();
            }
        }
    }
});
// Restart game and play again
playAgainEl.addEventListener('click', () => {
    correctLetters.splice(0);
    wrongLetters.splice(0);
    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayWord();
    updateWrongLettersEl();
    popup.style.display = "none";
})
displayWord();