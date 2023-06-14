import { copyFile, readdir, mkdir, stat } from 'node:fs';
import { join } from 'node:path';
import {__dirname, errorMessage} from './constants.js';

const callback = (err) => {
  if (err) throw err;
  console.log('file was copied');
}

const checkDestFolderExist = async (destinationFolderPath, errorMessage) => {
  stat(destinationFolderPath, (err, stats) => {
    if (stats && stats.isDirectory()) {
      throw new Error(errorMessage)
    }
  });
}

const copy = async () => {
  const sourceFolderPath = join(__dirname, 'files');
  const destinationFolderPath = join(__dirname, 'files_copy');

  readdir(sourceFolderPath, (err, files) => {
    if (err) throw new Error(errorMessage);

    checkDestFolderExist(destinationFolderPath, errorMessage);

    mkdir(destinationFolderPath, { recursive: true }, (err) => {
      if (err) throw err;
    });

    files.forEach((file) => {
      const sourceFilePath = join(sourceFolderPath, file);
      const destinationFilePath = join(destinationFolderPath, file);

      copyFile(sourceFilePath, destinationFilePath, callback);
    })
  })


};

await copy();
