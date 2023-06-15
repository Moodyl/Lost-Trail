
if (detector && capture.loadedmetadata) {
    const hands = await detector.estimateHands(capture.elt, { flipHorizontal: true })

    for (let j = 0; j < hands.length; j++) {
        const hand = hands[j]
        const handedness = hand.handedness // Left : Right
        const handPoints = {
            pinkyB: hand.keypoints[17],
            indexB: hand.keypoints[5],
            wrist: hand.keypoints[0]
        };

        let palmX = (handPoints.pinkyB.x + handPoints.indexB.x) / 2;
        let palmY = (handPoints.pinkyB.y + handPoints.wrist.y) / 2;

        mappedPalmX = mapValue(palmX, 0, video.width, 0, canvas.width);
		mappedPalmY = mapValue(palmY, 0, video.height, 0, canvas.height);
    }
}
