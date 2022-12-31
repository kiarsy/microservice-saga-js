export abstract class ITransformer {
    to(data: Record<string, any>): Buffer {
        return this.toBuffer(data);
    }

    from(data: Buffer): Record<string, any> {
        return this.fromBuffer(data);
    }

    abstract toBuffer(data: Record<string, any>): Buffer;
    abstract fromBuffer(data: Buffer): Record<string, any>;
}