const placeData = [
    {
        name: 'Beginning',
        image: '/Img/Splash.png',
        connections: ['Lone Road'],
    },
    {
        name: 'Lone Road',
        image: '/Img/',
        connections: ['Wide Opening'],
        person: {
            name: 'Highwayman',
            sprite: '/Img/Highwayman.png',
            textlines: [
                "Ah, weary traveler, you've stumbled upon this forsaken realm. The air whispers tales of ancient sorrows and unspeakable horrors. Be cautious, for shadows coil and despair lingers.",
                "Through winding paths and haunted ruins, the secrets of this grim and dark place lie concealed. Its depths hold treasures untold, but danger lurks in every hidden corner.",
                "Survival is a delicate dance in this place, where twisted creatures roam and the very ground seethes with malevolence. Arm yourself, steel your resolve, and embrace the darkness within.",
                "Yet, amidst the gloom, glimmers of hope flicker. Seek out the resilient souls who defy despair, for in their stories lie fragments of redemption and the faintest glimmer of light."
            ]
        }
    },
    {
        name: 'Wide Opening',
        image: '/Img/Valley.png',
        connections: ['Rotten Trail', 'Overgrown Ruins', 'Dim Hollow', 'Lone Road'],
    },
    {
        name: 'Rotten Trail',
        image: '/Img/',
        connections: ['Abandoned Camp', 'Stranger', 'Wide Opening'],

    },
    {
        name: 'Abandoned Camp',
        image: '/Img/',
        connections: ['Mysterious Cave-In', 'Noxious Lake', 'Rotten Trail'],

    },
    {
        name: 'Mysterious Cave-In',
        image: '/Img/',
        connections: ['Winding Creek', 'Noxious Lake', 'Abandoned Camp', 'Stranger'],

    },
    {
        name: 'Noxious Lake',
        image: '/Img/Swamp.png',
        connections: ['Mysterious Cave-In', 'Neglected Viaduct', 'Dim Hollow', 'Abandoned Camp'],

    },
    {
        name: 'Overgrown Ruins',
        image: '/Img/',
        connections: ['Noxious Lake', 'Dim Hollow', 'Wide Opening'],
        person: { name: 'Old Man', sprite: '/Img/Old_Man.png' }
    },
    {
        name: 'Dim Hollow',
        image: '/Img/',
        connections: ['Overgrown Ruins', 'Grim Canyon', 'Noxious Lake', 'Wide Opening'],

    },
    {
        name: 'Grim Canyon',
        image: '/Img/',
        connections: ['Winding Creek', 'Mysterious Cave-In', 'Rotten Trail'],

    },
    {
        name: 'Stranger',
        image: '/Img/',
        connections: ['Neglected Viaduct', 'Stranger'],
        person: {
            name: 'Shady Figure',
            sprite: '/Img/Old_Man.png'
        }
    },
    {
        name: 'Winding Creek',
        image: 'Img/Tree.png',
        connections: ['Dim Hollow', 'Neglected Viaduct'],

    },
    {
        name: 'Neglected Viaduct',
        image: 'Img/Bridge.png',
        connections: ['The Other Side'],
        person: {
            name: 'Specter',
            sprite: '/Img/Specter.png'
        }
    },
    {
        name: 'The Other Side',
        image: '/Img/',
        connections: [],

    },
]

export default placeData;