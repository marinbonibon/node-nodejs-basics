import { createGzip } from 'node:zlib';
import { pipeline } from 'node:stream';
import { createReadStream, createWriteStream } from 'node:fs';
import { join } from 'node:path';
import { __dirname } from './constants.js';

const compress = async () => {
  const sourcePath = join(__dirname, 'files', 'fileToCompress.txt');
  const destinationPath = join(__dirname, 'files', 'archive.gz');
  const gzip = createGzip();
  const sourceFile = createReadStream(sourcePath);
  const destinationArchive = createWriteStream(destinationPath);

  pipeline(sourceFile, gzip, destinationArchive, (err) => {
    if (err) {
      console.error('Error:', err);
      process.exitCode = 1;
    }
    console.log('File compressed successfully');
  });
};

await compress();
