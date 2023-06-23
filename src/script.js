import { placeData } from './places.js'
import { initCamera } from "./camera.js";

document.addEventListener("DOMContentLoaded", function () {


	//* Global Variables ----------------------------------------

	let timer;
	const interactElements = [];
	let mappedPalmX;
	let mappedPalmY;
	let isHandInside = false;
	let conversationOngoing = false;
	let chosenPlace;
	let lineContainer;
	let textSpeed = 30;
	const cyans = ['#136F63', '#0B413A', '#072723', '#081211'];
	const yellows = ['#FB8B24', '#9A4F09', '#371E06', '#120D08'];



	//* Import places ----------------------------------------

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


	//* Constants ----------------------------------------

	const body = document.querySelector('body');
	const indexLink = document.getElementById('index');
	const splashScreen = document.getElementById('splash-screen');
	const startButton = document.getElementById('start-button');

	const gameContainer = document.getElementById('game-container');
	const placeBG = document.getElementById('bg-img');
	const personElement = document.getElementById('person');
	const characterName = document.getElementById('charactername');
	const textbox = document.getElementById('textbox');



	//* Cursor handling ----------------------------------------

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



	//* Start and Index buttons --------------------

	getRects(startButton);
	getRects(indexLink);

	startButton.addEventListener('mouseenter', startButtonEnter);
	startButton.addEventListener('mouseleave', startButtonLeave)

	function startButtonEnter(event) {
		customClick(true, event.target, function () {
			splashScreen.style.display = 'none';
			splashScreen.style.zIndex = '-1000';
			startButton.style.display = 'none';
			gameContainer.style.display = 'block';

			styleLeave()

			startButton.removeEventListener('mouseenter', startButtonEnter);
			startButton.removeEventListener('mouseleave', startButtonLeave);
		});
	}
	function startButtonLeave(event) {
		customClick(false, event.target);
	};

	indexLink.addEventListener('mouseenter', (event) => {
		customClick(true, event.target)
	});
	indexLink.addEventListener('mouseleave', (event) => {
		customClick(false, event.target);
	});

	//* Update on choice ----------------------------------------

	function choiceHandler(choice) {
		// Handle the player's choice
		chosenPlace = places.find(place => place.name === choice);
		console.log('previous location ' + currentLocation.name)
		currentLocation = chosenPlace;

		updatePaths(currentLocation.connections);
		updateBackground(currentLocation.image);

		if (currentLocation.person) {
			
			console.log('previous person ' + currentLocation.person.name)
			updatePerson(currentLocation.person)

			console.log('current person ' + currentLocation.person.name)
			console.log('current location ' + currentLocation.name)
		} else {
			characterName.style.display = 'none';
			textbox.style.display = 'none';
			personElement.style.display = 'none';
		}
	}

	//* Choice updater ----------------------------------------

	function updatePaths(choiceArray) {
		//Prendi il titolo del luogo corrente e la lista dei luoghi
		const choicesContainer = document.getElementById('choices');
		const title = document.getElementById('title');
		choicesContainer.innerHTML = '';
		title.innerText = '— ' + currentLocation.name + ' —';

		//Per ogni percorso fai vedere un bottone
		choiceArray.forEach(choice => {
			let choiceButton = document.createElement('button');
			choiceButton.innerText = choice;
			choiceButton.className = 'path';

			// choiceButton.addEventListener('handEnter', (event) => {
			// 	console.log(event.target)
			// 	customClick(true, event.target, function () {
			// 		choiceHandler(choiceButton.innerText);
			// 	});
			// });

			// choiceButton.addEventListener('handLeave', (event) => {
			// 	customClick(false, event.target);
			// });

			choiceButton.addEventListener('mouseenter', (event) => {
				// console.log(event.target)
				customClick(true, event.target, function () {
					styleLeave()
					choiceHandler(choiceButton.innerText);
				});
			});

			choiceButton.addEventListener('mouseleave', (event) => { customClick(false, event.target) });

			choicesContainer.appendChild(choiceButton);

			getRects(choiceButton)
		});


	}

	function updateBackground(background) {
		placeBG.style.backgroundImage = "url(src/Img/" + background + ".png)";
	}

	//* Person handling ----------------------------------------

	function updatePerson(currentPerson) {
		console.log(currentPerson)

		personElement.style.backgroundImage = "url(src/Img/" + currentPerson.sprite + ".png)";
		personElement.style.display = 'block';

		characterName.innerText = currentPerson.name;

		personElement.addEventListener('mouseenter', engageConvoEnter);
		personElement.addEventListener('mouseleave', engageConvoLeave);

		function engageConvoEnter(event) {
			if (!conversationOngoing) {
				customClick(true, event.target, function () {
					console.log(currentPerson)
					personElement.removeEventListener('mouseenter', engageConvoEnter);
					personElement.removeEventListener('mouseleave', engageConvoLeave);

					styleLeave()

					characterName.style.display = 'block';

					textbox.style.display = 'block';

					personElement.style.width = '800px';
					personElement.style.height = '1200px';
					personElement.style.top = '80%';
					personElement.style.left = '50%';

					printText(currentPerson.textlines);
					conversationOngoing = true;
				});
			}
		};

		function engageConvoLeave(event) { customClick(false, event.target) };

		getRects(personElement)

		//* Dialogue Box Logic ----------------------------------------

		function printText(currentTextlines) {

			console.log(currentTextlines)

			function checkLines() {
				if (currentTextlines.length > 0) {
					let line = currentTextlines.shift();
					displayLine(line);

				} else {
					// All messages displayed
					textbox.innerHTML += '<p>End of conversation.</p>';

					textbox.addEventListener('mouseenter', endConvoEnter);
					textbox.addEventListener('mouseleave', endConvoLeave);

					function endConvoEnter(event) {
						customClick(true, event.target, function () {

							characterName.style.display = 'none';
							textbox.style.display = 'none';

							styleLeave()

							personElement.style.width = '500px';
							personElement.style.height = '500px';
							personElement.style.top = '50%';
							personElement.style.left = '50%';

							conversationOngoing = false;
							chosenPlace.person.encountered = true;

							textbox.removeEventListener('mouseenter', endConvoEnter);
							textbox.removeEventListener('mouseleave', endConvoLeave);
						});
					}
					function endConvoLeave(event) { customClick(false, event.target) };
				}
			}

			function typeWriterEffect(line, index, lineContainer, callback) {
				let timerType = setInterval(function () {
					if (index < line.length) {
						lineContainer.innerHTML += line.charAt(index);
						index++;
					} else { clearInterval(timerType), callback() }
				}, textSpeed); // Adjust the typing speed here (in milliseconds)
			}

			function displayLine(line) {

				if (lineContainer) { 
					lineContainer = ''
					lineContainer.remove()
				}
				lineContainer = document.createElement('p');
				textbox.appendChild(lineContainer);

				typeWriterEffect(line, 0, lineContainer, function () {
					textbox.addEventListener('mouseenter', nextEnter);
					textbox.addEventListener('mouseleave', nextLeave);
				});
			}

			function nextEnter(event) {
				customClick(true, event.target, function () {
					removeEvents()
					textbox.style.backgroundColor = cyans[2]
					textbox.style.color = cyans[0]
					textbox.style.outline = '3px solid ' + cyans[0]

					characterName.style.backgroundColor = cyans[0]
					characterName.style.color = cyans[2]

					styleLeave()
				});
			}

			function nextLeave(event) {
				customClick(false, event.target);
			};

			// Handle player input
			function removeEvents() {
				textbox.removeEventListener('mouseenter', nextEnter);
				textbox.removeEventListener('mouseleave', nextLeave);

				checkLines();
			}
			checkLines();
		}
	}


	//* First update calls ----------------------------------------

	updateBackground(currentLocation.image);
	updatePaths(currentLocation.connections);


	//! -------------------- Camera interaction code --------------------
	//! -------------------- Camera interaction code --------------------
	//! -------------------- Camera interaction code --------------------

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
		video.addEventListener("loadeddata", boot)
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

				function mapValue(value, inputMin, inputMax, outputMin, outputMax) {
					let inputRange = inputMax - inputMin;
					let outputRange = outputMax - outputMin;
					let normalizedValue = (value - inputMin) / inputRange;
					let mappedValue = (normalizedValue * outputRange) + outputMin;
					return mappedValue;
				}

				cursor.style.left = mappedPalmX + 'px';
				cursor.style.top = mappedPalmY + 'px';

				interactElements.forEach(interactElement => {

					if (mappedPalmX > interactElement.rect.left &&
						mappedPalmX < interactElement.rect.right &&
						mappedPalmY > interactElement.rect.top &&
						mappedPalmY < interactElement.rect.bottom) {

						if (!isHandInside) {
							eventDispatcher(interactElement.object, 'handEnter');
							isHandInside = true; // Update flag
						}

					} else {

						if (isHandInside) {
							eventDispatcher(interactElement.object, 'handLeave');
							isHandInside = false; // Update flag
						}
					}
				});
			}
		}
	}

	//* Custom Event Dispatcher ----------------------------------------
	function eventDispatcher(element, eventName) {
		const event = new CustomEvent(eventName);
		element.dispatchEvent(event);
		// console.log(eventName, event.target)
	}

	//* Hand Hover and click ----------------------------------------

	function customClick(status, target, clickFunction) {

		let duration = 3;
		let opacity = 0;


		if (status) { //Enter

			if (!timer) { timer = setInterval(updateCountdown, 1000) };

			styleEnter();

			if (target == textbox) {
				target.style.color = yellows[0];
				target.style.backgroundColor = yellows[2]
				target.style.outline = '3px solid ' + yellows[0]

				characterName.style.color = yellows[2];
				characterName.style.backgroundColor = yellows[0]
				characterName.style.outline = 'none';

			} else if (target == personElement) {
				target.style.width = '600px';
				target.style.height = '600px';

			} else {
				target.style.color = yellows[0];
				target.style.outline = '1px solid ' + yellows[0];
			}

		} else { //Leave

			if (timer) {
				clearInterval(timer);
				timer = undefined; // Reset the timer variable
				duration = 2;
				cursor.innerText = '';
			}

			styleLeave();


			if (target == textbox) {
				target.style.color = cyans[0];
				target.style.backgroundColor = cyans[2]
				target.style.outline = '3px solid ' + cyans[0];

				characterName.style.color = cyans[2];
				characterName.style.backgroundColor = cyans[0]
				characterName.style.outline = 'none';

			} else if (target == personElement) {
				target.style.width = '500px';
				target.style.height = '500px';

			} else {
				target.style.color = cyans[0];
				target.style.outline = '1px solid ' + cyans[0];
			}

		};

		//* Countdown HandEnter ----------------------------------------

		function updateCountdown() {

			// console.log('counting down' + duration)

			if (duration >= 1) {

				cursor.innerText = duration;
				cursor.style.backgroundColor = 'rgba(251, 139, 36, ' + opacity + ')';

				opacity += 1 / 3;
				duration--;

			} else {

				cursor.innerText = '';

				duration = 3;
				opacity = 0;

				clearInterval(timer);
				timer = undefined; // Reset the timer variable

				target.addEventListener('click', clickFunction)
				target.click()

			}
		}
	}

	//* Get Collision Elements ----------------------------------------

	function getRects(element) {
		const elementRects = element.getClientRects();
		if (elementRects.length > 0) {
			const elementRect = elementRects[0];
			const elementObj = {
				object: element,
				rect: elementRect
			};
			interactElements.push(elementObj);
			// console.log(elementObj)
		}
	}

	//* Mouse styles ----------------------------------------

	function styleEnter() {
		cursor.style.width = '100px';
		cursor.style.height = '100px';
		cursor.style.backgroundColor = 'transparent';
		cursor.style.border = '1px solid ' + yellows[0];
	}

	function styleLeave() {
		cursor.style.width = '20px';
		cursor.style.height = '20px';
		cursor.style.backgroundColor = cyans[0];
		cursor.style.border = 'transparent';
	}

})