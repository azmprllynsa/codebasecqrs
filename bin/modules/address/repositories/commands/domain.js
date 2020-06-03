
const Command = require('./command');
const Query = require('../queries/query');
const model = require('./command_model');
const wrapper = require('../../../../helpers/utils/wrapper');
const logger = require('../../../../helpers/utils/logger');
const { InternalServerError } = require('../../../../helpers/error');
const uuidv4 = require('uuid/v4');
// const common = require('../../utils/common');

class Address {

  constructor(db) {
    this.command = new Command(db);
    this.query = new Query(db);
  }

  async createAddresses(data) {
    const ctx = 'createAddress';
    const address = model.address();
    address.addressId = uuidv4();
    address.zipCode = data.zipCode;
    address.country = data.country;
    address.province = data.province;
    address.city = data.city;
    address.subDistrict = data.subDistrict;
    address.rw = data.rw;
    address.rt = data.rt;
    address.address = data.address;
    address.createdAt = new Date();
    address.lastModified = new Date();

    const saveAddress = await this.command.insertOneAddress(address);
    if (saveAddress.err) {
      logger.error(ctx,'error', 'Internal server error', saveAddress.err);
      return wrapper.error(new InternalServerError('Internal server error'));
    }
    delete address.password;
    logger.info(ctx, 'success', 'Create address success', address);
    return wrapper.data(address, 'Create address success', 100);
  }

  async updateAddress(data) {
    const ctx = 'updateAddress';

    const document = {
      $set: {
        zipCode : data.zipCode,
        country : data.country,
        province : data.province,
        city : data.city,
        subDistrict : data.subDistrict,
        rw : data.rw,
        rt : data.rt,
        address : data.address,
      }
    };

    const saveAddress = await this.command.upsertOneAddress({ addressId: data.addressId }, document);
    if (saveAddress.err) {
      logger.error(ctx,'error', 'Internal server error', saveAddress.err);
      return wrapper.error(new InternalServerError('Internal server error'));
    }
    logger.info(ctx, 'success', 'Update user success', saveAddress.data);
    return wrapper.data(saveAddress.data, 'Update user success', 200);
  }

  async deleteAddress(data) {
    const ctx = 'deleteAddress';
    const delAddress = await this.command.deleteOneAddress({ addressId: data.addressId });
    if (delAddress.err) {
      logger.error(ctx,'error', 'Internal server error', delAddress.err);
      return wrapper.error(new InternalServerError('Internal server error'));
    }

    logger.info(ctx, 'success', 'Delete address success', '');
    return wrapper.data('', 'Delete address success', 200);
  }

}

module.exports = Address;
