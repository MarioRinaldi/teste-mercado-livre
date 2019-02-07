const getAmount = value => {
  const val = Math.abs(value).toString();
  const integer = val < 100 ? '0' : val.substring(0, val.length - 2);

  return integer;
};

const getCents = value => {
  const val = Math.abs(value).toString();
  const cents = (val < 10 ? '0' : '') + val.substring(val.length - 2);

  return cents;
};

module.exports = {
  getCents,
  getAmount
};
