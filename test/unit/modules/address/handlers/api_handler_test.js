const sinon = require('sinon');
const { expect } = require('chai');
const addressHandler = require('../../../../../bin/modules/address/handlers/api_handler');
const commandHandler = require('../../../../../bin/modules/address/repositories/commands/command_handler');
const queryHandler = require('../../../../../bin/modules/address/repositories/queries/query_handler');
const validator = require('../../../../../bin/modules/address/utils/validator');

describe('Address Api Handler', () => {

  let res;
  beforeEach(() => {
    res = {
      send: function () {
        return true;
      }
    };
  });

  const req = {
    body: {},
    params: {},
    query: {},
    authorization: {
      credentials: 'xx'
    }
  };

  const resultSuccess = {
    err: null,
    message: 'success',
    data: [],
    code: 200
  };

  const resultError = {
    err: true
  };

  describe('getAddresses', () => {
    it ('should cover error validation', async () => {
      await addressHandler.getAddresses(req, res);
    });
    it('Should return error', async () => {
      sinon.stub(validator, 'isValidPayload').resolves({
        err: true,
        data: {}
      });
      sinon.stub(queryHandler, 'getAddresses').resolves(resultError);
      expect(await addressHandler.getAddresses(req, res));
      validator.isValidPayload.restore();
      queryHandler.getAddresses.restore();
    });
    it('Should return success', async () => {
      sinon.stub(validator, 'isValidPayload').resolves({
        err: true,
        data: {}
      });
      sinon.stub(queryHandler, 'getAddresses').resolves(resultSuccess);
      expect(await addressHandler.getAddresses(req, res));
      validator.isValidPayload.restore();
      queryHandler.getAddresses.restore();
    });
  });

  describe('getAddress', () => {
    it('Should cover error validation', async () => {
      await addressHandler.getAddress(req, res);
    });
    it('Should return error', async () => {
      sinon.stub(validator, 'isValidPayload').resolves({
        err: true,
        data: {}
      });
      sinon.stub(queryHandler, 'getAddress').resolves(resultError);
      expect(await addressHandler.getAddress(req, res));
      validator.isValidPayload.restore();
      queryHandler.getAddress.restore();
    });
    it('Should return success', async () => {
      sinon.stub(validator, 'isValidPayload').resolves({
        err: true,
        data: {}
      });
      sinon.stub(queryHandler, 'getAddress').resolves(resultSuccess);
      expect(await addressHandler.getAddress(req, res));
      validator.isValidPayload.restore();
      queryHandler.getAddress.restore();
    });
  });

  describe('createAddress', () => {
    it('Shoulr cover error validation', async () => {
      await addressHandler.createAddress(req, res);
    });
    it('Should return error', async () => {
      sinon.stub(validator, 'isValidPayload').resolves({
        err:true,
        data: {}
      });
      sinon.stub(commandHandler, 'createAddresses').resolves(resultError);
      expect(await addressHandler.createAddress(req, res));
      validator.isValidPayload.restore();
      commandHandler.createAddresses.restore();
    });
    it('Should return success', async () => {
      sinon.stub(validator, 'isValidPayload').resolves({
        err: true,
        data: {}
      });
      sinon.stub(commandHandler, 'createAddresses').resolves(resultSuccess);
      expect(await addressHandler.createAddress(req, res));
      validator.isValidPayload.restore();
      commandHandler.createAddresses.restore();
    });
  });

  describe('updateAddress', () => {
    it('Should cover error validation', async () => {
      await addressHandler.updateAddress(req, res);
    });
    it('Should return error', async () => {
      sinon.stub(validator, 'isValidPayload').resolves({
        err: true,
        data: {}
      });
      sinon.stub(commandHandler, 'updateAddress').resolves(resultError);
      expect(await addressHandler.updateAddress(req, res));
      validator.isValidPayload.restore();
      commandHandler.updateAddress.restore();
    });
    it('Should return success', async () => {
      sinon.stub(validator, 'isValidPayload').resolves({
        err: true,
        data: {}
      });
      sinon.stub(commandHandler, 'updateAddress').resolves(resultSuccess);
      expect(await addressHandler.updateAddress(req, res));
      validator.isValidPayload.restore();
      commandHandler.updateAddress.restore();
    });
  });

  describe('deleteAddress', async () => {
    it('Should cover error validation', async () => {
      await addressHandler.deleteAddress(req, res);
    });
    it('Should return error', async () => {
      sinon.stub(validator, 'isValidPayload').resolves({
        err: true,
        data: {}
      });
      sinon.stub(commandHandler, 'deleteAddress').resolves(resultError);
      expect(await addressHandler.deleteAddress(req, res));
      validator.isValidPayload.restore();
      commandHandler.deleteAddress.restore();
    });
    it('Should return success', async () => {
      sinon.stub(validator, 'isValidPayload').resolves({
        err: true,
        data: {}
      });
      sinon.stub(commandHandler, 'deleteAddress').resolves(resultSuccess);
      expect(await addressHandler.deleteAddress(req, res));
      validator.isValidPayload.restore();
      commandHandler.deleteAddress.restore();
    });
  });
});

