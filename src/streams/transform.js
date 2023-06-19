import { pipeline } from 'node:stream/promises';
import { Transform} from 'node:stream';

const transform = async () => {
  const reversedText = (text) => {
    return text.split('').reverse().join('');
  };
  const transformStream = new Transform({
    transform(chunk, enc, callback) {
      callback(null, reversedText(chunk.toString()));
    },
  });

  await pipeline(process.stdin, transformStream, process.stdout);
};

await transform();
