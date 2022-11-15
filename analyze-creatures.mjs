import {
	createKillsPerCategoryMap,
	writeMap,
} from './utils.mjs';

const CREATURES_PER_CATEGORY = new Map([

	// Bestiary categories.
	// https://tibia.fandom.com/wiki/Bestiary/Difficulties

	['harmless-bestiary-creature', new Set([
		'berrypests',
		// The kill stats do not distinguish between blue, purple, or
		// red butterflies.
		'butterflies',
		'cats',
		'dogs',
		'huskies',
		'modified gnarlhounds',
		'mushroom sniffers',
		'northern pikes',
		'pigeons',
	])],

	['trivial-bestiary-creature', new Set([
		'agrestic chickens',
		'badgers',
		'bats',
		'black sheep',
		'bog frogs',
		'bugs',
		'cave parrots',
		'cave rats',
		'chickens',
		'deer',
		'dromedaries',
		'fish',
		'flamingos',
		'foxes',
		'frost trolls',
		'goblins',
		'green frogs',
		'grynch clan goblins',
		// The kill stats do not distinguish between brown, grey, or taupe horses.
		'horses',
		'island trolls',
		'parrots',
		'penguins',
		'pigs',
		'poison spiders',
		'rabbits',
		'rats',
		'sandcrawlers',
		'seagulls',
		'sheep',
		'silver rabbits',
		'skunks',
		'snakes',
		'spiders',
		'squirrels',
		'trolls',
		'undead jesters',
		'wasps',
		'white deer',
		'wild horses',
		'winter wolves',
		'wisps',
		'wolves',
	])],

	['easy-bestiary-creature', new Set([
		'abyssal calamaries',
		'acolytes of darkness',
		'adventurers',
		'amazons',
		'assassins',
		'azure frogs',
		'bandits',
		'barbarian brutetamers',
		'barbarian headsplitters',
		'barbarian skullhunters',
		'bears',
		'blood crabs',
		'boars',
		'bonelords',
		'cake golems',
		'calamaries',
		'carrion worms',
		'centipedes',
		'chakoya toolshapers',
		'chakoya tribewardens',
		'chakoya windcallers',
		'cobras',
		'coral frogs',
		'corym charlatans',
		'crabs',
		'crazed beggars',
		'crimson frogs',
		'crocodiles',
		'crypt defilers',
		'crypt shamblers',
		'cyclopes',
		'damaged crystal golems',
		'damaged worker golems',
		'dark apprentices',
		'dark magicians',
		'dark monks',
		'deepling workers',
		'deepsea blood crabs',
		'dire penguins',
		'doomsday cultists',
		'dwarf guards',
		'dwarf soldiers',
		'dwarfs',
		'dworc fleshhunters',
		'dworc venomsnipers',
		'dworc voodoomasters',
		'elephants',
		'elf arcanists',
		'elf scouts',
		'elves',
		'emerald damselflies',
		'feverish citizens',
		'filth toads',
		'fire devils',
		'firestarters',
		'frost giants',
		'frost giantesses',
		'furious trolls',
		'gang members',
		'gargoyles',
		'gazers',
		'ghost wolves',
		'ghosts',
		'ghouls',
		'gladiators',
		'gloom wolves',
		'gnarlhounds',
		'goblin assassins',
		'goblin leaders',
		'goblin scavengers',
		'gozzlers',
		'grave robbers',
		'honour guards',
		'hunters',
		'hyaenas',
		'insect swarms',
		'insectoid scouts',
		'iron servants',
		'jellyfish',
		'killer rabbits',
		'kongras',
		'ladybugs',
		'larvas',
		'leaf golems',
		'lions',
		'little corym charlatans',
		'lizard sentinels',
		'lizard templars',
		'mad scientists',
		'mammoths',
		'marsh stalkers',
		'mercury blobs',
		'merlkins',
		'minotaur archers',
		'minotaur guards',
		'minotaur mages',
		'minotaurs',
		'moles',
		'monks',
		'mummies',
		// The kill stats do not distinguish between basic, blue, or red/female nomads.
		'nomads',
		'novices of the cult',
		'orc riders',
		'orc shamans',
		'orc spearmen',
		'orc warriors',
		'orcs',
		'orchid frogs',
		'pandas',
		'pirate ghosts',
		'pirate marauders',
		'pirate skeletons',
		'poachers',
		'polar bears',
		'quara mantassin scouts',
		'redeemed souls',
		'rorcs',
		'rotworms',
		'salamanders',
		'scarabs',
		'scorpions',
		'sibangs',
		'skeleton warriors',
		'skeletons',
		'slimes',
		'slugs',
		'smugglers',
		'spit nettles',
		'squidgy slimes',
		'stalkers',
		'starving wolves',
		'stone golems',
		'swamp trolls',
		'swamplings',
		'tainted souls',
		'tarantulas',
		'tarnished spirits',
		'terramites',
		'terrified elephants',
		'terror birds',
		'thornback tortoises',
		'tigers',
		'toads',
		'tortoises',
		'troll champions',
		'troll guards',
		'undead mine workers',
		'undead prospectors',
		'valkyries',
		'war wolves',
		'water buffalos',
		'white shades',
		'wild warriors',
		'witches',
	])],

	// ['medium-bestiary-creature', new Set([
	// 	'TODO',
	// ])],

	// ['hard-bestiary-creature', new Set([
	// 	'TODO',
	// ])],

	// ['challenging-bestiary-creature', new Set([
	// 	'TODO',
	// ])],

	['lightbearer-creature', new Set([
		'acolytes of darkness',
		'banes of light',
		'brides of night',
		'doomsday cultists',
		'duskbringers',
		'heralds of gloom',
		'midnight spawns',
		'midnight warriors',
		'nightslayers',
		'shadow hounds',
	])],

	// TODO: https://github.com/tibiamaps/tibia-kill-stats/issues/1

]);

// All Bestiary creatures.
// CREATURES_PER_CATEGORY.set('bestiary-creature', new Set([
// 	...CREATURES_PER_CATEGORY.get('harmless-bestiary-creature'),
// 	...CREATURES_PER_CATEGORY.get('trivial-bestiary-creature'),
// 	...CREATURES_PER_CATEGORY.get('easy-bestiary-creature'),
// 	...CREATURES_PER_CATEGORY.get('medium-bestiary-creature'),
// 	...CREATURES_PER_CATEGORY.get('hard-bestiary-creature'),
// 	...CREATURES_PER_CATEGORY.get('challenging-bestiary-creature'),
// ]));

const killsPerCategory = createKillsPerCategoryMap(CREATURES_PER_CATEGORY);

for (const [slug, killsPerCreature] of killsPerCategory) {
	await writeMap(killsPerCreature, `creatures/${slug}`);
}
