const chai = require('chai');
const sinonChai = require('sinon-chai');
const assert = require('assert');
const { expect } = require('chai');
const sinon = require('sinon');
const rp = require('request-promise');
const ClienteService = require('./ClienteService');

chai.should();
chai.use(sinonChai);

describe('ClienteService.js', () => {
  afterEach(() => {
    if (rp.get.restore) {
      rp.get.restore();
    }
  });

  it('Meu primeiro teste!', () => {
    const a = 1;
    const b = 2;
    const c = a + b;

    assert.equal(c, 3);
  });

  it('Requisição válida email', () => {
    // Given
    const EMAIL = 'maro_bem@hotmail.com';

    // When
    const result = ClienteService.getClienteByEmail(EMAIL);

    // Then
    return result.then((cliente) => {
      assert.equal(cliente.nome, 'Rafael S Romano');
    });
  });
  
  it('Requisição inválida', () => {
    chai.expect(() => {
      ClienteService.getClienteByEmail();
    }).to.be.throws('Email deve ser informado!');
  });
});