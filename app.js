const button = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const startGame = document.querySelector('.btn__reset');
const overlay = document.querySelector('#overlay');
let missed = 0;


// this hides the start screen overlay when the 'start game' button is clicked
startGame.addEventListener('click', () => {
	overlay.style.display = 'none';
});


// this stores a list of phrases in an array
const phrases = [
	'like two peas in a pod',
	'read between the lines',
	'the early bird catches the worm',
	'eat drink and be merry',
	'great minds think alike'
];

// this function creates a random number based on the length of the phrases array
// and then uses that number to select a random phrase in the array
// and splits the randomly selected phrase into a new array of characters
function getRandomPhraseAsArray(arr) {
	const randomNumber = Math.floor( Math.random() * phrases.length);
	// console.log(randomNumber);
	let newPhrase = phrases[randomNumber];
	// console.log(newPhrase);
	const newArray = [...newPhrase];
	// console.log(newArray);
	return newArray;
};
getRandomPhraseAsArray(phrases);


function addPhraseToDisplay(arr) {
	for (let i = 0; i < arr.length; i++) {
		const ul = document.querySelector('#phrase ul');
		const li = document.createElement('li');
		li.textContent = arr[i];
		ul.appendChild(li);
		if (li.textContent === " " ) {
			li.className = 'space';
		} else {
			li.className = 'letter';
		}
	}
};
const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);


function checkLetter(button) {
	const li = document.querySelectorAll('.letter');
	let match = null;
	for (let i = 0; i < li.length; i++) {
		if (li[i].textContent === button.textContent) {
			li[i].classList.add('show');
			match = li[i].textContent;
		}
	}
	return match;
};

button.addEventListener('click', (e) => {
	const buttonClicked = e.target;
	const hearts = document.querySelectorAll('.tries img')
	if (e.target.tagName === 'BUTTON') {
		buttonClicked.className = 'chosen';
		buttonClicked.disabled = true;
		let letterFound = checkLetter(buttonClicked);
		if (letterFound === null) {
			hearts[missed].src = 'images/lostHeart.png';
			missed += 1;
		}
	}
	checkWin();
});

function checkWin() {
	const letter = document.querySelectorAll('.letter');
	const show = document.querySelectorAll('.show');
	if (letter.length === show.length) {
		overlay.className = 'win';
		overlay.firstElementChild.textContent = 'Congrats, you won!';
		overlay.style.display = 'flex';
		startGame.style.display = 'none';
	} else if (missed > 4) {
		overlay.className = 'lose';
		overlay.firstElementChild.textContent = 'Sorry, you lost'
		overlay.style.display = 'flex';
		startGame.style.display = 'none';
	}
};









