import StorageProvider from './storage-provider';
import Cache from './cache-manager';

const manager = {
	REDIS_MODE: StorageProvider.REDIS_MODE,
	LOCAL_DISK_MODE: StorageProvider.LOCAL_DISK_MODE,
	create: async (mode = '', storeName = '') => {
		if(mode && mode.length) {
			const validMode = [ StorageProvider.REDIS_MODE, StorageProvider.LOCAL_DISK_MODE ].includes(mode);
			if(!validMode){
				throw new Error('Invalid mode');
			}
			const provider = StorageProvider.createProvider(mode);
			await Cache.init({ storageProvider: provider, storeName });
			return Object.create(Cache);
		}else{
			await Cache.init({ storeName });
			return Object.create(Cache);
		}
	},
	createSync: (mode = '', storeName = '') => {
		if(mode && mode.length) {
			const validMode = [ StorageProvider.REDIS_MODE, StorageProvider.LOCAL_DISK_MODE ].includes(mode);
			if(!validMode){
				throw new Error('Invalid mode');
			}
			const provider = StorageProvider.createProvider(mode);
			Cache.initSync({ storageProvider: provider, storeName });
			return Object.create(Cache);
		}else{
			Cache.initSync({ storeName });
			return Object.create(Cache);
		}
	}
};

export default manager;