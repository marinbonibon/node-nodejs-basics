import { createUnzip } from 'node:zlib';
import { join } from 'node:path';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream';
import { __dirname } from './constants.js';

const decompress = async () => {
  const sourcePath = join(__dirname, 'files', 'archive.gz');
  const destinationPath = join(__dirname, 'files', 'fileToCompress.txt');
  const sourceArchive = createReadStream(sourcePath);
  const destinationFile = createWriteStream(destinationPath);
  const unzip = createUnzip();

  pipeline(sourceArchive, unzip, destinationFile, (err) => {
    if (err) {
      console.error('Error:', err);
      process.exitCode = 1;
    }
    console.log('Archive decompressed successfully');
  });
};

await decompress();
