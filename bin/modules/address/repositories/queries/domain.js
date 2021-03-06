
const Query = require('./query');
const wrapper = require('../../../../helpers/utils/wrapper');
const { NotFoundError } = require('../../../../helpers/error');
const logger = require('../../../../helpers/utils/logger');

class Address {

  constructor(db) {
    this.query = new Query(db);
  }

  async getAddresses() {
    const ctx = 'getAdresses';
    const address = await this.query.findAddress({});
    if (address.err) {
      logger.error(ctx, 'error', 'Can not find addresses', address.err);
      return wrapper.error(new NotFoundError('Can not find addresses'));
    }
    const { data } = address;
    data.map(v => {
      delete v.password;
    });

    logger.info(ctx, 'success', 'Get addresses success', data);
    return wrapper.data(data);
  }

  async getAddress(payload) {
    const ctx = 'getAddress';
    const address = await this.query.findOneAddress({ addressId: payload.addressId });
    if (address.err) {
      logger.error(ctx, 'error', 'Can not find address', address.err);
      return wrapper.error(new NotFoundError('Can not find address'));
    }
    const { data } = address;

    logger.info(ctx, 'success', 'Get address success', data);
    return wrapper.data(data);
  }
}

module.exports = Address;
