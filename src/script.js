import { placeData } from "./places.js";
import { initCamera } from "./camera.js";

//* Global Variables ----------------------------------------
let currentLocation;
let timer;
let interactElements = [];
let mappedPalmX;
let mappedPalmY;
let isHandInside = false;
let inConversation = false;
//const textSpeed = 30;
const cyans = ["#136F63", "#0B413A", "#072723", "#081211"];
const yellows = ["#FB8B24", "#9A4F09", "#371E06", "#120D08"];

document.addEventListener("DOMContentLoaded", function () {
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

	currentLocation = places.find((place) => place.name === "Beginning");

	//* Constants ------------------------------------------------------------
	const body = document.querySelector("body");
	const indexLink = document.getElementById("index");
	const splashScreen = document.getElementById("splash-screen");
	const startButton = document.getElementById("start-button");

	const gameContainer = document.getElementById("game-container");
	const placeBG = document.getElementById("bg-img");
	const choicesContainer = document.getElementById("choices");
	const personElement = document.getElementById("person");
	const characterName = document.getElementById("charactername");
	const textBox = document.getElementById("textbox");

	//* Cursor handling ------------------------------------------------------------
	const cursor = document.createElement("div");
	cursor.id = "cursor";
	body.appendChild(cursor);

	//TODO Delete this once hover logic and click logic is good
	document.addEventListener("mousemove", function (event) {
		let x = event.clientX;
		let y = event.clientY;

		cursor.style.left = x + "px";
		cursor.style.top = y + "px";
	});

	// document.addEventListener('contextmenu', function (event) {
	//     event.preventDefault();
	// });

	//* Start and Index buttons ------------------------------------------------------------
	getRects(startButton);
	getRects(indexLink);

	startButton.addEventListener("mouseenter", function startButtonEnter() {
		customClick(true, startButton, function () {
			splashScreen.style.display = "none";
			splashScreen.style.zIndex = "-1000";
			startButton.style.display = "none";
			gameContainer.style.display = "block";

			styleLeave();

			startButton.removeEventListener("mouseenter", startButtonEnter);
			startButton.removeEventListener("mouseleave", startButtonLeave);
		});
	});
	startButton.addEventListener("mouseleave", startButtonLeave);
	function startButtonLeave() { customClick(false, startButton) }

	indexLink.addEventListener("mouseenter", () => { customClick(true, indexLink) });
	indexLink.addEventListener("mouseleave", () => { customClick(false, indexLink) });

	//* Update on choice ------------------------------------------------------------
	function choiceHandler(choice) {
		// Handle the player's choice

		const chosenPlace = places.find((place) => place.name === choice);
		//const JSONChosenPlace = JSON.stringify(chosenPlace);
		//currentLocation = JSON.parse(JSONChosenPlace)

		currentLocation = chosenPlace;

		if (currentLocation == chosenPlace) {
			updatePaths(currentLocation.connections);
			updateBackground(currentLocation.image);

			if (currentLocation.person) {
				updatePerson(currentLocation.person);
			} else {
				personElement.style.display = "none";
				characterName.style.display = "none";
				textBox.style.display = "none";
			}
		}
	}

	//* Choice updater ------------------------------------------------------------
	function updatePaths(choiceArray) {
		//Prendi il titolo del luogo corrente e la lista dei luoghi
		const title = document.getElementById("title");
		choicesContainer.innerHTML = "";
		title.innerText = "— " + currentLocation.name + " —";

		//Per ogni percorso fai vedere un bottone
		choiceArray.forEach((choice) => {
			let choiceButton = document.createElement("button");
			choiceButton.innerText = choice;
			choiceButton.className = "path";

			choiceButton.addEventListener("mouseenter", () => {
				customClick(true, choiceButton, () => {
					styleLeave();
					choiceHandler(choiceButton.innerText);
				});
			});

			choiceButton.addEventListener("mouseleave", () => {
				customClick(false, choiceButton);
			});

			choicesContainer.appendChild(choiceButton);

			getRects(choiceButton);
		});
	}

	function updateBackground(background) {
		placeBG.style.backgroundImage = "url(src/Img/" + background + ".png)";
	}

	//* Person handling ------------------------------------------------------------

	//! Dio carissimo
	//! Non funziona il passaggio delle textLines voglio morire
	function updatePerson(person) {

		personElement.style.backgroundImage = "url(src/Img/" + person.sprite + ".png)";
		personElement.style.display = "block";
		getRects(personElement);

		characterName.innerText = person.name;

		personElement.addEventListener("mouseenter", function engageConvoEnter() {
			if (!inConversation) {
				customClick(true, personElement, () => {

					inConversation = true;
					personElement.removeEventListener("mouseenter", engageConvoEnter);
					personElement.removeEventListener("mouseleave", engageConvoLeave);

					styleLeave();

					characterName.style.display = "block";

					textBox.style.display = "block";

					personElement.style.width = "800px";
					personElement.style.height = "1200px";
					personElement.style.top = "70%";
					personElement.style.left = "50%";

					choicesContainer.style.display = "none";

					printText(person.textlines);

				});
			}
		});

		personElement.addEventListener("mouseleave", engageConvoLeave);
		function engageConvoLeave() { customClick(false, personElement) }

		//* Dialogue Box Logic ------------------------------------------------------------

		function printText(textLines) {
			console.log(textLines);

			function checkLines() {
				return new Promise(function (resolve, reject) {
					if (textLines.length > 0) {
						console.log(textLines.length);
						let line = textLines.shift();

						resolve(line);
					} else {
						reject();
					}
				});
			}

			function displayLine(line) {
				return new Promise(function (resolve) {
					textBox.innerHTML = "<p>" + line + "</p>"; // Overwrite the textBox

					let lineContainer = document.createElement('p');
					textBox.appendChild(lineContainer);

					resolve(line, 0, lineContainer)
					textBox.addEventListener("mouseenter", function nextEnter() {
						customClick(true, textBox, function () {
							textBox.removeEventListener("mouseenter", nextEnter);
							textBox.removeEventListener("mouseleave", nextLeave);

							updateElementEffects();
							styleLeave();


						});

						function updateElementEffects() {
							textBox.style.backgroundColor = cyans[2];
							textBox.style.color = cyans[0];
							textBox.style.outline = "3px solid " + cyans[0];

							characterName.style.backgroundColor = cyans[0];
							characterName.style.color = cyans[2];
						}
					});
					textBox.addEventListener("mouseleave", nextLeave);
					function nextLeave() { customClick(false, textBox) };
				});
			}

			function parseLetters(line, index, lineContainer) {
				return new Promise(function (resolve) {
					let parseTimer = setInterval(function () {
						if (index < line.length) {
							lineContainer.innerHTML += line.charAt(index);
							index++;
						} else {
							clearInterval(parseTimer);
							resolve()
						}
					}, textSpeed); // Adjust the typing speed here (in milliseconds)
				})
			}


			function endConversation() {

				textBox.innerHTML = "<p>End of conversation.</p>";

				textBox.addEventListener("mouseenter", function endConvoEnter() {
					customClick(true, textBox, function () {
						styleLeave();

						textBox.innerHTML = "";

						characterName.style.display = "none";
						textBox.style.display = "none";

						personElement.style.width = "500px";
						personElement.style.height = "500px";
						personElement.style.top = "50%";
						personElement.style.left = "50%";

						inConversation = false;
						//chosenPlace.person.encountered = true;

						choicesContainer.style.display = "block";

						textBox.removeEventListener("mouseenter", endConvoEnter);
						textBox.removeEventListener("mouseleave", endConvoLeave);
					});
				});

				textBox.addEventListener("mouseleave", endConvoLeave);
				function endConvoLeave() { customClick(false, textBox) }
			}

			checkLines()
				.then(displayLine)
				.then(parseLetters)
				.catch(endConversation);
		}
	}

	//* First update calls ------------------------------------------------------------
	updateBackground(currentLocation.image);
	updatePaths(currentLocation.connections);
	if (currentLocation.person) {
		updatePerson(currentLocation.person);
	} else {
		console.log("no person");
		personElement.style.display = "none";
		characterName.style.display = "none";
		textBox.style.display = "none";
	}

	//! -------------------- Camera interaction code --------------------
	//! -------------------- Camera interaction code --------------------
	//! -------------------- Camera interaction code --------------------

	// Configurazione dell’elemento video
	const videoConfig = { width: 640, height: 480, fps: 60 };

	// Configurazione Media Pipe
	// https://google.github.io/mediapipe/solutions/hands
	const mediaPipeConfig = {
		runtime: "mediapipe",
		modelType: "full",
		maxHands: 2,
		solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands`,
	};

	const video = document.querySelector("video");
	const canvas = document.querySelector("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	initCamera(
		video,
		videoConfig.width,
		videoConfig.height,
		videoConfig.fps
	).then((video) => {
		video.play();
		video.addEventListener("loadeddata", boot);
	});

	async function createDetector() {
		return window.handPoseDetection.createDetector(
			window.handPoseDetection.SupportedModels.MediaPipeHands,
			mediaPipeConfig
		);
	}

	async function boot() {
		const detector = await createDetector();

		requestAnimationFrame(loop);

		async function loop() {
			requestAnimationFrame(loop);

			const hands = await detector.estimateHands(video, {
				flipHorizontal: true,
			});

			// https://developers.google.com/mediapipe/solutions/vision/hand_landmarker
			for (const hand of hands) {
				const handPoints = {
					pinkyB: hand.keypoints[17],
					indexB: hand.keypoints[5],
					wrist: hand.keypoints[0],
				};

				let palmX = (handPoints.pinkyB.x + handPoints.indexB.x) / 2;
				let palmY = (handPoints.pinkyB.y + handPoints.wrist.y) / 2;

				mappedPalmX = mapValue(palmX, 0, video.width, 0, canvas.width);
				mappedPalmY = mapValue(palmY, 0, video.height, 0, canvas.height);

				function mapValue(value, inputMin, inputMax, outputMin, outputMax) {
					let inputRange = inputMax - inputMin;
					let outputRange = outputMax - outputMin;
					let normalizedValue = (value - inputMin) / inputRange;
					let mappedValue = normalizedValue * outputRange + outputMin;
					return mappedValue;
				}

				cursor.style.left = mappedPalmX + "px";
				cursor.style.top = mappedPalmY + "px";

				interactElements.forEach((interactElement) => {
					if (
						mappedPalmX > interactElement.rect.left &&
						mappedPalmX < interactElement.rect.right &&
						mappedPalmY > interactElement.rect.top &&
						mappedPalmY < interactElement.rect.bottom &&
						!isHandInside
					) {
						eventDispatcher(interactElement.object, "mouseenter");
						isHandInside = true; // Update flag
					} else if (isHandInside) {
						eventDispatcher(interactElement.object, "mouseleave");
						isHandInside = false; // Update flag
					}
				});
			}
		}
	}

	//* Custom Event Dispatcher ------------------------------------------------------------
	function eventDispatcher(element, eventName) {
		const event = new Event(eventName);
		element.dispatchEvent(event);
		// console.log(eventName, event.target)
	}

	//* Hand Hover and click ------------------------------------------------------------
	function customClick(status, target, clickFunction) {
		let duration = 2;
		let opacity = 0;

		if (status) {
			//Enter

			if (!timer) {
				timer = setInterval(updateCountdown, 1000);
			}

			styleEnter();

			if (target == textBox) {
				target.style.color = yellows[0];
				target.style.backgroundColor = yellows[2];
				target.style.outline = "3px solid " + yellows[0];

				characterName.style.color = yellows[2];
				characterName.style.backgroundColor = yellows[0];
				characterName.style.outline = "none";
			} else if (target == personElement) {
				target.style.width = "600px";
				target.style.height = "600px";
			} else {
				target.style.color = yellows[0];
				target.style.outline = "1px solid " + yellows[0];
			}
		} else {
			//Leave

			if (timer) {
				clearInterval(timer);
				timer = undefined; // Reset the timer variable
				duration = 2;
				cursor.innerText = "";
			}

			styleLeave();

			if (target == textBox) {
				target.style.color = cyans[0];
				target.style.backgroundColor = cyans[2];
				target.style.outline = "3px solid " + cyans[0];

				characterName.style.color = cyans[2];
				characterName.style.backgroundColor = cyans[0];
				characterName.style.outline = "none";
			} else if (target == personElement) {
				target.style.width = "500px";
				target.style.height = "500px";
			} else {
				target.style.color = cyans[0];
				target.style.outline = "1px solid " + cyans[0];
			}
		}

		//* Countdown HandEnter ----------------------------------------

		function updateCountdown() {
			// console.log('counting down' + duration)

			if (duration >= 1) {
				cursor.innerText = duration;
				cursor.style.backgroundColor = "rgba(251, 139, 36, " + opacity + ")";

				opacity += 1 / 3;
				duration--;
			} else {
				cursor.innerText = "";

				duration = 2;
				opacity = 0;

				clearInterval(timer);
				timer = undefined; // Reset the timer variable

				target.addEventListener("click", clickFunction);
				target.click();
			}
		}
	}

	//* Get Collision Elements ------------------------------------------------------------
	function getRects(element) {
		const elementRects = element.getClientRects();
		if (elementRects.length > 0) {
			const elementRect = elementRects[0];
			const elementObj = {
				object: element,
				rect: elementRect,
			};
			interactElements.push(elementObj);
		}
	}

	//* Mouse styles ------------------------------------------------------------
	function styleEnter() {
		cursor.style.width = "100px";
		cursor.style.height = "100px";
		cursor.style.backgroundColor = "transparent";
		cursor.style.border = "1px solid " + yellows[0];
	}

	function styleLeave() {
		cursor.style.width = "20px";
		cursor.style.height = "20px";
		cursor.style.backgroundColor = cyans[0];
		cursor.style.border = "transparent";
	}
});
