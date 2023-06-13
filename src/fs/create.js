import { join, dirname } from 'node:path';
import { fileURLToPath } from 'url';
import { open, close, writeFile } from 'node:fs';

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
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = join(__dirname, 'files', 'fresh.txt');
  const content = 'I am fresh and young';
  const errorMessage = 'FS operation failed';

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
