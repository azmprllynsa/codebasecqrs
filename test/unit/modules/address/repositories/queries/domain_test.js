const Address = require('../../../../../../bin/modules/address/repositories/queries/domain');
const query = require('../../../../../../bin/modules/address/repositories/queries/query');
const sinon = require('sinon');
const assert = require('assert');
const logger = require('../../../../../../bin/helpers/utils/logger');

describe('Address-queryDomain', () => {
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

  describe('getAddresses', () => {

    const db = {
      setCollection: sinon.stub()
    };

    const address = new Address(db);

    it('should return not found error', async() => {
      let queryResult = {
        err: true,
        data: ''
      };
      sinon.stub(query.prototype, 'findAddress').resolves(queryResult);
      const result = await address.getAddresses();
      query.prototype.findAddress.restore();
      assert.notEqual(result.err, null);
    });
    it('should return get address success', async() => {
      let queryResult = {
        err: null,
        data: [
          {
            addressId: 'blabla',
            zipCode: '35375',
            country: 'Indonesia'
          }
        ]
      };
      sinon.stub(query.prototype, 'findAddress').resolves(queryResult);
      const result = await address.getAddresses();
      query.prototype.findAddress.restore();
      assert.equal(result.data.length, 1);
    });
  });

  describe('getAddress', () => {

    const db = {
      setCollection: sinon.stub()
    };

    const address = new Address(db);

    it('should return not found error', async() => {
      let queryResult = {
        err: true,
        data: ''
      };
      let payload = {
        addressId: 'blabla'
      };
      sinon.stub(query.prototype, 'findOneAddress').resolves(queryResult);
      const result = await address.getAddress(payload);
      query.prototype.findOneAddress.restore();
      assert.notEqual(result.err, null);
    });

    it('should return get address success', async() => {
      let queryResult = {
        err: null,
        data: {
          addressId: 'blabla',
          address: 'blabla@gmail.com'
        }
      };
      let payload = {
        addressId: 'blabla'
      };
      sinon.stub(query.prototype, 'findOneAddress').resolves(queryResult);
      const result = await address.getAddress(payload);
      query.prototype.findOneAddress.restore();
      assert.equal(result.data.address, 'blabla@gmail.com');
    });
  });
});
