
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

  // async updateUser(data) {
  //   const ctx = 'updateUser';
  //   if (/^(\+62|62|0)/.test(data.mobileNumber)) {
  //     data.mobileNumber = data.mobileNumber.replace(/^(\+62|62|0)/, '0');
  //   }

  //   const document = {
  //     $set: {
  //       fullName: data.fullName,
  //       mobileNumber: data.mobileNumber
  //     }
  //   };

  //   const saveAddress = await this.command.upsertOneUser({ userId: data.userId }, document);
  //   if (saveAddress.err) {
  //     logger.error(ctx,'error', 'Internal server error', saveAddress.err);
  //     return wrapper.error(new InternalServerError('Internal server error'));
  //   }
  //   delete saveAddress.data.password;
  //   logger.info(ctx, 'success', 'Update user success', saveAddress.data);
  //   return wrapper.data(saveAddress.data, 'Update user success', 200);
  // }

  // async deleteUser(data) {
  //   const ctx = 'deleteUser';
  //   const delUser = await this.command.deleteOneUser({ userId: data.userId });
  //   if (delUser.err) {
  //     logger.error(ctx,'error', 'Internal server error', delUser.err);
  //     return wrapper.error(new InternalServerError('Internal server error'));
  //   }

  //   logger.info(ctx, 'success', 'Delete user success', '');
  //   return wrapper.data('', 'Delete user success', 200);
  // }

}

module.exports = Address;
