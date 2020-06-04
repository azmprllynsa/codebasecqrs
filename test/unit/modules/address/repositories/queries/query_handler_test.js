const queryHandler = require('../../../../../../bin/modules/address/repositories/queries/query_handler');
const Address = require('../../../../../../bin/modules/address/repositories/queries/domain');
const sinon = require('sinon');
const assert = require('assert');

describe('Address-queryHandler', () => {

  const data = {
    success: true,
    data: 'a0348e6d-063e-4da0-b36a-f469f96158e2',
    message: 'Your Request Has Been Processed',
    code: 200
  };

  const payload = {
    'addressId': 'Your Request Has Been Processed'
  };

  describe('getAddresses', () => {

    it ('Should return get addresses', async() => {
      sinon.stub(Address.prototype, 'getAddresses').resolves(data);

      const rs = await queryHandler.getAddresses();

      assert.notEqual(rs.data, null);
      assert.equal(rs.code, 200);

      Address.prototype.getAddresses.restore();
    });
  });

  describe('getAddress', () => {

    it('should return get address', async() => {
      sinon.stub(Address.prototype, 'getAddress').resolves(data);

      const rs = await queryHandler.getAddress(payload);

      assert.notEqual(rs.data, null);
      assert.equal(rs.code, 200);

      Address.prototype.getAddress.restore();
    });
  });
});
