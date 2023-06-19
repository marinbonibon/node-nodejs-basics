import { cpus } from 'os';
import { isMainThread, Worker } from 'node:worker_threads';
import { fileURLToPath } from 'url';
import { dirname, join } from 'node:path';

const getNthFibonacci = (i) => {
  const startNum = 10;
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const workerPath = join(__dirname, 'worker.js');
  const resolvedStatus = 'resolved';
  const errorStatus = 'error';

  if (isMainThread) {
    return new Promise((resolve) => {
      const worker = new Worker(workerPath, { workerData: startNum + i });
      worker.on('message', (data) => resolve({
          status: resolvedStatus,
          data,
        }),
      );
      worker.on('error', () => resolve({
        status: errorStatus,
        data: null,
      }));
    });
  }
};

const performCalculations = async () => {
  const numOfCpuCores = cpus().length;
  const promises = Array.from({ length: numOfCpuCores }, (v, i) => i).map((val, i) => getNthFibonacci(i));
  await Promise.all(promises).
    then((results) => {
      console.log(results);
    });
};

await performCalculations();
