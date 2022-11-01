import fs from 'node:fs/promises';
import glob from 'glob';

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

const fileNames = glob.sync('./data/*/*.json');
for (const fileName of fileNames) {
	await handleFile(fileName);
}

const entries = [...map.entries()];
const sorted = entries.filter(entry => entry[1] > 0).sort((a, b) => {
	return a[1] - b[1];
});
for (const [race, kills] of sorted) {
	console.log(`${race}\t${kills}`);
}
