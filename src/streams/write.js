import { fileURLToPath } from 'url';
import { dirname, join } from 'node:path';
import { createWriteStream } from 'node:fs';

const write = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = join(__dirname, 'files', 'fileToWrite.txt');
  const stream = createWriteStream(filePath);
  process.stdin.pipe(stream);
  stream.on('error', (err) => {
    console.log(`Error while createWriteStream: ${err}`);
  });
};

await write();
