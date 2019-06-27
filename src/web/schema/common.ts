import * as Joi from "joi";
import * as JoiPhoneNumber from "joi-phone-number";
import {allRoles} from "../../auth/role";
import {exist} from "joi";

export const joi: typeof Joi = Joi.extend(JoiPhoneNumber);

export const Password = () => joi.string().max(72);
export const Email = () => joi.string().email();
export const Phone = () => joi.string().phoneNumber();
export const Role = () => joi.string().valid(allRoles);
export const ObjectId = () => joi.string().hex().length(24);
export const ImageArray = () => joi.array().items(joi.object({
    title: joi.string().required(),
    alt: joi.string().required(),
    image: ObjectId().required()
}));
export const singleOrArray = (schema: () => Joi.Schema) => joi.alt().try(schema(), joi.array().items(schema()));
export const numberFilter = () => joi.alt().try(
    joi.number(),
    joi.object({
        lte: joi.number(),
        lt: joi.when("lte", {is: joi.exist(), then: joi.forbidden(), otherwise: joi.number()}),
        gte: joi.number(),
        gt: joi.when("gte", {is: joi.exist(), then: joi.forbidden(), otherwise: joi.number()})
    })
        /*.when(joi.object({lt: joi.exist()}), {then: {lte: joi.forbidden()}})
        .when(joi.object({lte: joi.exist()}), {then: {lt: joi.forbidden()}})
        .when(joi.object({gt: joi.exist()}), {then: {gte: joi.forbidden()}})
        .when(joi.object({gte: joi.exist()}), {then: {gt: joi.forbidden()}})*/
);
