import * as Koa from "koa";
import {Bike, BikeController, BikeDocument} from "../../db/bike";
import {AuthLevel} from "../../auth/role";
import {Filter} from "../../db/controller/filter";

export async function getBike(ctx: Koa.Context, id: string): Promise<BikeDocument | nil> {
    return BikeController.find(id);
}

export async function listBikes(ctx: Koa.Context, filter: Filter<Bike> = {}): Promise<BikeDocument[]> {
    return BikeController.list(filter);
}

export interface CreateBikeOptions {
    title: string;
    description: string;
    price: number;
    categories: string[];
    images: string[];
    featuredImage?: number;
}

export async function createBike(ctx: Koa.Context, opts: CreateBikeOptions): Promise<BikeDocument> {
    ctx.testPermission(AuthLevel.Manager);

    const bike = BikeController.newDocument(opts);
    await bike.save();

    return bike;
}
