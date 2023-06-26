export const placeData = [
	{
		name: 'Beginning',
		image: 'Beginning',
		connections: ['Lone Road']
	},
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
	},
	{
		name: 'Wide Opening',
		image: 'Wide_Opening',
		connections: ['Rotten Trail', 'Overgrown Ruins', 'Void Abyss', 'Lone Road'],
	},
	{
		name: 'Rotten Trail',
		image: 'Rotten_Trail',
		connections: ['Abandoned Camp', 'Hidden Hideout', 'Wide Opening'],
	},
	{
		name: 'Abandoned Camp',
		image: 'Abandoned_Camp',
		connections: ['Mysterious Cave-In', 'Noxious Lake', 'Rotten Trail'],
		person: {
			name: 'Fading Consciousness',
			encountered: false,
			sprite: 'Fading_Consciousness',
			textlines: [
				"Oh... hello. Yes, I'm... I'm here. Just... fading a bit. The world seems to blur around me. It's kind of you to worry, but I fear there's not much that can be done. I'm losing touch with reality, slipping away into the mist of forgotten memories.",
				"Memories... yes, they're slipping away, but... there is one... one memory that remains vivid. It's about a place I used to visit as a child, a peaceful garden with flowers dancing in the wind.",
				"There were roses of every hue, their velvety petals captivating my gaze. Daisies dotted the fields, their cheerful faces always turned toward the sun. And oh, the lilies, their fragrance embraced me like a warm embrace from a loved one.",
				"It was a sanctuary of tranquility, tucked away from the chaos of the world. The scent of blossoms filled the air, and each step was like walking on a cloud. The vibrant colors brought me joy, and the gentle rustling of leaves soothed my troubled mind.",
				"I'm afraid... they're slipping away. Shadows consume the edges of my consciousness, leaving only fragments. But I appreciate your presence, your willingness to listen. It eases the weight of my fading existence.",
				"Cherish the moments you have, and may your path be filled with brighter days. Farewell... and thank you."
			]
		}
	},
	{
		name: 'Mysterious Cave-In',
		image: 'Mysterious_Cave-In',
		connections: ['Winding Creek', 'Noxious Lake', 'Abandoned Camp', 'Hidden Hideout'],
	},
	{
		name: 'Noxious Lake',
		image: 'Noxious_Lake',
		connections: ['Mysterious Cave-In', 'Neglected Viaduct', 'Void Abyss', 'Abandoned Camp'],
	},
	{
		name: 'Overgrown Ruins',
		image: 'Overgrown_Ruins',
		connections: ['Noxious Lake', 'Void Abyss', 'Wide Opening'],
		person: {
			name: 'Old Man',
			encountered: false,
			sprite: 'Old_Man',
			textlines: [
				"Ah, greetings, young traveler! It is rare to see people around. Are you in search of hidden wisdom within nature by any chance?",
                "See that humble plant by your feet? Its delicate leaves and purple flowers hold the essence of chamomile, a herb of tranquility.",
                "It calms the spirit and eases the troubled mind. Its aroma is quite distinct, makes for a fine tea.",
                "Here, if you wish to search for herbs, I happen to have a spare herbarium. You can take it. Good luck on your findings traveler!"
			]
		}
	},
	{
		name: 'Void Abyss',
		image: 'Void_Abyss',
		connections: ['Overgrown Ruins', 'Grim Canyon', 'Noxious Lake', 'Wide Opening'],
		person: {
			name: 'Lake Fairy',
			encountered: false,
			sprite: 'Lake_Fairy',
			textlines: [
				"Ah, greetings, traveler of the land and sea. The Void Abyss... it is a realm where chaos reigns, where the fabric of reality is torn asunder. Within its depths, a tempest of darkness dances with reckless abandon.",
				"Picture a churning ocean, its waves wild and untamed. But instead of water, it is a maelstrom of shattered dreams and forgotten hopes. It is a realm where fragmented realities collide, creating a discordant symphony of confusion and despair.",
				"In the heart of the Void Abyss, where chaos is at its strongest, dwell beings born from the depths of nightmares. They are twisted abominations, amalgamations of fears and regrets. It is a place where the essence of darkness seeps into every crevice, corrupting even the purest of intentions.",
				"The influence of the Void Abyss is far-reaching, its tendrils extending into adjacent worlds. It whispers temptations into the ears of unsuspecting souls, sowing seeds of doubt and chaos. Creatures that venture too close risk becoming lost, their minds consumed by the swirling madness.",
				"I implore you, turn away from its enticing darkness and seek solace in the beauty and serenity of the world you know. For the sake of your own well-being, do not venture further into the treacherous depths of the Void Abyss. May the ocean's vastness and the grace of fish guide you on a safer path, where light and hope prevail."
			]
		}
	},
	{
		name: 'Grim Canyon',
		image: 'Grim_Canyon',
		connections: ['Neglected Viaduct', 'Mysterious Cave-In', 'Hidden Hideout'],
	},
	{
		name: 'Hidden Hideout',
		image: 'Hidden_Hideout',
		connections: ['Neglected Viaduct', 'Grim Canyon'],
		person: {
			name: 'Ominous Cutthroat',
			encountered: false,
			sprite: 'Ominous_Cutthroat',
			textlines: [
				"So, you've noticed my little hideaway, have you? That's a dangerous sight to behold, my friend. It's called hideout for a reason.",
				"Curiosity killed the cat, they say. But I suppose I can share a morsel of my story. I was born into a world of callousness and survival. The shadows became my sanctuary, and the blade my closest companion.",
				"Do I regret it? Ha! Regret is a luxury I can ill afford. In this ruthless world, I've learned to embrace the darkness within and let it guide me. There is power in fear, and power is what keeps me alive.",
				"Redemption... now there's a notion for the naive and the foolish. The path I tread is stained with blood, and it leads only deeper into the abyss. Once you embrace the darkness, there's no turning back. It becomes a part of you, consuming everything else.",
				"Perhaps... once, long ago, there was someone. Someone I held dear. But those ties were severed, lost in the chaos of this life. Trust me, it's better not to have attachments. They only make you weak and foolhardy.",
				"Lillies... What a nice color they have..."
			]
		}
	},
	{
		name: 'Winding Creek',
		image: 'Winding_Creek',
		connections: ['Void Abyss', 'Neglected Viaduct'],
	},
	{
		name: 'Neglected Viaduct',
		image: 'Neglected_Viaduct',
		connections: ['The Other Side', 'Winding Creek'],
		person: {
			name: 'Specter',
			encountered: false,
			sprite: 'Specter',
			textlines: [
				"I am but a specter, a remnant of a tormented soul seeking retribution. My existence is bound to this realm, trapped by the chains of unfinished business and a burning desire for justice.",
				"Long have I awaited the arrival of a hapless soul like yours, seeking the ultimate truth, the final confrontation. But know this, trespasser, there is no turning back from the abyss you now face.",
				"You thought you could absolve yourself of guilt? There is no redemption here, only eternal torment. Your journey ends in this desolate realm, forever haunted by the consequences of your choices.",
				"Betrayal and deceit... the venom that courses through my incorporeal veins. They thought they could extinguish my light, but they underestimated the burning fire of vengeance that consumes me.",
				"As you take your final steps towards oblivion, remember that your choices have led you here. May your soul forever bear the weight of your transgressions. Farewell, mortal, to the darkness that now claims you."
			]
		}
	},
	{
		name: 'The Other Side',
		image: 'The_Other_Side',
		connections: [],

	}
]