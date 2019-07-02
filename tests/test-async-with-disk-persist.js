const { CacheManager } = require('./');
const _c = {};

CacheManager.create(CacheManager.LOCAL_DISK_MODE).then(
	async (r) => {
		Object.assign(_c, r);
		console.time("op");
		const keys = await _c.keys();
		console.log(keys);
		await _c.set('qw', {name: 'pawan'});
		console.timeEnd("op");
	}
).catch(
	e => console.error(e)
)