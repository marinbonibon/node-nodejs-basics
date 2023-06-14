import { close, open } from 'node:fs';
import { __dirname, errorMessage } from './constants.js';
import { join } from 'node:path';
import { unlink } from 'node:fs';

const deleteFile = async (filePath) => {
  unlink(filePath, (err) => {
    if (err) {
      console.error(`Error deleting file: ${err}`);
      return;
    }

    console.log('File deleted successfully');
  });
}

const remove = async () => {
  const filePath = join(__dirname, 'files', 'fileToRemove.txt');

  open(filePath, 'r', (err, fd) => {
    if (err) {
      throw new Error(errorMessage)
    }

    try {
      deleteFile(filePath);
    } finally {
      close(fd, (err) => {
        if (err) throw err;
      });
    }
  });
};

await remove();
