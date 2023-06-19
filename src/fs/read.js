import { close, open } from 'node:fs';
import { __dirname, errorMessage } from './constants.js';
import { join } from 'node:path';
import { readFile } from 'node:fs';

const readContent = (filePath) => {
  readFile(filePath, 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
  });
}

const read = async () => {
  const filePath = join(__dirname, 'files', 'fileToRead.txt');

  open(filePath, 'r', (err, fd) => {
    if (err) {
      throw new Error(errorMessage)
    }

    try {
      readContent(filePath);
    } finally {
      close(fd, (err) => {
        if (err) throw err;
      });
    }
  });
};

await read();
