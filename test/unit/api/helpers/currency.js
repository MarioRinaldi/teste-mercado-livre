const { expect } = require('chai');
const { currency } = require('../../../../api/helpers');

describe("currency tests 119,98", function() {
  it("should return amount = 119", function() {
    const result = currency.getAmount(11998);

    expect(result).equal('119');
  });
  it("should return cents = 98", function() {
    const result = currency.getCents(11998);

    expect(result).equal('98');
  });
});
describe("currency tests 0,09", function() {
  it("should return amount = 0", function() {
    const result = currency.getAmount(9);

    expect(result).equal('0');
  });
  it("should return cents = 09", function() {
    const result = currency.getCents(9);

    expect(result).equal('09');
  });
});


