import * as Koa from "koa";
import * as Logic from "../../../web/logic/users";
import {ObjectId} from "../../schema/common";

export const GetOneUser: Koa.Middleware = async ctx => {
    const {id} = ctx.params;
    if (ObjectId().validate(id).error) {
        return ctx.throw(404);
    }

    const user = await Logic.getUser(ctx, id);

    if (!user) {
        return ctx.throw(404);
    } else {
        ctx.status = 200;
        return user.toCleanObject();
    }
};

export const GetMultipleUsers: Koa.Middleware = async ctx => {
    const users = await Logic.listUsers(ctx);
    ctx.status = 200;
    return users.map(it => it.toCleanObject());
};
