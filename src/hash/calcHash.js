import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'node:path';
import { createHash } from 'node:crypto';

const calculateHash = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = join(__dirname, 'files', 'fileToCalculateHashFor.txt');
  const fileBuffer = await readFile(filePath).then(data => data);
  const hash = createHash('sha256');
  hash.update(fileBuffer);

  const hex = hash.digest('hex');

  console.log(`SHA256 hash for file: ${hex}`);
};

await calculateHash();
