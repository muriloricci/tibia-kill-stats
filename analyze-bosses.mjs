import fs from 'node:fs/promises';
import jsesc from 'jsesc';

const readKillStats = async (filePath) => {
	const json = await fs.readFile(filePath);
	const object = JSON.parse(json);
	const entries = Object.entries(object);
	const map = new Map(entries);
	return map;
};

const GLOBAL_TOTAL_KILLS = await readKillStats(
	'./data/_global-total/kills.json'
);

const BOSSES_PER_CATEGORY = new Map([

	/* Official boss categories as per the in-game Bosstiary. */

	['nemesis-boss', new Set([
		'Alptramun',
		'Anmothra',
		'Arachir the Ancient One',
		'Arthom The Hunter',
		'Bane Lord',
		'Barbaria',
		'Battlemaster Zunzu',
		'Big Boss Trolliver',
		'Burster',
		'Captain Jones',
		'Chikhaton',
		'Chizzoron the Distorter',
		'Countess Sorrow',
		'Cublarc the Plunderer',
		'Devovorga',
		'Dharalion',
		'Diblis the Fair',
		'Dracola',
		'Dreadful Disruptor',
		'Dreadmaw',
		'Elvira Hammerthrust',
		'Feroxa',
		'Ferumbras Mortal Shell',
		'Ferumbras',
		'Flamecaller Zazrak',
		'Fleabringer',
		'Foreman Kneebiter',
		'Furyosa',
		'Gaz\'haragoth',
		'General Murius',
		'Ghazbaran',
		'Goshnar\'s Megalomania',
		'Grand Mother Foulscale',
		'Grandfather Tridian',
		'Gravelord Oshuran',
		'Groam',
		'Grorlam',
		'Hairman the Huge',
		'Hatebreeder',
		'High Templar Cobrass',
		'Hirintror',
		'Horestis',
		'Irahsae',
		'Izcandar Champion of Summer',
		'Izcandar Champion of Winter',
		'Izcandar the Banished',
		'Jesse the Wicked',
		'King Chuck',
		'Lizard Gate Guardian',
		'Mahatheb',
		'Malofur Mangrinder',
		'Man in the Cave',
		'Massacre',
		'Maxxenius',
		'Morgaroth',
		'Mornenion',
		'Morshabaal',
		'Mr. Punish',
		'Ocyakao',
		'Omrafir',
		'Oodok Witchmaster',
		'Orshabaal',
		'Phrodomo',
		'Plagueroot',
		'Raxias',
		'Robby the Reckless',
		'Rotworm Queen',
		'Rukor Zad',
		'Shlorg',
		'Sir Valorcrest',
		'Smuggler Baron Silvertoe',
		'Teneshpar',
		'The Abomination',
		'The Big Bad One',
		'The Blightfather',
		'The Evil Eye',
		'The First Dragon',
		'The Frog Prince',
		'The Handmaiden',
		'The Hungerer',
		'The Imperor',
		'The Last Lore Keeper',
		'The Manhunter',
		'The Mean Masher',
		'The Mutated Pumpkin',
		'The Old Whopper',
		'The Pale Count',
		'The Percht Queen',
		'The Plasmother',
		'The Voice Of Ruin',
		'The Welter',
		'Tyrn',
		'Tzumrah The Dazzler',
		'Warlord Ruzad',
		'White Pale',
		'Willi Wasp',
		'World Devourer',
		'Xenia',
		'Yaga the Crone',
		'Yakchal',
		'Zarabustor',
		'Zevelon Duskbringer',
		'Zomba',
		'Zulazza the Corruptor',
		'Zushuka',
	])],

	['archfoe-boss', new Set([
		'Abyssador',
		'Amenef the Burning',
		'Ancient Spawn Of Morgathla',
		'Anomaly',
		'Bibby Bloodbath',
		'Black Vixen',
		'Bloodback',
		'Brain Head',
		'Brokul',
		'Count Vlarkorth',
		'Darkfang',
		'Deathstrike',
		'Drume',
		'Duke Krule',
		'Earl Osam',
		'Ekatrix',
		'Eradicator',
		'Essence Of Malice',
		'Faceless Bane',
		'Gelidrazah the Frozen',
		'Ghulosh',
		'Gnomevil',
		'Gorzindel',
		'Goshnar\'s Cruelty',
		'Goshnar\'s Greed',
		'Goshnar\'s Hatred',
		'Goshnar\'s Malice',
		'Goshnar\'s Spite',
		'Grand Master Oberon',
		'Irgix the Flimsy',
		'Kalyassa',
		'Katex Blood Tongue',
		'King Zelos',
		'Kusuma',
		'Lady Tenebris',
		'Lloyd',
		'Lokathmor',
		'Lord Azaram',
		'Lord of the Elements',
		'Lord Retro',
		'Magma Bubble',
		'Mawhawk',
		'Mazoran',
		'Mazzinor',
		'Megasylvan Yselda',
		'Melting Frozen Horror',
		'Neferi the Spy',
		'Outburst',
		'Owin',
		'Plagirath',
		'Ragiaz',
		'Raging Mage',
		'Ratmiral Blackwhiskers',
		'Ravenous Hunger',
		'Razzagorn',
		'Realityquake',
		'Rupture',
		'Scarlett Etzel',
		'Shadowpelt',
		'Sharpclaw',
		'Shulgrax',
		'Sir Baeloc',
		'Sir Nictros',
		'Sister Hetai',
		'Soul of Dragonking Zyrtarch',
		'Srezz Yellow Eyes',
		'Tarbaz',
		'Tazhadur',
		'Tentugly',
		'Thaian',
		'The Blazing Rose',
		'The Brainstealer',
		'The Diamond Blossom',
		'The Dread Maiden',
		'The Enraged Thorn Knight',
		'The False God',
		'The Fear Feaster',
		'The Flaming Orchid',
		'The Lily of Night',
		'The Mega Magmaoid',
		'The Moonlight Aster',
		'The Nightmare Beast',
		'The Pale Worm',
		'The Sandking',
		'The Scourge Of Oblivion',
		'The Souldespoiler',
		'The Source Of Corruption',
		'The Time Guardian',
		'The Unarmored Voidborn',
		'The Unwelcome',
		'The Winter Bloom',
		'Timira the Many-Headed',
		'Unaz the Mean',
		'Urmahlullu The Weakened',
		'Utua Stone Sting',
		'Vok the Freakish',
		'Yirkas Blue Scales',
		'Zamulosh',
		'Zorvorax',
	])],

	['bane-boss', new Set([
		'Annihilon',
		'Arthei',
		'Ashmunrah',
		'Black Knight',
		'Boogey',
		'Boreth',
		'Bragrumol',
		'Bullwark',
		'Chopper',
		'Custodian',
		'Dazed Leaf Golem',
		'Death Priest Shargon',
		'Deep Terror',
		'Dipthrah',
		'Dirtbeard',
		'Diseased Bill',
		'Diseased Dan',
		'Diseased Fred',
		'Doctor Perhaps',
		'Enusat the Onyx Wing',
		'Evil Mastermind',
		'Fleshslicer',
		'Gaffir',
		'Glitterscale',
		'Glooth Fairy',
		'Golgordan',
		'Grand Canon Dominus',
		'Grand Chaplain Gaunder',
		'Grand Commander Soeren',
		'Guard Captain Quaid',
		'Hellgorak',
		'Heoni',
		'Jailer',
		'Jaul',
		'Kroazur',
		'Latrivan',
		'Lersatio',
		'Lisa',
		'Mad Mage',
		'Madareth',
		'Mahrdis',
		'Marziel',
		'Maw',
		'Mephiles',
		'Mindmasher',
		'Monstor',
		'Morguthis',
		'Mozradek',
		'Obujos',
		'Omruc',
		'Preceptor Lazare',
		'Professor Maxxen',
		'Rahemos',
		'Rotspit',
		'Shadowstalker',
		'Tanjis',
		'Thalas',
		'Thawing Dragon Lord',
		'The Baron From Below',
		'The Count Of The Core',
		'The Duke Of The Depths',
		'The Lord of the Lice',
		'The Ravager',
		'The Shatterer',
		'Ushuriel',
		'Vashresamun',
		'Xogixath',
		'Zugurosh',
	])],

	/* Custom Nemesis subcategories. */

	// The subset of Nemesis bosses that spawn randomly and thus require
	// boss checks, or that are exceptionally rare (e.g. Ferumbras, Devovorga).
	// Bosses that have a 2-week cooldown, Dream Courts mini-bosses, and most
	// bosses that can be predictably found during an announced raid are
	// excluded from this list.
	['hard-nemesis-boss', new Set([
		'Arachir the Ancient One',
		'Arthom The Hunter',
		'Barbaria',
		'Battlemaster Zunzu',
		'Big Boss Trolliver',
		'Burster',
		'Captain Jones',
		'Countess Sorrow',
		'Devovorga',
		'Dharalion',
		'Diblis the Fair',
		'Dracola',
		'Dreadful Disruptor',
		'Dreadmaw',
		'Elvira Hammerthrust',
		'Ferumbras',
		'Flamecaller Zazrak',
		'Fleabringer',
		'Foreman Kneebiter',
		'Furyosa',
		'General Murius',
		'Ghazbaran',
		'Grand Mother Foulscale',
		'Grandfather Tridian',
		'Gravelord Oshuran',
		'Groam',
		'Grorlam',
		'Hairman the Huge',
		'Hatebreeder',
		'High Templar Cobrass',
		'Hirintror',
		'Horestis',
		'Jesse the Wicked',
		'Mahatheb',
		'Man in the Cave',
		'Massacre',
		'Morgaroth',
		'Mornenion',
		'Morshabaal',
		'Mr. Punish',
		'Ocyakao',
		'Omrafir',
		'Oodok Witchmaster',
		'Orshabaal',
		'Robby the Reckless',
		'Rotworm Queen',
		'Rukor Zad',
		'Shlorg',
		'Sir Valorcrest',
		'Smuggler Baron Silvertoe',
		'The Abomination',
		'The Big Bad One',
		'The Evil Eye',
		'The Frog Prince',
		'The Handmaiden',
		'The Hungerer',
		'The Imperor',
		'The Manhunter',
		'The Mean Masher',
		'The Old Whopper',
		'The Pale Count',
		'The Plasmother',
		'The Voice Of Ruin',
		'The Welter',
		'Tyrn',
		'Tzumrah The Dazzler',
		'Warlord Ruzad',
		'White Pale',
		'Willi Wasp',
		'Xenia',
		'Yaga the Crone',
		'Yakchal',
		'Zarabustor',
		'Zevelon Duskbringer',
		'Zushuka',
	])],

	['poi-boss', new Set([
		'Countess Sorrow',
		'Dracola',
		'Massacre',
		'Mr. Punish',
		'The Handmaiden',
		'The Imperor',
		'The Plasmother',
	])],

	['hive-underground-boss', new Set([
		'Chopper',
		'Fleshslicer',
		'Maw',
		'Mindmasher',
		'Rotspit',
		'Shadowstalker',
	])],

	['hive-outpost-boss', new Set([
		'The Hungerer',
		'The Manhunter',
		'The Mean Masher',
	])],

	['hod-nemesis-boss', new Set([
		'Burster',
		'Dreadful Disruptor',
	])],

	['bank-robbery-boss', new Set([
		'Elvira Hammerthrust',
		'Jesse the Wicked',
		'Mornenion',
		'Robby the Reckless',
	])],

	['vampire-lord-nemesis-boss', new Set([
		// Note: Armenius is not a boss.
		'Arachir the Ancient One',
		'Diblis the Fair',
		'Sir Valorcrest',
		'The Pale Count',
		'Zevelon Duskbringer',
	])],

	['dream-courts-nemesis-boss', new Set([
		'Alptramun',
		'Izcandar Champion of Summer',
		'Izcandar Champion of Winter',
		'Izcandar the Banished',
		'Malofur Mangrinder',
		'Maxxenius',
		'Plagueroot',
	])],

	/* Other custom categories. */

	// TODO: Dark Trails bosses
	// TODO: Diseased bosses
	// TODO: Ferumbras Ascension mini + final bosses
	// TODO: HoD mini + final bosses
	// TODO: Blood Brothers bosses
	// TODO: Inquisition bosses
	// TODO: Kilmaresh bosses
	// TODO: Pharaohs
	// TODO: Secret library bosses
	// TODO: Soul Wars mini + final bosses
	// TODO: Thais / Forgotten Knowledge bosses
	// TODO: Grave Danger bosses
	// TODO: Cults bosses
	// TODO: Vengoth mini + final bosses
	// TODO: Port Hope flimsy bosses
	// TODO: Falcon Bastion mini bosses + Oberon
	// TODO: Cobra Bastion mini bosses + Scarlett
	// TODO: Mini asura bosses
	// TODO: True asura bosses

]);

// All bosses.
BOSSES_PER_CATEGORY.set('boss', new Set([
	...BOSSES_PER_CATEGORY.get('nemesis-boss'),
	...BOSSES_PER_CATEGORY.get('archfoe-boss'),
	...BOSSES_PER_CATEGORY.get('bane-boss'),
]));

const GLOBAL_TOTAL_KILLS_PER_CATEGORY = new Map();
const categories = [...BOSSES_PER_CATEGORY.keys()];
for (const category of categories) {
	GLOBAL_TOTAL_KILLS_PER_CATEGORY.set(category, new Map());
}

for (const [race, kills] of GLOBAL_TOTAL_KILLS) {
	for (const category of categories) {
		if (BOSSES_PER_CATEGORY.get(category).has(race)) {
			GLOBAL_TOTAL_KILLS_PER_CATEGORY.get(category).set(race, kills);
		}
	}
}

const writeMap = async (map, slug) => {
	const json = jsesc(Object.fromEntries(map), {
		json: true,
		compact: false,
	});
	await fs.writeFile(`./data/_global-total/${slug}-kills.json`, `${json}\n`);
};

for (const [slug, killsPerBoss] of GLOBAL_TOTAL_KILLS_PER_CATEGORY) {
	await writeMap(killsPerBoss, slug);
}
