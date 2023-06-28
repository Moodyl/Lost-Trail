SUPSI 2022-23  
Corso d’interaction design, CV427.01  
Docenti: A. Gysin, G. Profeta  

Elaborato 3: Manipolazione

# Lost Trail
Autore: Lauro Gianella  
[Lost Trail](https://moodyl.github.io/Lost-Trail/)

Il progetto consiste in un sito pseudo-videogioco dove si percorre un "labirinto" e si incontrano personaggi a cui parlare.


## Riferimenti progettuali
I riferimenti progettuali per questo progetto è lo stile monocromatico alla Gameboy ed i giochi punta e clicca tipo Monkey Island.


## Design dell’interfaccia e modalità di interazione
L'interfaccia è composta da vari elementi, i principali sono: dei bottoni a bordo schermo per navigare il labirinto, una finestra contenente lo sprite del personaggio nella stanza, una finestra di dialogo che appare in basso quando il personaggio parla. L'interazione è gestita attraverso un hover di 3 secondi, dopodiche avviene un click sull'elemento. (hand detection non ancora implementata)


## Tecnologia utilizzata
Il sito utilizza una sorta di state machine che, grazie ad un array di oggetti che puntano l'uno all'altro, permette di passare da un'oggetto all'altro e recuperare le informazioni che l'oggetto tiene e pubblicarle nel browser.


```js
{
		name: 'Lone Road',
		image: 'Lone_Road',
		connections: ['Wide Opening'],
		person: {
			name: 'Highwayman',
			encountered: false,
			sprite: 'Highwayman',
			textlines: [
				"Hey chump, I see you've made it in one piece. It takes some gut to venture further than this, I stand here for some time, it could be days even.",
				"I sometimes hear whispers of sorrows and unspeakable horrors carried by the stale air. I fear that I'll be going mad in a while.",
				"The secrets you seek are concealed through the winding paths, coated by the fog. I'm sure its vastness holds riches but I wouldn't risk it if I were you.",
				"Survival is a nasty dance in this hole, I saw twisted creatures roaming, hiding in between the shrubbery, I fled the very moment I saw them.",
				"If you're such a fool to face such monstrosities, you should seek the few glimmers of hope that wander the land before us.",
				"Seek fragments of redemption and the faintest glimmer of light in the stories of the resilient, who defy despair. Farewell partner."
			]
		}
}
```

La funzione sottostante permette di copiare l'oggetto scelto e poi fare un update della scena

```js

function choiceHandler(choice) {
		// Handle the player's choice

		const chosenPlace = places.find(Place => Place.name === choice);

		// const JSONChosenPlace = JSON.stringify(chosenPlace);
		// currentLocation = JSON.parse(JSONChosenPlace);

		currentLocation = chosenPlace;

		updatePaths(currentLocation.connections);
		updateBackground(currentLocation.image);
		updatePerson(currentLocation.person);
}

```

Questa parte di codice gestisce l'apparizione delle scelte dell'utente

```js

function updatePaths(choiceArray) {
		//Prendi il titolo del luogo corrente e la lista dei luoghi
		const title = document.getElementById('title');
		choicesContainer.innerHTML = '';
		title.innerText = currentLocation.name;

		//Per ogni percorso fai vedere un bottone
		for (const choice of choiceArray) {
			let choiceButton = document.createElement('button');
			choiceButton.innerText = choice;
			choiceButton.className = 'path';

			getRects(choiceButton)

			choiceButton.addEventListener('handenter', () => {

				customClick(true, choiceButton, function () {
					styleLeave()
					choiceHandler(choiceButton.innerText)
				});
			});

			choiceButton.addEventListener('handleave', () => {
				customClick(false, choiceButton)
			});

			choiceButton.addEventListener('mouseenter', () => {
				customClick(true, choiceButton, function () {
					styleLeave()
					choiceHandler(choiceButton.innerText)
				});
			});

			choiceButton.addEventListener('mouseleave', () => {
				customClick(false, choiceButton)
			});

			choicesContainer.appendChild(choiceButton);
		};


	}


```

L'apparizione occasionale dei personaggi è gestito tramite questa funzione che poi chiama la scrittura dei testi

```js

function updatePerson(person) {
		if (currentLocation.person) {
			personElement.style.backgroundImage = "url(src/Img/" + person.sprite + ".png)";
			personElement.style.display = 'block';

			getRects(personElement)

			characterName.innerText = person.name;

			personElement.addEventListener('handenter', engageConvoEnter);
			personElement.addEventListener('handleave', engageConvoLeave);
			personElement.addEventListener('mouseenter', engageConvoEnter);
			personElement.addEventListener('mouseleave', engageConvoLeave);

			function engageConvoEnter() {
				if (!inConversation) {

					customClick(true, personElement, function () {

						personElement.removeEventListener('handenter', engageConvoEnter);
						personElement.removeEventListener('handleave', engageConvoLeave);
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
			function engageConvoLeave() {

				customClick(false, personElement)
			};
		} else {
			personElement.style.display = 'none';
			characterName.style.display = 'none';
			textbox.style.display = 'none';
		}
	}

```

La scrittura dei testi è gestitia con un effetto typewriter invocato con un setInterval

```js

function printText(textlines) {

		function checkLines() {
			if (textlines.length > 0) {

				let line = textlines.shift();
				displayLine(line);

			} else {

				textbox.innerHTML = '<p>End of conversation.</p>';

				textbox.addEventListener('handenter', endConvoEnter);
				textbox.addEventListener('handleave', endConvoLeave);
				textbox.addEventListener('mouseenter', endConvoEnter);
				textbox.addEventListener('mouseleave', endConvoLeave);

				function endConvoEnter() {

					customClick(true, textbox, function () {

						textbox.removeEventListener('handenter', endConvoEnter);
						textbox.removeEventListener('handleave', endConvoLeave);

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

					});
				}

				function endConvoLeave() {

					customClick(false, textbox)
				};
			}
		}

		function displayLine(line) {

			textbox.innerHTML = ''; // Empty the textbox

			let lineContainer = document.createElement('p');

			textbox.appendChild(lineContainer);

			typeLine(line, 0, lineContainer, function () {
				textbox.addEventListener('handenter', nextEnter);
				textbox.addEventListener('handleave', nextLeave);
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

				textbox.removeEventListener('handenter', nextEnter);
				textbox.removeEventListener('handleave', nextLeave);

				textbox.style.backgroundColor = cyans[2]
				textbox.style.color = cyans[0]
				textbox.style.outline = '3px solid ' + cyans[0]

				characterName.style.backgroundColor = cyans[0]
				characterName.style.color = cyans[2]

				styleLeave();
				checkLines();
			});
		}

		function nextLeave() {

			customClick(false, textbox)
		};

		checkLines();
	}

```

La funzione boot e loop gestiscono i movimenti di mano ed i check 'handenter' e 'handleave' degli elementi e fanno un event dispatch appropriato (non lo fa davvero ma facciamo finta)

```js

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

				const palmX = (handPoints.pinkyB.x + handPoints.indexB.x) / 2;
				const palmY = (handPoints.pinkyB.y + handPoints.wrist.y) / 2;

				mappedPalmX = await mapValue(palmX, 0, video.width, 0, canvas.width);
				mappedPalmY = await mapValue(palmY, 0, video.height, 0, canvas.height);

				function mapValue(value, inputMin, inputMax, outputMin, outputMax) {
					let inputRange = inputMax - inputMin;
					let outputRange = outputMax - outputMin;
					let normalizedValue = (value - inputMin) / inputRange;
					let mappedValue = (normalizedValue * outputRange) + outputMin;
					return mappedValue;
				}

				cursor.style.left = mappedPalmX + 'px';
				cursor.style.top = mappedPalmY + 'px';

				await checkForHands(mappedPalmX, mappedPalmY);
			}
		}
	}

	async function checkForHands() {
		for (const interactElement of interactElements) {
			if (
				mappedPalmX > interactElement.rect.left &&
				mappedPalmX < interactElement.rect.right &&
				mappedPalmY > interactElement.rect.top &&
				mappedPalmY < interactElement.rect.bottom
			) {
				if (!isHandInside) {
					interactElement.object.dispatchEvent(handEnter);
					isHandInside = true; // Update flag
					console.log('hand enter')
				}
			} else {
				if (isHandInside) {
					interactElement.object.dispatchEvent(handLeave);
					isHandInside = false; // Update flag
					console.log('hand leave')
				}
			}
		}
	}
```

La funzione customClick decide che reazione ha l'hover della mano a dipendenza dell'elemento

```js

function customClick(status, target, clickFunction) {

		let duration = 2;
		let opacity;

		if (status) {

			styleEnter();

			if (!timer) { timer = setInterval(updateCountdown, 1000) };

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

			styleLeave();

			if (timer) {
				clearInterval(timer);
				timer = undefined; // Reset the timer variable
				cursor.innerText = '';
			}

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

				opacity = 1 / duration;
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

```

Ogni elemento interagibile va attraverso questa funzione dove mi è possibile ottenere i suoi rect per controllare se la mano ci va all'interno

```js

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

```


## Target e contesto d’uso
Essendo un prodotto dal carattere ludico, il target è qualcuno che vorrebbe provare un'esperienza ludica senza dover spendere soldi.
