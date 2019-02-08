const parse = params => {
  const args = {};
  const rawArgs = (params || []).slice(2);
  let tmpArg = '';

  rawArgs.forEach(arg => {
    tmpArg = arg.split('=');
    args[tmpArg[0].replace(/^-+/, '')] = tmpArg[1];
  });

  return args;
};
const get = ({ args, param }) => parse(args)[param];

module.exports = {
  get,
  parse
};
