const parseEnv = () => {
  const prefix = 'RSS_';

  const result = Object.entries(process.env).reduce((acc, [key, val]) => {
    if (key.startsWith(prefix)) {
      acc.push(`${key}=${val}`);
    }
    return acc;
  }, []).join(';');

  console.log(result);
};

parseEnv();
