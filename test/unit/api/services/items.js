const { expect } = require('chai');
const { getItem, getItems } = require('../../../../api/services/items');

describe("service items tests", function() {
  this.timeout(15000);

  const termOk = 'ipod';
  const termFail = 'xablau';
  const idOk =  {
    withDescription: 'MLA754502455',
    withoutDescription: 'MLA769875051'
  };
  const idFail = 'xablau';

  it("getItems - at least one", done => {
    getItems(termOk).then(response => {
      console.log('');
      const { status, data } = response;
      expect(status).to.equal(200);
      expect(data.results).to.have.lengthOf.at.least(1);
    })
    .catch()
    .then(done);
  });

  it("getItems - not found", done => {
    getItems(termFail).then(response => {
      console.log('');
      const { status, data } = response;
      expect(status).to.equal(200);
      expect(data.results).to.have.lengthOf(0);
    })
    .catch()
    .then(done);
  });

  it("getItem - success with description", done => {
    getItem(idOk.withDescription).then(response => {
      console.log('');
      const { status, data } = response;
      expect(status).to.equal(200);
      expect(data.id).to.equal(idOk.withDescription);
      expect(data.description).to.not.equal('');
    })
    .catch()
    .then(done);
  });

  it("getItem - success without description", done => {
    getItem(idOk.withoutDescription).then(response => {
      console.log('');
      const { status, data } = response;
      expect(status).to.equal(200);
      expect(data.id).to.equal(idOk.withoutDescription);
      expect(data.description).to.equal('');;
    })
    .catch()
    .then(done);
  });

  it("getItem - not found", done => {
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
