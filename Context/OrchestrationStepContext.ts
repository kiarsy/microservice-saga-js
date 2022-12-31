import { BaseContext } from "./BaseContext";

export class OrchestrationStepContext {
    constructor(
        protected readonly context: BaseContext,
    ) { }

    get payload() {
        return this.context._payload;
    }

    complete(payload: any) {
        this.context._payload = { ...this.context._payload, ...payload };
        this.context._communication.sendEvent(this.context._nextStep, this.context);
    }

    fail(error: any) {
        this.context._payload = { ...this.context._payload, error: error };
        this.context._communication.sendEvent(this.context._nextStep, this.context);
    }
}