import * as fs from 'node:fs/promises';

const slugify = (name) => {
	const slug = name.replaceAll(' ', '+');
	return slug;
};

const getWorlds = async () => {
	console.log('Getting list of Tibia worlds…');
	const response = await fetch('https://api.tibiadata.com/v3/worlds');
	const data = await response.json();
	const regularWorlds = data.worlds.regular_worlds;
	const worldNames = regularWorlds.map((world) => world.name);
	return worldNames;
};

const getKillStatsForWorld = async (worldName) => {
	const response = await fetch(`https://api.tibiadata.com/v3/killstatistics/${slugify(worldName)}`);
	const data = await response.json();
	console.log(`Processing kill stats for world ${worldName}…`);
	return data;
};

const worldNames = await getWorlds();
// Kick off all requests in parallel.
const killStatsPerWorld = worldNames.map((worldName) => getKillStatsForWorld(worldName));

for await (const stats of killStatsPerWorld) {
	const world = stats.killstatistics.world;

	const worldPath = `./data/${world.toLowerCase()}`;
	await fs.mkdir(worldPath, {
		recursive: true,
	});

	const date = new Date().toISOString().slice(0, 'yyyy-mm-dd'.length);
	const json = JSON.stringify(stats, null, '\t') + '\n';
	await fs.writeFile(`${worldPath}/${date}.json`, json);
}
