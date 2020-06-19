
const Address = require('./domain');
const Mongo = require('../../../../helpers/databases/mongodb/db');
const config = require('../../../../infra/configs/global_config');
const db = new Mongo(config.get('/mongoDbUrl'));

const createAddresses = async (payload) => {
  const address = new Address(db);
  const postCommand = async payload => address.createAddresses(payload);
  return postCommand(payload);
};

const updateAddress = async (payload) => {
  const address = new Address(db);
  const postCommand = async payload => address.updateAddress(payload);
  return postCommand(payload);
};

const deleteAddress = async (payload) => {
  const address = new Address(db);
  const postCommand = async payload => address.deleteAddress(payload);
  return postCommand(payload);
};

module.exports = {
  createAddresses,
  updateAddress,
  deleteAddress,
};
