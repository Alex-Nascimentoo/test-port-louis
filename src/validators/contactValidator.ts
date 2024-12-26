import Joi from 'joi';

export const validateContact = (data: any) => {
  const schema = Joi.object({
    name: Joi.string()
      .pattern(/^\S+(?:\s+\S+)+$/)
      .required()
      .messages({
        'string.pattern.base': 'Name must contain at least two words'
      }),
    phone: Joi.string()
      .pattern(/^\(\d{2}\)\s\d{4}-\d{4}$/)
      .required()
      .messages({
        'string.pattern.base': 'Phone must be in format (xx) xxxx-xxxx'
      })
  });

  data.name = data.name.trim();

  return schema.validate(data);
};
