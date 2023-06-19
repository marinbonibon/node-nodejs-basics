const parseArgs = () => {
  const prefix = '--';
  const result = process.argv.reduce((acc, curr, i) => {
   if (curr.startsWith(prefix)) {
     acc.push(`${curr.substring(prefix.length)} is ${process.argv[++i]}`);
   }
   return acc;
  }, []).join(',');

  console.log(result);
};

parseArgs();
