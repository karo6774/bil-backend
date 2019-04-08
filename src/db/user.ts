import {arrayProp, instanceMethod, prop, Ref, Typegoose} from "typegoose";
import * as Mongoose from "mongoose";
import * as IsEmail from "isemail";
import {issueToken} from "../auth/token";
import {compare, hash} from "../auth/hash";
import {Role} from "../auth/role";
import {Booking} from "./booking";

export class User extends Typegoose {
    @prop({required: true})
    firstName!: string;

    @prop({required: true})
    lastName!: string;

    @prop({required: true, unique: true, validate: IsEmail.validate})
    email!: string;

    @prop({required: true})
    phone!: string;

    @arrayProp({itemsRef: Booking})
    bookings!: Ref<Booking>[];

    @prop({required: true})
    passwordHash!: string;

    @prop({required: true, enum: Role})
    role!: Role;

    @instanceMethod
    issueToken(this: User & Mongoose.Document) {
        return issueToken(this.id);
    }

    @instanceMethod
    comparePassword(password: string) {
        return compare(this.passwordHash, password);
    }

    @instanceMethod
    async setPassword(password: string) {
        this.passwordHash = await hash(password);
    }

    @instanceMethod
    toCleanObject(this: User & Mongoose.Document) {
        this.toObject({
            transform(doc, ret) {
                // drop passwordHash
                const {passwordHash, ...cleaned} = ret;
                return cleaned;
            }
        })
    }
}

export const UserModel = new User().getModelForClass(User);
