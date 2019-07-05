import StorageProvider from './storage-provider';
import Cache from './cache-manager';

const modes = [StorageProvider.REDIS_MODE, StorageProvider.LOCAL_DISK_MODE];

const manager = {
  REDIS_MODE: StorageProvider.REDIS_MODE,
  LOCAL_DISK_MODE: StorageProvider.LOCAL_DISK_MODE,

  create: async (mode = '', storeName = '') => {
    if (mode && mode.length) {
      const validMode = modes.includes(mode);
      if (!validMode) {
        throw new Error('Invalid mode');
      }
      const provider = StorageProvider.createProvider(mode);
      await Cache.init({ storageProvider: provider, storeName });
      return Object.assign({}, Cache);
    }
    await Cache.init({ storeName });
    return Object.assign({}, Cache);
  },
  createSync: (mode = '', storeName = '') => {
    if (mode && mode.length) {
      const validMode = modes.includes(mode);
      if (!validMode) {
        throw new Error('Invalid mode');
      }
      const provider = StorageProvider.createProvider(mode);
      Cache.initSync({ storageProvider: provider, storeName });
      return Object.assign({}, Cache);
    }
    Cache.initSync({ storeName });
    return Object.assign({}, Cache);
  },
};

export default manager;
