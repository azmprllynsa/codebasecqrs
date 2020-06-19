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

const updateAddress = joi.object({
  addressId: joi.string().required(),
  zipCode: joi.string(),
  country: joi.string(),
  province: joi.string(),
  city: joi.string(),
  subDistrict: joi.string(),
  rw: joi.string(),
  rt: joi.string(),
  address: joi.string().required(),

});

const addressId = joi.object({
  addressId: joi.string().required()
});

module.exports = {
  createAddress,
  address,
  updateAddress,
  addressId
};
