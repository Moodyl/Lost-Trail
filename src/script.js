import placeData from './places.js'
import { initCamera } from "./camera.js";

document.addEventListener("DOMContentLoaded", function(event) {


//* Global Variables

let timer;
const choiceButtons = [];
let mappedPalmX;
let mappedPalmY;

let currentLocation = {
	name: 'Beginning',
	image: 'Img/Splash.png',
	connections: ['Lone Road']
};


//* Import places

let places = [];

class Place {
	constructor(name, image, connections, person) {
		this.name = name;
		this.image = image;
		this.connections = connections;
		this.person = person;
	}
}

for (let i = 0; i < placeData.length; i++) {
	const { name, image, connections, person } = placeData[i];
	let place = new Place(name, image, connections, person);
	places.push(place);
}



//* Constants

const body = document.querySelector('body');
const indexLink = document.getElementById('index');
const splashScreen = document.getElementById('splash-screen');
const startTrigger = document.getElementById('start-button');

const gameContainer = document.getElementById('game-container');
const placeBG = document.getElementById('bg-img');
const personElement = document.getElementById('person');
const characterName = document.getElementById('charactername');
const textbox = document.getElementById('textbox');



//* Cursor handling

const cursor = document.createElement('div');
cursor.id = 'cursor';
body.appendChild(cursor);



//TODO Delete this once hover logic and click logic is good

document.addEventListener('mousemove', function (event) {

	let x = event.clientX;
	let y = event.clientY;

	cursor.style.left = x + 'px';
	cursor.style.top = y + 'px';

});

// document.addEventListener('contextmenu', function (event) {
//     event.preventDefault();
// });



//* Start and Index buttons

const startRect = startTrigger.getClientRects()[0];
const startTriggerObj = {
	button: startTrigger,
	top: startRect.top,
	right: startRect.right,
	bottom: startRect.bottom,
	left: startRect.left
};

const indexRect = indexLink.getClientRects()[0];
const indexLinkObj = {
	button: indexLink,
	top: indexRect.top,
	right: indexRect.right,
	bottom: indexRect.bottom,
	left: indexRect.left
};

choiceButtons.push(startTriggerObj, indexLinkObj)

console.log(startTriggerObj, indexLinkObj);

startTrigger.addEventListener('handEnter', (event) => {
	console.log('entered event listener handEnter')
	cursorHover(true, startTrigger);
});

// Add event listener for custom handLeave event
startTrigger.addEventListener('handLeave', (event) => {
	console.log('entered event listener handLeave')
	cursorHover(false, startTrigger);
});

startTrigger.addEventListener('click', (event) => {
	splashScreen.style.display = 'none';
	gameContainer.style.display = 'block';
});

// startTrigger.addEventListener('mouseenter', function () { cursorHover(true, this) });
// startTrigger.addEventListener('mouseleave', function () { cursorHover(false, this) });

// indexLink.addEventListener('mouseenter', function () { cursorHover(true, this) });
// indexLink.addEventListener('mouseleave', function () { cursorHover(false, this) });



//* Choice handling and update functions

function choiceHandler(choice) {
	// Handle the player's choice
	const chosenPlace = places.find(place => place.name === choice);
	if (chosenPlace) {
		currentLocation = chosenPlace;
		updatePaths(currentLocation.connections);
		updateBackground(currentLocation.image);
		updatePerson(currentLocation.person);
	}
}

function updatePaths(choiceArray) {
	//Prendi il titolo del luogo corrente e la lista dei luoghi
	const choicesContainer = document.getElementById('choices');
	const title = document.getElementById('title');
	choicesContainer.innerHTML = '';
	title.innerHTML = '— ' + currentLocation.name + ' —';



	//Per ogni percorso fai vedere un bottone
	choiceArray.forEach(choice => {
		let choiceButton = document.createElement('button');
		choiceButton.textContent = choice;
		choiceButton.className = 'path';

		// Add event listener for custom handEnter event
		choiceButton.addEventListener('handEnter', (event) => {
			console.log('entered event listener handEnter')
			cursorHover(true, choiceButton);
		});

		// Add event listener for custom handLeave event
		choiceButton.addEventListener('handLeave', (event) => {
			console.log('entered event listener handLeave')
			cursorHover(false, choiceButton);
		});

		choiceButton.addEventListener('click', (event) => choiceHandler(choice));
		choicesContainer.appendChild(choiceButton);


		//! This works but only for some buttons and idk why
		//! I regret everything

		const choiceRect = choiceButton.getClientRects()[0];
		if (choiceRect) {
			const choiceButtonObj = {
				button: choiceButton,
				top: choiceRect.top,
				right: choiceRect.right,
				bottom: choiceRect.bottom,
				left: choiceRect.left
			};
			choiceButtons.push(choiceButtonObj);
		}
		console.log(choiceRect)
		
	});


}
function updateBackground(background) {
	placeBG.style.backgroundImage = "url(" + background + ")";
}

//TODO add sprite to overview and when hovered over the sprite moves close and dialogue appears

function updatePerson(person) {
	if (person) {
		characterName.style.display = 'block';
		textbox.style.display = 'block';
		personElement.style.display = 'block';

		characterName.innerText = person.name;
		//textboxbox.innerText = printText(person.textlines);
		personElement.style.backgroundImage = "url(" + person.sprite + ")";
	} else {
		characterName.style.display = 'none';
		textbox.style.display = 'none';
		personElement.style.display = 'none';
	}
}

personElement.addEventListener('click', function () {
	personElement.style.width = '800px';
	personElement.style.height = '1200px';
	personElement.style.top = '80%';
	personElement.style.left = '50%';
})

//TODO Print lines

function printText(textlines) {

	// Typewriter effect
	function typeWriterEffect(message, index, currentParagraph, callback) {
		var intervalId = setInterval(function () {
			if (index < message.length) {
				currentParagraph.innerHTML += message.charAt(index);
				index++;
			} else {
				clearInterval(intervalId);
				callback();
			}
		}, 50); // Adjust the typing speed here (in milliseconds)
	}

	// Display NPC messages
	function displayLine(message) {
		textbox.innerHTML += '<p></p>';
		let currentParagraph = textbox.lastElementChild;

		typeWriterEffect(message, 0, currentParagraph, function () {
			textbox.addEventListener('click', handleClick);
		});
	}

	// Handle player input
	function handleClick() {
		textbox.removeEventListener('click', handleClick);
		displayNextMessage();
	}

	// Display next NPC message or finish
	function checkLines() {
		if (npcMessages.length > 0) {
			let nextMessage = npcMessages.shift();
			displayLine(nextMessage);
		} else if (npcMessages.length % 3 == 0) {
			textbox.innerHTML = ''
			displayLine(nextMessage);
		} else {
			textbox.innerHTML += '<p>End of conversation.</p>';
			// All messages displayed

		}
	}

	// Start the conversation
	checkLines();


}


//* First update calls

updateBackground(currentLocation.image);
updatePaths(currentLocation.connections);
updatePerson(currentLocation.person);



//! Camera code --------------------
//! Camera code --------------------
//! Camera code --------------------

// Configurazione dell’elemento video
const videoConfig = { width: 640, height: 480, fps: 60 }

// Configurazione Media Pipe
// https://google.github.io/mediapipe/solutions/hands
const mediaPipeConfig = {
	runtime: "mediapipe",
	modelType: "full",
	maxHands: 2,
	solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands`,
}

const video = document.querySelector("video")
const canvas = document.querySelector("canvas")
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

initCamera(video, videoConfig.width, videoConfig.height, videoConfig.fps).then(video => {
	video.play()
	video.addEventListener("loadeddata", event => { boot() })
})

async function createDetector() {
	return window.handPoseDetection.createDetector(window.handPoseDetection.SupportedModels.MediaPipeHands, mediaPipeConfig)
}

async function boot() {

	const detector = await createDetector()

	requestAnimationFrame(loop)

	async function loop() {

		requestAnimationFrame(loop)

		const hands = await detector.estimateHands(video, { flipHorizontal: true })

		// https://developers.google.com/mediapipe/solutions/vision/hand_landmarker
		for (const hand of hands) {
			const handPoints = {
				pinkyB: hand.keypoints[17],
				indexB: hand.keypoints[5],
				wrist: hand.keypoints[0]
			};

			let palmX = (handPoints.pinkyB.x + handPoints.indexB.x) / 2;
			let palmY = (handPoints.pinkyB.y + handPoints.wrist.y) / 2;

			mappedPalmX = mapValue(palmX, 0, video.width, 0, canvas.width);
			mappedPalmY = mapValue(palmY, 0, video.height, 0, canvas.height);

			cursor.style.left = mappedPalmX + 'px';
			cursor.style.top = mappedPalmY + 'px';

			console.log(mappedPalmX, mappedPalmY)

			choiceButtons.forEach(choiceButtonObj => {

				console.log(mappedPalmX, mappedPalmY)
				console.log(choiceButtons)
				console.log(choiceButtonObj)

				if (
					mappedPalmX > choiceButtonObj.left &&
					mappedPalmX < choiceButtonObj.right &&
					mappedPalmY > choiceButtonObj.top  &&
					mappedPalmY < choiceButtonObj.bottom
				) {
					dispatchCustomEvent(choiceButtonObj.button, 'handEnter', choiceButtonObj)
				} else {
					dispatchCustomEvent(choiceButtonObj.button, 'handLeave', choiceButtonObj)
				}
			});

		}
	}
}

function dispatchCustomEvent(element, eventName, eventData) {
	const event = new CustomEvent(eventName, { detail: eventData });
	element.dispatchEvent(event);
}

function cursorHover(status, target) {

	let duration = 4;

	if (status) {
		console.log('entered cursorHover')
		cursor.style.width = '100px';
		cursor.style.height = '100px';
		cursor.style.backgroundColor = 'transparent';
		cursor.style.border = '1px solid #FB8B24';

		target.style.color = '#FB8B24';
		target.style.border = '1px solid #FB8B24'
		if (!timer) {
			timer = setInterval(updateCountdown, 1000);
		};
	} else {
		cursor.style.width = '20px';
		cursor.style.height = '20px';
		cursor.style.backgroundColor = '#136F63';
		cursor.style.border = 'transparent';

		if (timer) {
			clearInterval(timer);
			timer = undefined; // Reset the timer variable
			duration = 4;
			cursor.innerText = '';
		}
	};

	function updateCountdown() {

		let opacity = 0;

		if (duration < 1) {
			cursor.innerText = '';
			duration = 4;
			clearInterval(timer);
			timer = undefined; // Reset the timer variable
			opacity = 0;
			target.click()
		} else {
			cursor.style.backgroundColor = 'rgba(251, 139, 36, ' + opacity + ')';
			duration--;
			cursor.innerText = duration;
			opacity += 1 / 3;
		}
	}
}

function mapValue(value, inputMin, inputMax, outputMin, outputMax) {
	let inputRange = inputMax - inputMin;
	let outputRange = outputMax - outputMin;
	let normalizedValue = (value - inputMin) / inputRange;
	let mappedValue = (normalizedValue * outputRange) + outputMin;
	return mappedValue;
}

})