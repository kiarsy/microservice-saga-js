import { ITransformer } from "./ITransformer";

export class JsonTransformer extends ITransformer {
    toBuffer(data: Record<string, any>): Buffer {
        return Buffer.from(JSON.stringify(data));
    }
    fromBuffer(data: Buffer): Record<string, any> {
        return JSON.parse(data.toString());
    }
}