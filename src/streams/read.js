import { createReadStream } from 'node:fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'node:path';

const read = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = join(__dirname, 'files', 'fileToRead.txt');
  const stream = createReadStream(filePath);
  stream.on('data', (data) => {
    process.stdout.write(data);
  })
  stream.on('error', (err) => {
    console.log(`Error while createReadStream: ${err}`);
  });
};

await read();
