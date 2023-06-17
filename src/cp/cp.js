import { spawn } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'url';

const spawnChildProcess = async (args) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = join(__dirname, 'files', 'script.js');
  const childProcess = spawn('node', [filePath, ...args]);

  childProcess.stdout.on('data', (data) => {
    console.log(`Output: ${data}`);
  });

  childProcess.stderr.on('data', (data) => {
    console.error(`Error: ${data}`);
  });

  childProcess.on('close', (code) => {
    console.log(`Child process exited with code ${code}`);
  });

  process.stdin.pipe(childProcess.stdin);
  childProcess.stdout.pipe(process.stdout);
};

// Put your arguments in function call to test this functionality
await spawnChildProcess( ['Hello', 'my',  'friend']);
