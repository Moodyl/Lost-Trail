const placeData = [
    {
        name: 'Beginning',
        image: 'src/Img/Beginning.png',
        connections: ['Lone Road']
    },
    {
        name: 'Lone Road',
        image: 'src/Img/',
        connections: ['Wide Opening'],
        person: {
            name: 'Highwayman',
            sprite: 'src/Img/Highwayman.png',
            textlines: [
                "Ah, weary traveler, you've stumbled upon this forsaken realm. The air whispers tales of ancient sorrows and unspeakable horrors. Be cautious, for shadows coil and despair lingers.",
                "Through winding paths and haunted ruins, the secrets of this grim and dark place lie concealed. Its vastness hold treasures untold, but danger lurks in every hidden corner.",
                "Survival is a delicate dance in this place, where twisted creatures roam and the very ground seethes with malevolence. Arm yourself, steel your resolve, and embrace the darkness within.",
                "Yet, amidst the gloom, glimmers of hope flicker. Seek out the resilient souls who defy despair, for in their stories lie fragments of redemption and the faintest glimmer of light."
            ]
        }
    },
    {
        name: 'Wide Opening',
        image: 'src/Img/Valley.png',
        connections: ['Rotten Trail', 'Overgrown Ruins', 'Dim Hollow', 'Lone Road'],
    },
    {
        name: 'Rotten Trail',
        image: 'src/Img/Rotten_Trail.png',
        connections: ['Abandoned Camp', 'Stranger', 'Wide Opening'],

    },
    {
        name: 'Abandoned Camp',
        image: 'src/Img/Abandoned_Camp.png',
        connections: ['Mysterious Cave-In', 'Noxious Lake', 'Rotten Trail'],

    },
    {
        name: 'Mysterious Cave-In',
        image: 'src/Img/Mysterious_Cave-in.png',
        connections: ['Winding Creek', 'Noxious Lake', 'Abandoned Camp', 'Stranger'],

    },
    {
        name: 'Noxious Lake',
        image: 'src/Img/Swamp.png',
        connections: ['Mysterious Cave-In', 'Neglected Viaduct', 'Dim Hollow', 'Abandoned Camp'],

    },
    {
        name: 'Overgrown Ruins',
        image: 'src/Img/Overgrown_Ruins.png',
        connections: ['Noxious Lake', 'Dim Hollow', 'Wide Opening'],
        person: {
            name: 'Old Man',
            sprite: 'src/Img/Old_Man.png',
            textlines: [
                "Ah, weary traveler, you've stumbled upon this forsaken realm. The air whispers tales of ancient sorrows and unspeakable horrors. Be cautious, for shadows coil and despair lingers.",
                "Through winding paths and haunted ruins, the secrets of this grim and dark place lie concealed. Its depths hold treasures untold, but danger lurks in every hidden corner.",
                "Survival is a delicate dance in this place, where twisted creatures roam and the very ground seethes with malevolence. Arm yourself, steel your resolve, and embrace the darkness within.",
                "Yet, amidst the gloom, glimmers of hope flicker. Seek out the resilient souls who defy despair, for in their stories lie fragments of redemption and the faintest glimmer of light."
            ]
        }
    },
    {
        name: 'Dim Hollow',
        image: 'src/Img/',
        connections: ['Overgrown Ruins', 'Grim Canyon', 'Noxious Lake', 'Wide Opening'],

    },
    {
        name: 'Grim Canyon',
        image: 'src/Img/',
        connections: ['Winding Creek', 'Mysterious Cave-In', 'Rotten Trail'],

    },
    {
        name: 'Stranger',
        image: 'src/Img/',
        connections: ['Neglected Viaduct', 'Stranger'],
        person: {
            name: 'Shady Figure',
            sprite: 'src/Img/Old_Man.png',
            textlines: [
                "Ah, weary traveler, you've stumbled upon this forsaken realm. The air whispers tales of ancient sorrows and unspeakable horrors. Be cautious, for shadows coil and despair lingers.",
                "Through winding paths and haunted ruins, the secrets of this grim and dark place lie concealed. Its depths hold treasures untold, but danger lurks in every hidden corner.",
                "Survival is a delicate dance in this place, where twisted creatures roam and the very ground seethes with malevolence. Arm yourself, steel your resolve, and embrace the darkness within.",
                "Yet, amidst the gloom, glimmers of hope flicker. Seek out the resilient souls who defy despair, for in their stories lie fragments of redemption and the faintest glimmer of light."
            ]
        }
    },
    {
        name: 'Winding Creek',
        image: 'src/Img/Tree.png',
        connections: ['Dim Hollow', 'Neglected Viaduct'],

    },
    {
        name: 'Neglected Viaduct',
        image: 'src/Img/Bridge.png',
        connections: ['The Other Side'],
        person: {
            name: 'Specter',
            sprite: 'src/Img/Specter.png',
            textlines: [
                "Ah, weary traveler, you've stumbled upon this forsaken realm. The air whispers tales of ancient sorrows and unspeakable horrors. Be cautious, for shadows coil and despair lingers.",
                "Through winding paths and haunted ruins, the secrets of this grim and dark place lie concealed. Its depths hold treasures untold, but danger lurks in every hidden corner.",
                "Survival is a delicate dance in this place, where twisted creatures roam and the very ground seethes with malevolence. Arm yourself, steel your resolve, and embrace the darkness within.",
                "Yet, amidst the gloom, glimmers of hope flicker. Seek out the resilient souls who defy despair, for in their stories lie fragments of redemption and the faintest glimmer of light."
            ]
        }
    },
    {
        name: 'The Other Side',
        image: 'src/Img/The_Other_Side.png',
        connections: [],

    },
]

export default placeData;