export const placeData = [
    {
        name: 'Beginning',
        image: 'src/Img/Beginning.png',
        connections: ['Lone Road']
    },
    {
        name: 'Lone Road',
        image: 'src/Img/Lone_Road.png',
        connections: ['Wide Opening'],
        person: {
            name: 'Highwayman',
            encountered: false,
            sprite: 'src/Img/Highwayman.png',
            textlines: [
                "Hey chump, I see you've made it in one piece. It takes some gut to venture further than this, I stand here for some time, it could be days even",
                "I sometimes hear whispers of sorrows and unspeakable horrors carried by the stale air. I fear that I'll be going mad in a while",
                "The secrets you seek are concealed through the winding paths, coated by the fog. I'm sure its vastness holds riches but I wouldn't risk it if I were you.",
                "Survival is a nasty dance in this hole, I saw twisted creatures roaming, hiding in between the shrubbery, I fled the very moment I saw them.",
                "If you're such a fool to face such monstrosities, you should seek the few glimmers of hope that wander the land before us.",
                "Seek fragments of redemption and the faintest glimmer of light in the stories of the resilient, who defy despair. Farewell partner."
            ],
            prompt: 'The Highwayman eyes you suspiciously. How do you respond?'
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
        connections: ['Abandoned Camp', 'Hidden Hideout', 'Wide Opening'],
    },
    {
        name: 'Abandoned Camp',
        image: 'src/Img/Abandoned_Camp.png',
        connections: ['Mysterious Cave-In', 'Noxious Lake', 'Rotten Trail'],
    },
    {
        name: 'Mysterious Cave-In',
        image: 'src/Img/Mysterious_Cave-in.png',
        connections: ['Winding Creek', 'Noxious Lake', 'Abandoned Camp', 'Hidden Hideout'],
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
            encountered: false,
            sprite: 'src/Img/Old_Man.png',
            textlines: [
                "Ah, greetings, young traveler! It is rare to see people around. Are you in search of hidden wisdom within nature by any chance?",
                "See that humble plant by your feet? Its delicate leaves and purple flowers hold the essence of chamomile, a herb of tranquility.",
                "It calms the spirit and eases the troubled mind. Its aroma is quite distinct, makes for a fine tea.",
                "Here, if you wish to search for herbs, I happen to have a spare herbarium. You can take it. Good luck on your findings traveler!"
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
        connections: ['Neglected Viaduct', 'Mysterious Cave-In', 'Hidden Hideout'],
    },
    {
        name: 'Hidden Hideout',
        image: 'src/Img/',
        connections: ['Neglected Viaduct', 'Grim Canyon'],
        person: {
            name: 'Shady Figure',
            encountered: false,
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
        connections: ['Winding Creek', 'The Other Side'],
        person: {
            name: 'Specter',
            encountered: false,
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