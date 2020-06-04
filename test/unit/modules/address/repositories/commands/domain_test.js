const Address = require('../../../../../../bin/modules/address/repositories/commands/domain');
const command = require('../../../../../../bin/modules/address/repositories/commands/command');
const query = require('../../../../../../bin/modules/address/repositories/queries/query');
const sinon = require('sinon');
const assert = require('assert');
const logger = require('../../../../../../bin/helpers/utils/logger');

describe('Address-commandDomain', () =>{
  beforeEach(async () => {
    sinon.stub(logger, 'log');
    sinon.stub(logger, 'info');
    sinon.stub(logger, 'error');
  });

  afterEach(async () => {
    logger.log.restore();
    logger.info.restore();
    logger.error.restore();
  });

  describe('createAddress', () => {

    const db = {
      setCollection: sinon.stub()
    };

    const address = new Address(db);

    it('should return internal server error', async() => {
      let queryResult = {
        err: true,
        data: ''
      };
      let payload = {
        zipCode : '35375',
        country : 'Indonesia',
        province : 'Lampung',
        city : 'Pringsewu',
        subDistrict : 'Pagelaran',
        rw : '2',
        rt : '3',
        address : 'Jl. Widoro Payung no. 369'
      };
      sinon.stub(query.prototype, 'findOneAddress').resolves(queryResult);
      sinon.stub(command.prototype, 'insertOneAddress').resolves({err: true});
      const result = await address.createAddresses (payload);
      query.prototype.findOneAddress.restore();
      command.prototype.insertOneAddress.restore();
      assert.equal(result.err.message, 'Internal server error');
    });

    it('should return success create address', async() => {
      let queryResult = {
        err: true,
        data: ''
      };
      let payload = {
        zipCode : '35375',
        country : 'Indonesia',
        province : 'Lampung',
        city : 'Pringsewu',
        subDistrict : 'Pagelaran',
        rw : '2',
        rt : '3',
        address : 'Jl. Widoro Payung no. 369'
      };
      sinon.stub(query.prototype, 'findOneAddress').resolves(queryResult);
      sinon.stub(command.prototype, 'insertOneAddress').resolves({err: null, data: { zipCode : '35375' }});
      const result = await address.createAddresses(payload);
      query.prototype.findOneAddress.restore();
      command.prototype.insertOneAddress.restore();
      assert.equal(result.data.zipCode, '35375');
    });
  });

  describe('updateAddress', () => {

    const db = {
      setCollection: sinon.stub()
    };

    const address = new Address(db);

    it('should return internal server error', async() => {
      let queryResult = {
        err: true,
        data: ''
      };
      let payload = {
        zipCode : '35375',
        country : 'Indonesia',
        province : 'Lampung',
      };
      sinon.stub(command.prototype, 'upsertOneAddress').resolves(queryResult);
      const result = await address.updateAddress(payload);
      command.prototype.upsertOneAddress.restore();
      assert.equal(result.err.message, 'Internal server error');
    });

    it('should return success update address', async() => {
      let queryResult = {
        err: null,
        data: {
          zipCode : '35375',
          country : 'Indonesia',
          province : 'Lampung',
        }
      };
      let payload = {
        zipCode : '35375',
        country : 'Indonesia',
        province : 'Lampung',
      };
      sinon.stub(command.prototype, 'upsertOneAddress').resolves(queryResult);
      const result = await address.updateAddress(payload);
      command.prototype.upsertOneAddress.restore();
      assert.equal(result.data.zipCode, '35375');
    });
  });

  describe('deleteAddress', () => {

    const db = {
      setCollection: sinon.stub()
    };

    const address = new Address(db);

    it('should return internal server error', async() => {
      let queryResult = {
        err: true,
        data: ''
      };
      let payload = {
        addressId : 'blabla',
      };
      sinon.stub(command.prototype, 'deleteOneAddress').resolves(queryResult);
      const result = await address.deleteAddress(payload);
      command.prototype.deleteOneAddress.restore();
      assert.equal(result.err.message, 'Internal server error');
    });

    it('should return success delete address', async() => {
      let queryResult = {
        err: null,
        data: ''
      };
      let payload = {
        addressId : 'blabla',
      };
      sinon.stub(command.prototype, 'deleteOneAddress').resolves(queryResult);
      const result = await address.deleteAddress(payload);
      command.prototype.deleteOneAddress.restore();
      assert.equal(result.err, null);
    });
  });
});
