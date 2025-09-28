import * as joi from 'joi';
import { EnvironmentEnum } from './configApp';

export const validationSchema = joi.object({
  NODE_ENV: joi.string().default(EnvironmentEnum.DEV),
  KAFKA_BROKER_0: joi.string().required(),
});
