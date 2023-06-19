import path from 'path';
import { release, version } from 'os';
import { createServer as createServerHttp } from 'http';
import { readFile } from 'fs/promises';
import * as c from './files/c.js';
import { fileURLToPath } from 'url';
import { dirname } from 'node:path';

const random = Math.random();
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

const aPath = path.join(__dirname, 'files', 'a.json');
const bPath = path.join(__dirname, 'files', 'b.json');

const a = JSON.parse(
  await readFile(
    new URL(aPath, import.meta.url)
  )
);

const b = JSON.parse(
  await readFile(
    new URL(bPath, import.meta.url)
  )
);

let unknownObject;

if (random > 0.5) {
  unknownObject = a;
} else {
  unknownObject = b;
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const myServer = createServerHttp((_, res) => {
  res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log('To terminate it, use Ctrl+C combination');
});

export {
  unknownObject,
  myServer,
};

