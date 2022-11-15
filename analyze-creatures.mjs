import {
	createKillsPerCategoryMap,
	writeMap,
} from './utils.mjs';

const CREATURES_PER_CATEGORY = new Map([

	// TODO: Add Bestiary categories.
	// https://tibia.fandom.com/wiki/Bestiary/Difficulties

	// ['harmless-bestiary-creature', new Set([
	// 	'TODO',
	// ])],

	// ['trivial-bestiary-creature', new Set([
	// 	'TODO',
	// ])],

	// ['easy-bestiary-creature', new Set([
	// 	'TODO',
	// ])],

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
