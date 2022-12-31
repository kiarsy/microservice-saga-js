import { BaseContext } from "./BaseContext";

export class OrchestrationContext {
    constructor(
        protected readonly context: BaseContext,
    ) { }

    get currentStep(): string {
        return this.context._currentStep;
    }

    get payload() {
        return this.context._payload;
    }

    setNextStep(key: string, payload: any = undefined) {
        this.context._steps.push(key);
        this.context._currentStep = key;
        this.context._nextStep = this.context._key;
        if (payload) {
            this.context._payload = payload;
        }
        this.context._communication.sendEvent(key, this.context);
    }

    startCompensation() {

    }
}

