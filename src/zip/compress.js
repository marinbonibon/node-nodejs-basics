import { createGzip } from 'node:zlib';
import { pipeline } from 'node:stream';
import { createReadStream, createWriteStream } from 'node:fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'node:path';

const compress = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
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
  });
};

await compress();
