const cache = {
  cache: {},
  storageEnabled: false,
  storageProvider: null,
  storeName: '',

  async init({ storageProvider: provider, storeName = '' }) {
    if (provider) {
      this.storageEnabled = true;
      this.storageProvider = provider;
      this.storeName = storeName;
      this.cache = await this.storageProvider.store(storeName);
    } else {
      this.cache = {};
    }
  },
  initSync({ storageProvider: provider, storeName = '' }) {
    if (provider) {
      this.storageEnabled = true;
      this.storageProvider = provider;
      this.storeName = storeName;
      this.cache = this.storageProvider.storeSync(storeName);
    } else {
      this.cache = {};
    }
  },

  async set(key, data) {
    this.cache[key] = data;
    if (this.storageEnabled) await this.storageProvider.updateStore(this.storeName, this.cache);
    return this.cache;
  },
  setSync(key, data) {
    this.cache[key] = data;
    if (this.storageEnabled) this.storageProvider.updateStoreSync(this.storeName, this.cache);
    return this.cache;
  },

  async get(key) {
    return this.cache[key];
  },
  getSync(key) {
    return this.cache[key];
  },

  async clear() {
    this.cache = {};
    if (this.storageEnabled) await this.storageProvider.clear(this.storeName);
    return this.cache;
  },
  clearSync() {
    this.cache = {};
    if (this.storageEnabled) this.storageProvider.clearSync(this.storeName);
    return this.cache;
  },

  async delete(key) {
    delete this.cache[key];
    if (this.storageEnabled) await this.storageProvider.updateStore(this.storeName, this.cache);
    return this.cache;
  },
  deleteSync(key) {
    delete this.cache[key];
    if (this.storageEnabled) this.storageProvider.updateStoreSync(this.storeName, this.cache);
    return this.cache;
  },

  async keys() {
    return Object.keys(this.cache);
  },
  keysSync() {
    return Object.keys(this.cache);
  },

  async getStore() {
    return this.cache;
  },
  getStoreSync() {
    return this.cache;
  },
};

export default cache;
