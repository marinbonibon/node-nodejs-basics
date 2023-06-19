import { fileURLToPath } from 'url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
export const errorMessage = 'FS operation failed';
