import { placeData } from './places.js'
import { initCamera } from "./camera.js";

document.addEventListener("DOMContentLoaded", function () {


	//* Global Variables ----------------------------------------
	let timer;
	const interactElements = [];
	let mappedPalmX;
	let mappedPalmY;
	let isHandInside = false;
	let inConversation = false;
	let textSpeed = 25;
	const cyans = ['#136F63', '#0B413A', '#072723', '#081211'];
	const yellows = ['#FB8B24', '#9A4F09', '#371E06', '#120D08'];

	const mouseenter = new Event('mouseenter');
	const mouseleave = new Event('mouseleave');



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
	const choicesContainer = document.getElementById('choices');
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

	function startButtonEnter() {
		customClick(true, startButton, function () {
			splashScreen.style.display = 'none';
			splashScreen.style.zIndex = '-1000';
			startButton.style.display = 'none';
			gameContainer.style.display = 'block';

			styleLeave()

			startButton.removeEventListener('mouseenter', startButtonEnter);
			startButton.removeEventListener('mouseleave', startButtonLeave);
		});
	}
	function startButtonLeave() { customClick(false, startButton) };

	indexLink.addEventListener('mouseenter', () => { customClick(true, indexLink) });
	indexLink.addEventListener('mouseleave', () => { customClick(false, indexLink) });



	//* Update on choice ----------------------------------------
	function choiceHandler(choice) {
		// Handle the player's choice

		const chosenPlace = places.find(Place => Place.name === choice);

		
		const JSONChosenPlace = JSON.stringify(chosenPlace);
		currentLocation = JSON.parse(JSONChosenPlace);
		
		console.log(chosenPlace, JSONChosenPlace, currentLocation)
		
		updatePaths(currentLocation.connections);
		updateBackground(currentLocation.image);

		if (currentLocation.person) {
			updatePerson(currentLocation.person);
			console.log(currentLocation.person)
		} else {
			personElement.style.display = 'none';
			characterName.style.display = 'none';
			textbox.style.display = 'none';
		}
	}

	//* Choice updater ----------------------------------------
	function updatePaths(choiceArray) {
		//Prendi il titolo del luogo corrente e la lista dei luoghi
		const title = document.getElementById('title');
		choicesContainer.innerHTML = '';
		title.innerText = currentLocation.name;

		//Per ogni percorso fai vedere un bottone
		choiceArray.forEach(choice => {
			let choiceButton = document.createElement('button');
			choiceButton.innerText = choice;
			choiceButton.className = 'path';

			choiceButton.addEventListener('mouseenter', () => {
				customClick(true, choiceButton, function () {
					styleLeave()
					choiceHandler(choiceButton.innerText)
				});
			});

			choiceButton.addEventListener('mouseleave', () => { customClick(false, choiceButton) });

			choicesContainer.appendChild(choiceButton);

			getRects(choiceButton)
		});


	}

	function updateBackground(background) {
		placeBG.style.backgroundImage = "url(src/Img/" + background + ".png)";
	}

	//* Person handling ----------------------------------------

	
	function updatePerson(person) {

		console.log(person)
		personElement.style.backgroundImage = "url(src/Img/" + person.sprite + ".png)";
		personElement.style.display = 'block';
		getRects(personElement)

		characterName.innerText = person.name;

		personElement.addEventListener('mouseenter', engageConvoEnter);
		personElement.addEventListener('mouseleave', engageConvoLeave);

		function engageConvoEnter() {
			if (!inConversation) {

				customClick(true, personElement, function () {

					personElement.removeEventListener('mouseenter', engageConvoEnter);
					personElement.removeEventListener('mouseleave', engageConvoLeave);

					styleLeave()

					characterName.style.display = 'block';

					textbox.style.display = 'block';

					personElement.style.width = '800px';
					personElement.style.height = '1200px';
					personElement.style.top = '70%';
					personElement.style.left = '50%';

					choicesContainer.style.display = 'none';

					printText(person.textlines);
					inConversation = true;
				});
			}
		};
		function engageConvoLeave() { customClick(false, personElement) };
	}
	//* Dialogue Box Logic ----------------------------------------
	//! Dio carissimo
	//! Non funziona il passaggio delle textlines voglio morire
	//TODO FAR FUNZIONARE STA COSA
	
	function printText(textlines) {

		console.log(textlines)

		function checkLines() {
			if (textlines.length > 0) {

				let line = textlines.shift();
				displayLine(line);

			} else {

				textbox.innerHTML = '<p>End of conversation.</p>';

				textbox.addEventListener('mouseenter', endConvoEnter);
				textbox.addEventListener('mouseleave', endConvoLeave);

				function endConvoEnter() {
					customClick(true, textbox, function () {

						characterName.style.display = 'none';
						textbox.style.display = 'none';

						choicesContainer.style.display = 'block';

						styleLeave()

						personElement.style.width = '500px';
						personElement.style.height = '500px';
						personElement.style.top = '50%';
						personElement.style.left = '50%';

						inConversation = false;
						chosenPlace.person.encountered = true;


						textbox.removeEventListener('mouseenter', endConvoEnter);
						textbox.removeEventListener('mouseleave', endConvoLeave);
					});
				}

				function endConvoLeave() { customClick(false, textbox) };
			}
		}

		function displayLine(line) {

			console.log(line)

			textbox.innerHTML = ''; // Empty the textbox

			let lineContainer = document.createElement('p');

			textbox.appendChild(lineContainer);

			typeLine(line, 0, lineContainer, function () {
				textbox.addEventListener('mouseenter', nextEnter);
				textbox.addEventListener('mouseleave', nextLeave);
			});
		}

		function typeLine(line, index, lineContainer, callback) {
			var intervalId = setInterval(function () {
				if (index < line.length) {
					lineContainer.innerHTML += line.charAt(index);
					index++;
				} else {
					clearInterval(intervalId);
					callback();
				}
			}, textSpeed); // Adjust the typing speed here (in milliseconds)
		}


		function nextEnter() {
			customClick(true, textbox, function () {

				textbox.removeEventListener('mouseenter', nextEnter);
				textbox.removeEventListener('mouseleave', nextLeave);

				textbox.style.backgroundColor = cyans[2]
				textbox.style.color = cyans[0]
				textbox.style.outline = '3px solid ' + cyans[0]

				characterName.style.backgroundColor = cyans[0]
				characterName.style.color = cyans[2]

				styleLeave();
				checkLines();
			});
		}

		function nextLeave() { customClick(false, textbox) };

		checkLines();
	}

	//* First update calls ----------------------------------------
	updateBackground(currentLocation.image);
	updatePaths(currentLocation.connections);
	if (currentLocation.person) {
		updatePerson(currentLocation.person)
	} else {
		console.log('no person')
		personElement.style.display = 'none';
		characterName.style.display = 'none';
		textbox.style.display = 'none';
	}


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

	initCamera(video, videoConfig.width, videoConfig.height, videoConfig.fps)
	.then(video => {
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
						mappedPalmY < interactElement.rect.bottom &&
						!isHandInside) {

							interactElement.object.dispatchEvent(mouseenter)
							isHandInside = true; // Update flag
							styleEnter()
							

					} else if (isHandInside) {

							interactElement.object.dispatchEvent(mouseleave)
							isHandInside = false; // Update flag
							styleLeave()
					}
				});
			}
		}
	}

	//* Hand Hover and click ----------------------------------------
	function customClick(status, target, clickFunction) {

		let duration = 2;
		let opacity = 0;

		if (status) {

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
	
			if (duration >= 1) {
	
				cursor.innerText = duration;
				cursor.style.backgroundColor = 'rgba(251, 139, 36, ' + opacity + ')';
	
				opacity += 1 / 3;
				duration--;
	
			} else {
	
				cursor.innerText = '';
	
				duration = 2;
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