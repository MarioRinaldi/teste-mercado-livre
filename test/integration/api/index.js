const axios = require('axios');
const { expect } = require('chai');
const { apiURL } = require('../../../package.json');


const search = async (term) => {
  return await axios.get(`${apiURL}?q=${term}&limit=4`);
}

describe('Test API search.', function() {
  this.timeout(15000);

  it("at least one", (done) => {
    search('ipod').then(response => {
      console.log('waiting');
      const { status, data } = response;
      expect(status).to.equal(200);
      expect(data.items).to.have.lengthOf.at.least(1);
      expect(data.items).to.have.lengthOf(4);
      done();
    });
  });

  it("invalid term", (done) => {
    search('xablau').then(response => {
      console.log('waiting');
      const { status, data } = response;
      expect(status).to.equal(500);
    }).catch(({ response }) => {
      const { status, data } = response;
      expect(status).to.equal(500);
    }).then(done);
  });
});
