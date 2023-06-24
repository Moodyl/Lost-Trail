export const placeData = [
	{
		name: 'Beginning',
		image: 'Beginning',
		connections: ['Lone Road']
	}, {
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
	}, {
		name: 'Wide Opening',
		image: 'Wide_Opening',
		connections: ['Rotten Trail', 'Overgrown Ruins', 'Dim Hollow', 'Lone Road'],
	}, {
		name: 'Rotten Trail',
		image: 'Rotten_Trail',
		connections: ['Abandoned Camp', 'Hidden Hideout', 'Wide Opening'],
	}, {
		name: 'Abandoned Camp',
		image: 'Abandoned_Camp',
		connections: ['Mysterious Cave-In', 'Noxious Lake', 'Rotten Trail'],
		person: {
			name: 'Fading Consciousness',
			encountered: false,
			sprite: 'Fading_Consciousness',
			textlines: [
				"Line 1",
				"Line 2",
				"Line 3",
				"Line 4"
			]
		}
	}, {
		name: 'Mysterious Cave-In',
		image: 'Mysterious_Cave-In',
		connections: ['Winding Creek', 'Noxious Lake', 'Abandoned Camp', 'Hidden Hideout'],
	}, {
		name: 'Noxious Lake',
		image: 'Noxious_Lake',
		connections: ['Mysterious Cave-In', 'Neglected Viaduct', 'Dim Hollow', 'Abandoned Camp'],
		person: {
			name: 'Lake Fairy',
			encountered: false,
			sprite: 'Lake_Fairy',
			textlines: [
				"Line 1",
				"Line 2",
				"Line 3",
				"Line 4"
			]
		}
	}, {
		name: 'Overgrown Ruins',
		image: 'Overgrown_Ruins',
		connections: ['Noxious Lake', 'Dim Hollow', 'Wide Opening'],
		person: {
			name: 'Old Man',
			encountered: false,
			sprite: 'Old_Man',
			textlines: [
				"Line 1",
				"Line 2",
				"Line 3",
				"Line 4"
			]
		}
	}, {
		name: 'Dim Hollow',
		image: 'Dim_Hollow',
		connections: ['Overgrown Ruins', 'Grim Canyon', 'Noxious Lake', 'Wide Opening'],
	}, {
		name: 'Grim Canyon',
		image: 'Grim_Canyon',
		connections: ['Neglected Viaduct', 'Mysterious Cave-In', 'Hidden Hideout'],
	}, {
		name: 'Hidden Hideout',
		image: 'Hidden_Hideout',
		connections: ['Neglected Viaduct', 'Grim Canyon'],
		person: {
			name: 'Fading Consciousness',
			encountered: false,
			sprite: 'Fading_Consciousness',
			textlines: [
				"Line 1",
				"Line 2",
				"Line 3",
				"Line 4"
			]
		}
	}, {
		name: 'Winding Creek',
		image: 'Winding_Creek',
		connections: ['Dim Hollow', 'Neglected Viaduct'],
	}, {
		name: 'Neglected Viaduct',
		image: 'Neglected_Viaduct',
		connections: ['Winding Creek', 'The Other Side'],
		person: {
			name: 'Specter',
			encountered: false,
			sprite: 'Specter',
			textlines: [
				"Line 1",
				"Line 2",
				"Line 3",
				"Line 4"
			]
		}
	}, {
		name: 'The Other Side',
		image: 'The_Other_Side',
		connections: [],

	}
]