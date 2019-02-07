const { expect } = require('chai');
const { args } = require('../../../../api/helpers');

describe("args tests ", function() {
  const params = ['', '', 'host=http://mercadolibre.com', 'port=8080'];

  it("should returns from parse", function() {
    const parametros = args.parse(params);
    const { host, port } = parametros;
    expect(parametros).to.have.own.property('host');
    expect(parametros).to.have.own.property('port');
    expect(host).equal('http://mercadolibre.com');
    expect(port).equal('8080');
  });

  it("should return from get", function() {
    const host = args.get({ args: params, param: 'host' });
    const port = args.get({ args: params, param: 'port' });
    expect(host).equal('http://mercadolibre.com');
    expect(port).equal('8080');
  });

  it("should returns from parse - empty params", function() {
    const parametros = args.parse();
    console.log(parametros);
    expect(parametros).to.be.empty;
  });

});


