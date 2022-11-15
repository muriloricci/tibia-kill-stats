import fs from 'node:fs/promises';
import jsesc from 'jsesc';

const readKillStats = async () => {
	const filePath = './data/_global-total/kills.json';
	const json = await fs.readFile(filePath);
	const object = JSON.parse(json);
	const entries = Object.entries(object);
	const map = new Map(entries);
	return map;
};

const GLOBAL_TOTAL_KILLS = await readKillStats();

export const createKillsPerCategoryMap = (creaturesPerCategory) => {
	const GLOBAL_TOTAL_KILLS_PER_CATEGORY = new Map();
	const categories = [...creaturesPerCategory.keys()];
	for (const category of categories) {
		GLOBAL_TOTAL_KILLS_PER_CATEGORY.set(category, new Map());
	}

	for (const [race, kills] of GLOBAL_TOTAL_KILLS) {
		for (const category of categories) {
			if (creaturesPerCategory.get(category).has(race)) {
				GLOBAL_TOTAL_KILLS_PER_CATEGORY.get(category).set(race, kills);
			}
		}
	}

	return GLOBAL_TOTAL_KILLS_PER_CATEGORY;
};

export const writeMap = async (map, slug) => {
	const json = jsesc(Object.fromEntries(map), {
		json: true,
		compact: false,
	});
	await fs.writeFile(`./data/_global-total/${slug}-kills.json`, `${json}\n`);
};
