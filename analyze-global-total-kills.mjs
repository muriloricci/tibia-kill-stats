import fs from 'node:fs/promises';
import glob from 'glob';
import { toPrettyName } from './normalize-names.mjs';

// race => totalKilled
const map = new Map();

const handleFile = async (fileName) => {
	const json = await fs.readFile(fileName, 'utf8');
	const entries = JSON.parse(json).killstatistics.entries;
	for (const {race, last_day_killed} of entries) {
		if (map.has(race)) {
			const prev = map.get(race);
			map.set(race, prev + last_day_killed);
		} else {
			map.set(race, last_day_killed);
		}
	}
};

const handleLatest = async (fileName) => {
	const latestMap = new Map();
	const json = await fs.readFile(fileName, 'utf8');
	const stats = JSON.parse(json).killstatistics;
	const entries = stats.entries;
	const world = stats.world;
	for (const {race, last_day_killed} of entries) {
		if (last_day_killed <= 0) continue;
		const prettyName = toPrettyName(race);
		latestMap.set(prettyName, last_day_killed);
	}
	const newData = Object.fromEntries(latestMap);
	const newJson = JSON.stringify(newData, null, '\t');
	await fs.writeFile(`./data/_yesterday/${world}.json`, `${newJson}\n`);
};

const fileNames = glob.sync('./data/*/*.json', {
	ignore: [
		'./data/_global-total/*.json',
		'./data/_yesterday/*.json',
	],
});
for (const fileName of fileNames) {
	if (fileName.endsWith('latest.json')) {
		await handleLatest(fileName);
	} else {
		await handleFile(fileName);
	}
}

{
	const KILL_STATS_NAMES = [...map.keys()].sort();
	const json = JSON.stringify(KILL_STATS_NAMES, null, '\t');
	await fs.writeFile('./data/_global-total/names.json', `${json}\n`);
}

const entries = [...map.entries()];
const sorted = entries
	.filter(entry => entry[1] > 0)
	.map(([race, kills]) => {
		return [toPrettyName(race), kills];
	})
	.sort((a, b) => {
	if (a[1] === b[1]) {
		return a[0].localeCompare(b[0]);
	}
	return a[1] - b[1];
});

{
	const object = Object.fromEntries(sorted);
	const json = JSON.stringify(object, null, '\t');
	await fs.writeFile('./data/_global-total/kills.json', `${json}\n`);
}
