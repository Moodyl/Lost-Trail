import { initCamera } from "./camera.js"

let mappedPalmX;
let mappedPalmY;

// Configurazione dell’elemento video
const videoConfig = {
	width: 640, height: 480, fps: 60
}

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

initCamera(
	video, videoConfig.width, videoConfig.height, videoConfig.fps
).then(video => {
	video.play()
	video.addEventListener("loadeddata", event => {
		boot()
	})
})

async function createDetector() {
	return window.handPoseDetection.createDetector(window.handPoseDetection.SupportedModels.MediaPipeHands, mediaPipeConfig)
}

async function boot() {

	const detector = await createDetector()

	requestAnimationFrame(loop)

	async function loop() {

		requestAnimationFrame(loop)

		// Stima mani (ogni due frames)
		const hands = await detector.estimateHands(video, { flipHorizontal: true })

		// Mappa dei landmarks della mano:
		// https://developers.google.com/mediapipe/solutions/vision/hand_landmarker
		for (const hand of hands) {
			const handPoints = {
				pinkyB: hand.keypoints[17],
				indexB: hand.keypoints[5],
				wrist: hand.keypoints[0]
			};

			let palmX = (handPoints.pinkyB.x + handPoints.indexB.x) / 2;
			let palmY = (handPoints.pinkyB.y + handPoints.indexB.y) / 2;

			mappedPalmX = mapValue(palmX, 0, video.width, 0, canvas.width);
			mappedPalmY = mapValue(palmY, 0, video.height, 0, canvas.height);

			cursor.style.left = mappedPalmX + 'px';
            cursor.style.top = mappedPalmY + 'px';
			// if (mappedPalmX < 500 && mappedPalmY < 500){
			// 	cursorHover('active') 
			// 	console.log('ready')
			// }

			

		}
	}
}

function mapValue(value, inputMin, inputMax, outputMin, outputMax) {
	var inputRange = inputMax - inputMin;
	var outputRange = outputMax - outputMin;
	var normalizedValue = (value - inputMin) / inputRange;
	var mappedValue = (normalizedValue * outputRange) + outputMin;
	return mappedValue;
}