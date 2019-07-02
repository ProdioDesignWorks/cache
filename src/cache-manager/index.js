const cache = {
	_cache: {},
	storageEnabled: false,
	storageProvider: null,
	storeName: '',

	init: async function ({ storageProvider: provider, storeName = '' }){
		if(provider){
			this.storageEnabled = true;
			this.storageProvider = provider;
			this.storeName = storeName;
			this._cache = await this.storageProvider.store(storeName);
		}else{
			this._cache = {};
		}
	},
	initSync: function ({ storageProvider: provider, storeName = '' }){
		if(provider){
			this.storageEnabled = true;
			this.storageProvider = provider;
			this.storeName = storeName;
			this._cache = this.storageProvider.storeSync(storeName);
		}else{
			this._cache = {};
		}
	},

	set: async function (key, data){
		this._cache[key] = data;
		this.storageEnabled && ( await this.storageProvider.updateStore(this.storeName, this._cache) );
		return this._cache;
	},
	setSync: function (key, data){
		this._cache[key] = data;
		this.storageEnabled && this.storageProvider.updateStoreSync(this.storeName, this._cache);
		return this._cache;
	},

	get: async function(key){
		return this._cache[key];
	},
	getSync: function(key){
		return this._cache[key];
	},

	clear: async function(){
		this._cache = {};
		this.storageEnabled && ( await this.storageProvider.clear(this.storeName) );
		return this._cache;
	},
	clearSync: function(){
		this._cache = {};
		this.storageEnabled && this.storageProvider.clearSync(this.storeName);
		return this._cache;
	},

	delete: async function(key){
		delete this._cache[key];
		this.storageEnabled && ( await this.storageProvider.updateStore(this.storeName, this._cache) );
		return this._cache;
	},
	deleteSync: function(key){
		delete this._cache[key];
		this.storageEnabled && this.storageProvider.updateStoreSync(this.storeName, this._cache);
		return this._cache;
	},

	keys: async function(){
		return Object.keys(this._cache)
	},
	keysSync: function(){
		return Object.keys(this._cache)
	},
}

export default cache;