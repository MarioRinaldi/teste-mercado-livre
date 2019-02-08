const { expect } = require('chai');
const { getItem, getItems } = require('../../../../api/services/items');

describe("service items tests", function() {
  this.timeout(15000);

  const termOk = 'ipod';
  const termFail = 'xablau';
  const idOk = 'MLA754502455';
  const idFail = 'xablau';

  it("getItems - at least one", (done) => {
    getItems(termOk).then(response => {
      console.log('');
      const { status, data } = response;
      expect(status).to.equal(200);
      expect(data.results).to.have.lengthOf.at.least(1);
    })
    .catch()
    .then(done);
  });

  it("getItems - not found", (done) => {
    getItems(termFail).then(response => {
      console.log('');
      const { status, data } = response;
      expect(status).to.equal(200);
      expect(data.results).to.have.lengthOf(0);
    })
    .catch()
    .then(done);
  });

  it("getItem - success", (done) => {
    getItem(idOk).then(response => {
      console.log('');
      const { status, data } = response;
      expect(status).to.equal(200);
      expect(data.id).to.equal(idOk);
    })
    .catch()
    .then(done);
  });

  it("getItem - not found", (done) => {
    getItem(idFail).then()
    .catch(({ response }) => {
      console.log('');
      const { status, data } = response;
      expect(status).to.equal(404);
      expect(data.error).to.equal('not_found');
    })
    .then(done);
  });
});
