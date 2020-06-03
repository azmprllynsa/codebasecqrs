
const Address = require('./domain');
const Mongo = require('../../../../helpers/databases/mongodb/db');
const config = require('../../../../infra/configs/global_config');
const db = new Mongo(config.get('/mongoDbUrl'));

const createAddresses = async (payload) => {
  const address = new Address(db);
  const postCommand = async payload => address.createAddresses(payload);
  return postCommand(payload);
};

// const updateUser = async (payload) => {
//   const user = new User(db);
//   const postCommand = async payload => user.updateUser(payload);
//   return postCommand(payload);
// };

// const deleteUser = async (payload) => {
//   const user = new User(db);
//   const postCommand = async payload => user.deleteUser(payload);
//   return postCommand(payload);
// };

module.exports = {
  createAddresses,
};
