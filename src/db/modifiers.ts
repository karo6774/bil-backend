import {Schema} from "mongoose";
import {Modifier} from "./utils";

export const required: Modifier<any> = opts => ({...opts, required: true});

export const ref: (collection: string) => Modifier<typeof Schema.Types.ObjectId> =
    collection => opts => ({...opts, ref: collection});

export const def: (v: any) => Modifier<any> =
    v => opts => ({...opts, default: v});
