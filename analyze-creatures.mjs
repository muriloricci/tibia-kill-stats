import {
	createKillsPerCategoryMap,
	writeMap,
} from './utils.mjs';

const CREATURES_PER_CATEGORY = new Map([

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

const killsPerCategory = createKillsPerCategoryMap(CREATURES_PER_CATEGORY);

for (const [slug, killsPerCreature] of killsPerCategory) {
	await writeMap(killsPerCreature, `creatures/${slug}`);
}
