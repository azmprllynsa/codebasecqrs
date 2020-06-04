const assert = require('assert');
const sinon = require('sinon');

const Query = require('../../../../../../bin/modules/address/repositories/queries/query');

describe('findAddresses', () => {
  const db = {
    setCollection: sinon.stub(),
    findMany: sinon.stub().resolves({
      'err': null,
      'data': [
        {
          '_id': '5ed5f8d6dda8620fcc5a8c7c',
          'zipCode': '35375',
          'country': 'Indonesia'
        }
      ]
    })
  };
  it('should return success get address', async() => {
    const query = new Query(db);
    const result = await query.findAddress({});
    assert.notEqual(result.data, null);
    assert.equal(result.data.length, 1);
  });

  describe('findOneAddress', () => {
    const db = {
      setCollection: sinon.stub(),
      findOne: sinon.stub().resolves({
        'err': null,
        'data': {
          '_id': '5ed5f8d6dda8620fcc5a8c7c',
          'zipCode': '35375',
          'country': 'Indonesia'
        }
      })
    };
    it('should return success get address', async() => {
      const query = new Query(db);
      const result = await query.findOneAddress({});
      assert.notEqual(result.data, null);
      assert.equal(result.data.country, 'Indonesia');
    });
  });
});
