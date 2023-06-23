import { placeData } from './places.js'
import { initCamera } from "./camera.js";

document.addEventListener("DOMContentLoaded", function (event) {


	//* Global Variables

	let timer;
	const interactElements = [];
	let mappedPalmX;
	let mappedPalmY;
	let isHandInside = false;
	let conversationOngoing = false;
	let chosenPlace;



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

	getRects(startButton);
	getRects(indexLink);


	function startButtonAggr(event) {

		customClick(true, event.target, function () {
			splashScreen.style.display = 'none';
			splashScreen.style.zIndex = '-1000';
			startButton.style.display = 'none';
			gameContainer.style.display = 'block';

			startButton.removeEventListener('handEnter', startButtonAggr);
		});
	}

	startButton.addEventListener('handEnter', startButtonAggr);

	startButton.addEventListener('handLeave', (event) => {
		customClick(false, event.target);
	});
	startButton.addEventListener('mouseenter', startButtonAggr);
	startButton.addEventListener('mouseleave', (event) => {
		customClick(false, event.target);
	});



	indexLink.addEventListener('handEnter', (event) => {
		customClick(true, event.target)
	});
	indexLink.addEventListener('handLeave', (event) => {
		customClick(false, event.target);
	});
	indexLink.addEventListener('mouseenter', (event) => {
		customClick(true, event.target)
	});
	indexLink.addEventListener('mouseleave', (event) => {
		customClick(false, event.target);
	});

	//* Update upon choice

	function choiceHandler(choice) {
		// Handle the player's choice
		chosenPlace = places.find(place => place.name === choice);
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
		title.innerText = '— ' + currentLocation.name + ' —';

		//Per ogni percorso fai vedere un bottone
		choiceArray.forEach(choice => {
			let choiceButton = document.createElement('button');
			choiceButton.innerText = choice;
			choiceButton.className = 'path';

			choiceButton.addEventListener('handEnter', (event) => {
				console.log(event.target)
				customClick(true, event.target, function () {
					choiceHandler(choiceButton.innerText);
				});
			});

			choiceButton.addEventListener('handLeave', (event) => {
				customClick(false, event.target);
			});

			choiceButton.addEventListener('mouseenter', (event) => {
				console.log(event.target)
				customClick(true, event.target, function () {
					choiceHandler(choiceButton.innerText);
				});
			});

			choiceButton.addEventListener('mouseleave', (event) => {
				customClick(false, event.target);
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

			personElement.style.backgroundImage = "url(" + person.sprite + ")";
			personElement.style.display = 'block';

			getRects(personElement)

			personElement.addEventListener('handEnter', (event) => {
				console.log(event.target)
				customClick(true, event.target, function () {
					characterName.style.display = 'block';
					textbox.style.display = 'block';

					personElement.style.width = '800px';
					personElement.style.height = '1200px';
					personElement.style.top = '80%';
					personElement.style.left = '50%';

					characterName.innerText = person.name;
					printText(person.textlines);
				})
			})

			personElement.addEventListener('handLeave', (event) => {
				console.log(event.target)
				customClick(false, event.target)
			})

			personElement.addEventListener('mouseenter', (event) => {
				if (!conversationOngoing) {
					customClick(true, event.target, function () {
						personElement.removeEventListener('mouseleave', mouseLeaveHandler);
						characterName.style.display = 'block';
						textbox.style.display = 'block';

						personElement.style.width = '800px';
						personElement.style.height = '1200px';
						personElement.style.top = '80%';
						personElement.style.left = '50%';

						characterName.innerText = person.name;
						printText(person.textlines);
						conversationOngoing = true;
					})
				}
			})

			const mouseLeaveHandler = (event) => { customClick(false, event.target) };

			// Add the event listener
			personElement.addEventListener('mouseleave', mouseLeaveHandler);

		} else {
			characterName.style.display = 'none';
			textbox.style.display = 'none';
			personElement.style.display = 'none';
		}

		//* Dialogue Box Logic

		function printText(textlines) {
			// Display next NPC message or finish
			function checkLines() {
				if (textlines.length > 0) {
					let line = textlines.shift();
					displayLine(line);
				} else {
					textbox.innerHTML += '<p>End of conversation.</p>';
					// All messages displayed
					const resetPersonHandler = () => {
						textbox.innerHTML = '';
						characterName.style.display = 'none';
						textbox.style.display = 'none';

						personElement.style.width = '500px';
						personElement.style.height = '500px';
						personElement.style.top = '50%';
						personElement.style.left = '50%';

						conversationOngoing = false;
						chosenPlace.person.encountered = true;

						textbox.removeEventListener('mouseenter', mouseenterHandler);
						textbox.removeEventListener('mouseleave', mouseleaveHandler);
					};

					const mouseenterHandler = (event) => {
						customClick(true, event.target, function () {
							resetPersonHandler()
						});
					};

					const mouseleaveHandler = (event) => {
						customClick(true, event.target);
					};

					textbox.addEventListener('mouseenter', mouseenterHandler);
					textbox.addEventListener('mouseleave', mouseleaveHandler);
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

				let lineContainer;

				if (lineContainer) {
					textbox.removeChild(lineContainer);
				};

				lineContainer = document.createElement('p');
				textbox.appendChild(lineContainer);

				typeWriterEffect(line, 0, lineContainer, function () {
					// Add event listeners after the text has finished typing
					textbox.addEventListener('mouseenter', mouseEnterTextboxHandler);
					textbox.addEventListener('mouseout', mouseOutTextboxHandler);
				});
			}

			function mouseEnterTextboxHandler(event) {
				customClick(true, event.target, removeEvent);
			}

			const mouseOutTextboxHandler = (event) => {
				if (!event.relatedTarget || event.relatedTarget.tagName !== 'p') {
				  customClick(false, event.target);
				}
			  };

			// Handle player input
			function removeEvent() {
				textbox.removeEventListener('mouseenter', mouseEnterTextboxHandler);
				textbox.removeEventListener('mouseout', mouseOutTextboxHandler);
				checkLines();
			}
			checkLines();
		}
	}


	//* First update calls

	updateBackground(currentLocation.image);
	updatePaths(currentLocation.connections);
	updatePerson(currentLocation.person);



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
							dispatchCustomEvent(interactElement.object, 'handEnter');
							isHandInside = true; // Update flag
						}

					} else {

						if (isHandInside) {
							dispatchCustomEvent(interactElement.object, 'handLeave');
							isHandInside = false; // Update flag
						}
					}
				});
			}
		}
	}

	function dispatchCustomEvent(element, eventName) {
		const event = new CustomEvent(eventName);
		element.dispatchEvent(event);
		console.log(eventName, event.target)
	}

	//* Hand Hover and Click

	function customClick(status, target, clickFunction) {

		let duration = 3;
		let opacity = 0;
		const cyans = ['#136F63', '#0B413A', '#072723', '#081211'];
		const yellows = ['#FB8B24', '#9A4F09', '#371E06', '#120D08'];


		if (status) {
			cursor.style.width = '100px';
			cursor.style.height = '100px';
			cursor.style.backgroundColor = 'transparent';
			cursor.style.border = '1px solid ' + yellows[0];

			target.style.color = yellows[0];

			if (target == textbox) {
				target.style.backgroundColor = yellows[2]
				target.style.outline = '3px solid ' + yellows[0];

			} else if (target == personElement) {
				target.style.width = '600px';
				target.style.height = '600px';

			} else {
				target.style.outline = '1px solid ' + yellows[0];
			}

			if (!timer) {
				timer = setInterval(updateCountdown, 1000);
			};
		} else {
			cursor.style.width = '20px';
			cursor.style.height = '20px';
			cursor.style.backgroundColor = cyans[0];
			cursor.style.border = 'transparent';

			target.style.color = cyans[0];

			if (target == textbox) {
				target.style.backgroundColor = cyans[2]
				target.style.outline = '3px solid ' + cyans[0];

			} else if (target == personElement) {
				target.style.width = '500px';
				target.style.height = '500px';

			} else {
				target.style.outline = '1px solid ' + cyans[0];
			}

			if (timer) {
				clearInterval(timer);
				timer = undefined; // Reset the timer variable
				duration = 2;
				cursor.innerText = '';
			}
		};

		//* Countdown HandEnter

		function updateCountdown() {

			console.log('counting down' + duration)

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

	//* Get Collision Elements

	function getRects(element) {
		const elementRects = element.getClientRects();
		if (elementRects.length > 0) {
			const elementRect = elementRects[0];
			const elementObj = {
				object: element,
				rect: elementRect
			};
			interactElements.push(elementObj);
			console.log(elementObj)
		}
	}

})