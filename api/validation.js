const Joi = require( 'joi' )

module.exports = {
  isString: val => {
    const { value } = Joi.string().validate( val )
    return !!value
  }
}