const Joi = require('joi');

const paramsSchema = Joi.object({
    id: Joi.number().integer().required(),
});

const updateAppointmentSchema = Joi.object({
    scheduleId: Joi.number().integer().when('cancel', {
        is: false,
        then: Joi.required(),
        otherwise: Joi.optional(),
    }),
    reason: Joi.string().optional(),
    cancel: Joi.bool().optional(),
});

exports.validateUpdateAppointment = (req, res, next) => {
    const { error: paramsError } = paramsSchema.validate(req.params);
    if (paramsError) {
        return res.status(422).json({ message: paramsError.details[0].message });
    }

    const { error: bodyError } = updateAppointmentSchema.validate(req.body);
    if (bodyError) {
        return res.status(422).json({ message: bodyError.details[0].message });
    }

    next();
};
