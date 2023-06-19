import { join } from 'node:path';
import { open, close, writeFile } from 'node:fs';
import {__dirname, errorMessage} from './constants.js';

const createFile = async (filePath, content) => {
  writeFile(filePath, content, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Text file created successfully!');
  });
}

const create = async () => {
  const filePath = join(__dirname, 'files', 'fresh.txt');
  const content = 'I am fresh and young';

  open(filePath, 'wx', (err, fd) => {
    if (err) {
      if (err.code === 'EEXIST') {
        throw new Error(errorMessage);
      }

      throw err;
    }

    try {
      createFile(filePath, content);
    } finally {
      close(fd, (err) => {
        if (err) throw err;
      });
    }
  });
};

await create();
