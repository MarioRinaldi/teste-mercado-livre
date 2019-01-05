getAmount = function(value) {
	const val = Math.abs(value).toString();
	const integer = val < 100 ? '0' : val.substring(0, val.length - 2);

	return parseInt(integer, 10);
};

getCents = function(value) {
	const val = Math.abs(value).toString();
	const cents = (val < 10 ? "0" : "") + val.substring(val.length - 2);;

	return parseInt(cents, 10);
};

module.exports = {
  getCents,
  getAmount
};
