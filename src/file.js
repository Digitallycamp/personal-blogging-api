import fs from 'node:fs/promises';
import path from 'node:path';
import { join, resolve, basename, dirname } from 'path';
import url from 'url';
// fs.writeFileSync('myfile.txt', 'Hello welcome to kuzuki land d', 'utf8');
// async function writeFileExample() {
// 	try {
// 		await fs.writeFile('myfile.txt', 'Peace lag', 'utf8');
// 	} catch (error) {
// 		console.log('error', error);
// 	}
// }
// async function writeFileExampleNew() {
// 	try {
// 		await fs.appendFile('myfile.txt', 'Peace be onto you', 'utf8');
// 	} catch (error) {
// 		console.log('error', error);
// 	}
// }
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataFilePath = join(__dirname, 'db', 'data.json');
console.log(dataFilePath);
async function writeFileExample2() {
	const data = { name: 'john', age: 30, county: 'Nigeria' };

	try {
		await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
	} catch (error) {
		console.log('error', error);
	}
}

// writeFileExample();
writeFileExample2();
// writeFileExampleNew();

console.log(__filename);
console.log(__dirname);

// console.log(filename);
