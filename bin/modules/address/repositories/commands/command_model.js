const joi = require('joi');

const createAddress = joi.object({
  zipCode: joi.string().required(),
  country: joi.string().required(),
  province: joi.string().required(),
  city: joi.string().required(),
  subDistrict: joi.string().required(),
  rw: joi.string().required(),
  rt: joi.string().required(),
  address: joi.string().required(),
});

const address = () => {
  const model = {
    addressId: '',
    zipCode: '',
    country: '',
    province: '',
    city: '',
    subDistrict: '',
    rw: '',
    rt: '',
    address: '',
    createdAt: '',
    lastModified: ''
  };
  return model;
};

// const updateUser = joi.object({
//   userId: joi.string().required(),
//   fullName: joi.string().required(),
//   mobileNumber: joi.string().min(8).max(15).regex(/^(\+62|62|0)/).required()
// });

// const userId = joi.object({
//   userId: joi.string().required()
// });

module.exports = {
  createAddress,
  address,
  // updateUser,
  // userId
};
