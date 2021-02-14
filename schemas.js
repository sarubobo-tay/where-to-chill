const Joi = require('joi');



module.exports.barSchema = Joi.object({
    bars:Joi.object({
        name:Joi.string().required(),
        // location:{display_address:Joi.string().required()}
        // location:{zip_code:Joi.number().required()}
    }).required()
})
