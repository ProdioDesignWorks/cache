const { CacheManager } = require('../');

const cache = CacheManager.createSync();

//Get all keys
console.log(cache.keysSync());

//Set a value
cache.setSync('profile', { firstName: 'john', lastName: 'doe' });
cache.setSync('address', { street: 'RK road', pincode: '421003' });

//Get a value
console.log(cache.getSync('profile'));

//Delete a value
cache.deleteSync('profile');
console.log(cache.getSync('profile'));
console.log(cache.keysSync());

//Clear cache
cache.clearSync();
console.log(cache.keysSync());