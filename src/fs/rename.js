import fs from 'fs';
import { join } from 'node:path';
import { close, open } from 'node:fs';
import {__dirname, errorMessage} from './constants.js';

const renameFile = (oldPath, newPath, errorMessage) => {
  fs.rename(oldPath, newPath, (err) => {
    if (err) throw new Error(errorMessage);
    console.log('File renamed successfully');
  });
}

const rename = async () => {
  const oldPath = join(__dirname, 'files', 'wrongFilename.txt');
  const newPath = join(__dirname, 'files', 'properFilename.md');

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
