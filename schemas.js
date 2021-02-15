const Joi = require('joi');


module.exports.barSchema = Joi.object({
    bars: Joi.object({
        name:Joi.string(),
        // display_address:Joi.string(),
        location: Joi.object({
            // address1:Joi.string().allow('').allow(null).regex(/^\w+(?:\s+\w+)*$/),
            address1:Joi.number(),
            address2:Joi.string().empty(''),
            address3:Joi.string().empty(''),
            city:Joi.string(),
            state:Joi.string(),
            display_address:Joi.number(),
            // display_address:Joi.string().regex(/^\w+(?:\s+\w+)*$/),
            zip_code:Joi.number()
        }),
        image_url: Joi.string().required(),
        is_closed: Joi.boolean(),
        review_count: Joi.number(),
        categories: Joi.object({
            alias: Joi.string(),
            title: Joi.string()
        }),
        rating: Joi.number(),
        price: Joi.string().required(),
        coordinates: Joi.object({
            latitude: Joi.number(),
            longitude: Joi.number()
        }),
        phone: Joi.string(),
        display_phone: Joi.string(),
        distnace: Joi.number(),

    })
});
// const locationSchema = Joi.object({
//     // address1: Joi.number(),
//     // address2: Joi.string().empty(''),
//     // address3: Joi.string().empty(''),
//     city: Joi.string(),
//     state: Joi.string(),
//     // display_address: Joi.string().regex(/^\w+(?:\s+\w+)*$/),
//     display_address: Joi.number(),
//     zip_code: Joi.number()
// });

// module.exports.barSchema = Joi.object({
//     bars: Joi.object({
//         name: Joi.string().required(),
//         location: Joi.object({
//             address1: Joi.number(),
//             address2: Joi.string().empty(''),
//             address3: Joi.string().empty(''),
//             city: Joi.string(),
//             state: Joi.string(),
//             display_address: Joi.array().items(Joi.string()),
//             // display_address: Joi.number(),
//             zip_code: Joi.number()
//         }),
//         image_url: Joi.string().required(),
//         is_closed: Joi.boolean(),
//         review_count: Joi.number(),
//         categories: Joi.object({
//             alias: Joi.string(),
//             title: Joi.string()
//         }),
//         rating: Joi.number(),
//         price: Joi.string().required(),
//         phone: Joi.string(),
//         display_phone: Joi.string(),
//         distnace: Joi.number(),
//     })
// });

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required(),
        body: Joi.string().required()
    })
});