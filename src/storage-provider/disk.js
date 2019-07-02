import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const writeFileAsync = promisify(fs.writeFile);
const readFileAsync = promisify(fs.readFile);
const accessFileAsync = promisify(fs.access);

const storagePath = path.resolve(__dirname, '..', '..', '.cache');
const defaultStoragePath = path.resolve(storagePath, 'default.json');

const presist = async (fp, data) => ( await writeFileAsync(fp, JSON.stringify(data)) );
const presistSync = (fp, data) => {
	console.log("presistSync -->");
	console.log("fp:", fp);
	console.log("data:", data);
	fs.writeFileSync(fp, JSON.stringify(data))
};

const clear = async (storeName = '') => ( await updateStore(storeName, {}) );
const clearSync = (storeName = '') => updateStoreSync(storeName, {});

const exists = async (path) => {
	try {
		await accessFileAsync(path);
		return true;
	} catch(error) {
		return false;
	}
}

const existsSync = (path) => {
	try {
		fs.accessSync(path, fs.constants.F_OK);
		return true;
	} catch(error) {
		return false;
	}
}

const store = async (storeName = '') => {
	if(storeName){
		const filePath = path.resolve(storagePath, `${storeName}.json`);
		const storeExists = await exists(filePath);

		if(exists(storeExists)){
			const data = await readFileAsync(filePath, 'utf8');
			return data ? JSON.parse(data) : {};
		}else{
			await presist(filePath, {});
			return {};
		}
	}else{
		console.log("defaultStoragePath:", defaultStoragePath);
		const data = await readFileAsync(defaultStoragePath, 'utf8');
		return data ? JSON.parse(data) : {};
	}
};

const storeSync = (storeName = '') => {
	console.log("storeSync -->");
	console.log("storeName:", storeName);

	if(storeName){
		const filePath = path.resolve(storagePath, `${storeName}.json`);
		const storeExists = existsSync(filePath);
		console.log("filePath:", filePath);
		console.log("storeExists:", storeExists);
		if(storeExists){
			const data = fs.readFileSync(filePath, 'utf8');
			return data ? JSON.parse(data) : {};
		}else{
			console.log("storeSync filePath:", filePath);
			presistSync(filePath, {});
			return {};
		}
	}else{
		console.log("defaultStoragePath:", defaultStoragePath);
		const data = fs.readFileSync(defaultStoragePath, 'utf8');
		return data ? JSON.parse(data) : {};
	}
};

const updateStore = async (storeName = '', data = {}) => {
	if(storeName){
		const filePath = path.resolve(storagePath, `${storeName}.json`);
		const storeExists = await exists(filePath);

		if(storeExists){
			const store = await presist(filePath, data);
			return store;
		}else{
			throw new Error(`Store ${storeName}, doesn't exists`);
		}
	}else{
		const store = await presist(defaultStoragePath, data);
		return store;
	}
}

const updateStoreSync = (storeName = '', data = {}) => {
	console.log("updateStoreSync -->");
	console.log("storeName:", storeName);
	console.log("data:", data);

	if(storeName){
		const filePath = path.resolve(storagePath, `${storeName}.json`);
		const storeExists = exists(filePath);
		console.log("filePath:", filePath);
		if(storeExists){
			const store = presistSync(filePath, data);
			return store;
		}else{
			throw new Error(`Store ${storeName}, doesn't exists`);
		}
	}else{
		console.log("defaultStoragePath:", defaultStoragePath);
		const store = presistSync(defaultStoragePath, data);
		return store;
	}
}

const StorageProvider = { updateStore, clear, store, updateStoreSync, clearSync, storeSync };

export default StorageProvider;
