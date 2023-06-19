import { join } from 'node:path';
import { __dirname, errorMessage } from './constants.js';
import { readdir } from 'node:fs';

const list = async () => {
  const folderPath = join(__dirname, 'files');

  readdir(folderPath, (err, files) => {
    if (err) throw new Error(errorMessage);

    files.forEach((file) => {
      console.log(file);
    })
  })
};

await list();
