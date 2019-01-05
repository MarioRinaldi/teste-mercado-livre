const parse = () => {
  const args = {};
  const rawArgs = process.argv.slice(2);
  let tmpArg = '';

  rawArgs.forEach(arg => {
    tmpArg = arg.split('=');
    args[tmpArg[0].replace(/^-+/, '')] = tmpArg[1];
  });

  return args;
};
const get = param => parse()[param];


module.exports = {
  get,
  parse
};
