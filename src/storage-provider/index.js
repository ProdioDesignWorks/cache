import { REDIS_MODE, LOCAL_DISK_MODE } from './constants';
import disk from './disk';

const storageProvider = {
  REDIS_MODE,
  LOCAL_DISK_MODE,

  createProvider: (mode = LOCAL_DISK_MODE) => {
    if (mode !== LOCAL_DISK_MODE) {
      throw new Error('only LOCAL_DISK_MODE is supported at this moment');
    }

    return disk;
  },
};

export default storageProvider;
