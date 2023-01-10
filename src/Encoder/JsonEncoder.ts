import { IEncoder } from './IEncoder';

export class JsonEncoder extends IEncoder {
  toBuffer(data: Record<string, any>): Buffer {
    return Buffer.from(JSON.stringify(data));
  }
  fromBuffer(data: Buffer): Record<string, any> {
    return JSON.parse(data.toString());
  }
}
