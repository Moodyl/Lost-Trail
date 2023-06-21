import placeData from './places.js'
import { initCamera } from "./camera.js";

document.addEventListener("DOMContentLoaded", function (event) {


	//* Global Variables

	let timer;
	const interactElements = [];
	let mappedPalmX;
	let mappedPalmY;



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

	let currentLocation = places.find(place => place.name === 'Beginning');


	//* Constants

	const body = document.querySelector('body');
	const indexLink = document.getElementById('index');
	const splashScreen = document.getElementById('splash-screen');
	const startButton = document.getElementById('start-button');

	const gameContainer = document.getElementById('game-container');
	const placeBG = document.getElementById('bg-img');
	const personSprite = document.getElementById('person');
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

	getRects(startButton);
	getRects(indexLink);

	startButton.addEventListener('handEnter', (event) => {
		enterClick(true, event.target, function () {
			splashScreen.style.display = 'none';
			gameContainer.style.display = 'block';
		});
	});

	// Add event listener for custom handLeave event
	startButton.addEventListener('handLeave', (event) => {
		enterClick(false, event.target);
	});

	//* Update upon choice

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

	//* Choice updater

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

			choiceButton.addEventListener('handEnter', (event) => {
				enterClick(true, event.target, choiceHandler(choiceButton.textContent));
			});

			choiceButton.addEventListener('handLeave', (event) => {
				enterClick(false, event.target);
			});

			choicesContainer.appendChild(choiceButton);

			getRects(choiceButton)

		});


	}

	function updateBackground(background) {
		placeBG.style.backgroundImage = "url(" + background + ")";
	}

	//* Person handling

	function updatePerson(person) {
		if (person) {

			personSprite.style.backgroundImage = "url(" + person.sprite + ")";
			personSprite.style.display = 'block';
			personSprite.style.border = '1px solid #136F63';

			getRects(personSprite)

			personSprite.addEventListener('handEnter', (event) => {
				enterClick(true, event.target, function () {
					characterName.style.display = 'block';
					textbox.style.display = 'block';

					personSprite.style.width = '800px';
					personSprite.style.height = '1200px';
					personSprite.style.top = '80%';
					personSprite.style.left = '50%';

					characterName.innerText = person.name;
					printText(person.textlines);
				})
			})

			personSprite.addEventListener('handLeave', (event) => {
				enterClick(false, event.target)
			})

		} else {
			characterName.style.display = 'none';
			textbox.style.display = 'none';
			personSprite.style.display = 'none';
		}

		//* Dialogue Box Logic

		function printText(textlines) {

			// Display next NPC message or finish
			function checkLines() {
				if (textlines.length > 0) {

					let line = textlines.shift();
					displayLine(line);

				} else {

					textbox.innerHTML = '';
					textbox.innerHTML += '<p>End of conversation.</p>';
					// All messages displayed
					const resetPersonHandler = (event) => {
						textbox.innerHTML = '';
						characterName.style.display = 'none';
						textbox.style.display = 'none';

						personSprite.style.width = '500px';
						personSprite.style.height = '500px';
						personSprite.style.top = '50%';
						personSprite.style.left = '50%';

						event.target.removeEventListener('click', resetPersonHandler);
					};

					textbox.addEventListener('click', resetPersonHandler);

				}
			}

			// Typewriter effect
			function typeWriterEffect(line, index, lineContainer, callback) {
				var intervalId = setInterval(function () {
					if (index < line.length) {
						lineContainer.innerHTML += line.charAt(index);
						index++;
					} else {
						clearInterval(intervalId);
						callback();
					}
				}, 40); // Adjust the typing speed here (in milliseconds)
			}

			// Display NPC messages
			function displayLine(line) {
				textbox.innerHTML = ''; // Empty the textbox
				let lineContainer = document.createElement('p');
				textbox.appendChild(lineContainer);

				typeWriterEffect(line, 0, lineContainer, function () {
					textbox.addEventListener('click', eventHandler);
				});
			}

			function eventHandler(event) {
				removeEvent();
				enterClick(true, event.target);
			}

			// Handle player input
			function removeEvent() {
				textbox.removeEventListener('click', eventHandler);
				checkLines();
			}

			checkLines()
		}
	}


	//* First update calls

	updateBackground(currentLocation.image);
	updatePaths(currentLocation.connections);
	updatePerson(currentLocation.person);



	//! -------------------- Camera code --------------------
	//! -------------------- Camera code --------------------
	//! -------------------- Camera code --------------------

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

				interactElements.forEach(interactElement => {

					if (mappedPalmX > interactElement.left &&
						mappedPalmX < interactElement.right &&
						mappedPalmY > interactElement.top &&
						mappedPalmY < interactElement.bottom) {
						dispatchCustomEvent(interactElement.object, 'handEnter', interactElement)
					} else {
						dispatchCustomEvent(interactElement.object, 'handLeave', interactElement)
					}
				});

			}
		}
	}

	function dispatchCustomEvent(element, eventName, eventData) {
		const event = new CustomEvent(eventName, { detail: eventData });
		element.dispatchEvent(event);
		console.log(event)
	}

	//* Hand Hover and Click

	function enterClick(status, target, clickFunction) {

		let duration = 4;
		let opacity = 0;


		if (status) {
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

		//* Countdown HandEnter

		function updateCountdown() {

			console.log('counting down' + duration)

			if (duration < 1) {

				duration--;
				cursor.innerText = duration;
				opacity += 1 / 3;
				cursor.style.backgroundColor = 'rgba(251, 139, 36, ' + opacity + ')';


			} else {

				cursor.innerText = '';

				duration = 4;
				opacity = 0;

				clearInterval(timer);
				timer = undefined; // Reset the timer variable

				target.addEventListener('click', clickFunction)
				target.click()

			}
		}
	}

	//* Get Collision Elements

	function getRects(element) {
		const elementRects = element.getClientRects();
		if (elementRects.length > 0) {
			const elementRect = elementRects[0];
			const elementObj = {
				object: element,
				top: elementRect.top,
				right: elementRect.right,
				bottom: elementRect.bottom,
				left: elementRect.left
			};
			interactElements.push(elementObj);
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