
const wrapper = require('../../../helpers/utils/wrapper');
const commandHandler = require('../repositories/commands/command_handler');
const commandModel = require('../repositories/commands/command_model');
const queryHandler = require('../repositories/queries/query_handler');
const queryModel = require('../repositories/queries/query_model');
const validator = require('../utils/validator');
const { SUCCESS:http } = require('../../../helpers/http-status/status_code');

const getAddresses = async (req, res) => {
  const postRequest = async () => {
    return queryHandler.getAddresses();
  };

  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Get addresses fail')
      : wrapper.response(res, 'success', result, 'Get adresses success', http.OK);
  };
  sendResponse(await postRequest());
};

const getAddress = async (req, res) => {
  const payload = {
    addressId: req.params.addressId
  };
  const validatePayload = validator.isValidPayload(payload, queryModel.getAddress);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return queryHandler.getAddress(result.data);
  };

  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Get address fail')
      : wrapper.response(res, 'success', result, 'Get address success', http.OK);
  };
  sendResponse(await postRequest(validatePayload));
};

const createAddress = async (req, res) => {
  const payload = req.body;
  const validatePayload = validator.isValidPayload(payload, commandModel.createAddress);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return commandHandler.createAddresses(result.data);
  };

  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Create address fail')
      : wrapper.response(res, 'success', result, 'Create address success', http.OK);
  };
  sendResponse(await postRequest(validatePayload));
};

// const updateUser = async (req, res) => {
//   const payload = {
//     userId: req.params.userId,
//     ...req.body
//   };
//   const validatePayload = validator.isValidPayload(payload, commandModel.updateUser);
//   const postRequest = async (result) => {
//     if (result.err) {
//       return result;
//     }
//     return commandHandler.updateUser(result.data);
//   };

//   const sendResponse = async (result) => {
//     (result.err) ? wrapper.response(res, 'fail', result, 'Update user fail')
//       : wrapper.response(res, 'success', result, 'Update user success', http.OK);
//   };
//   sendResponse(await postRequest(validatePayload));
// };

// const deleteUser = async (req, res) => {
//   const payload = {
//     userId: req.params.userId
//   };
//   const validatePayload = validator.isValidPayload(payload, commandModel.userId);
//   const postRequest = async (result) => {
//     if (result.err) {
//       return result;
//     }
//     return commandHandler.deleteUser(result.data);
//   };

//   const sendResponse = async (result) => {
//     (result.err) ? wrapper.response(res, 'fail', result, 'Delete user fail')
//       : wrapper.response(res, 'success', result, 'Delete user success', http.OK);
//   };
//   sendResponse(await postRequest(validatePayload));
// };

module.exports = {
  getAddresses,
  getAddress,
  createAddress,
};
