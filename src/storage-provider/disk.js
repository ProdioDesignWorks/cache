import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const writeFileAsync = promisify(fs.writeFile);
const readFileAsync = promisify(fs.readFile);
const accessFileAsync = promisify(fs.access);

const storagePath = path.resolve(__dirname, '..', '..', '.cache');
const defaultStoragePath = path.resolve(storagePath, 'default.json');

const presist = async (fp, data) => writeFileAsync(fp, JSON.stringify(data));
const presistSync = (fp, data) => fs.writeFileSync(fp, JSON.stringify(data));

const exists = async (fp) => {
  try {
    await accessFileAsync(fp);
    return true;
  } catch (error) {
    return false;
  }
};
const existsSync = (fp) => {
  try {
    fs.accessSync(fp, fs.constants.F_OK);
    return true;
  } catch (error) {
    return false;
  }
};

const updateStore = async (storeName = '', data = {}) => {
  if (storeName) {
    const filePath = path.resolve(storagePath, `${storeName}.json`);
    const storeExists = await exists(filePath);

    if (storeExists) {
      const store = await presist(filePath, data);
      return store;
    }
    throw new Error(`Store ${storeName}, doesn't exists`);
  } else {
    const store = await presist(defaultStoragePath, data);
    return store;
  }
};
const updateStoreSync = (storeName = '', data = {}) => {
  if (storeName) {
    const filePath = path.resolve(storagePath, `${storeName}.json`);
    const storeExists = exists(filePath);
    if (storeExists) {
      const store = presistSync(filePath, data);
      return store;
    }
    throw new Error(`Store ${storeName}, doesn't exists`);
  } else {
    const store = presistSync(defaultStoragePath, data);
    return store;
  }
};

const clear = async (storeName = '') => updateStore(storeName, {});
const clearSync = (storeName = '') => updateStoreSync(storeName, {});

const store = async (storeName = '') => {
  if (storeName) {
    const filePath = path.resolve(storagePath, `${storeName}.json`);
    const storeExists = await exists(filePath);

    if (exists(storeExists)) {
      const data = await readFileAsync(filePath, 'utf8');
      return data ? JSON.parse(data) : {};
    }
    await presist(filePath, {});
    return {};
  }
  const data = await readFileAsync(defaultStoragePath, 'utf8');
  return data ? JSON.parse(data) : {};
};
const storeSync = (storeName = '') => {
  if (storeName) {
    const filePath = path.resolve(storagePath, `${storeName}.json`);
    const storeExists = existsSync(filePath);
    if (storeExists) {
      const data = fs.readFileSync(filePath, 'utf8');
      return data ? JSON.parse(data) : {};
    }
    presistSync(filePath, {});
    return {};
  }

  const data = fs.readFileSync(defaultStoragePath, 'utf8');
  return data ? JSON.parse(data) : {};
};

const StorageProvider = {
  updateStore, clear, store, updateStoreSync, clearSync, storeSync,
};

export default StorageProvider;
