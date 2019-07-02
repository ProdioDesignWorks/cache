const { CacheManager } = require('../');
const _c = {};
const tt = {};

CacheManager.create(CacheManager.LOCAL_DISK_MODE).then(
	async (r) => {
		Object.assign(_c, r);
		const keys = await _c.keys();
		console.log(keys);
		console.time("op");
		await _c.set('qw', {name: 'pawan'});
		console.timeEnd("op");
	}
).catch(
	e => console.error(e)
)