import Joi from 'joi';

export const validateGroup = (data: any) => {
  const schema = Joi.object({
    name: Joi.string().required()
  });

  return schema.validate(data);
};
