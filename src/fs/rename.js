import fs from 'fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'url';
import { close, open } from 'node:fs';

const renameFile = (oldPath, newPath, errorMessage) => {
  fs.rename(oldPath, newPath, (err) => {
    if (err) throw new Error(errorMessage);
    console.log('File renamed successfully');
  });
}

const rename = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const oldPath = join(__dirname, 'files', 'wrongFilename.txt');
  const newPath = join(__dirname, 'files', 'properFilename.md');
  const errorMessage = 'FS operation failed';

  open(newPath, 'wx', (err, fd) => {
    if (err) {
      if (err.code === 'EEXIST') {
        throw new Error(errorMessage);
      }

      throw err;
    }

    try {
      renameFile(oldPath, newPath, errorMessage);
    } finally {
      close(fd, (err) => {
        if (err) throw err;
      });
    }
  });
};

await rename();
