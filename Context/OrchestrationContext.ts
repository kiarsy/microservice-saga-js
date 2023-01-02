import { StepType } from "../Utilities/StepType";
import { BaseContext } from "./BaseContext";

export class OrchestrationContext {
    constructor(
        protected readonly context: BaseContext,
    ) { }

    get stepKey(): string {
        return this.context._stepKey;
    }

    get payload() {
        return this.context._payload;
    }
    get response() {
        return this.context._response;
    }

    setNextStep(key: string, payload: any = undefined) {
        this.context._steps.push(key);
        this.context._response = undefined;
        this.context._stepKey = this.context._communication.keyRule.generateKeyFor(key, StepType.Step);
        if (payload) {
            this.context._payload = payload;
        }
        this.context._communication.sendEvent(this.context._stepKey, this.context);
    }

    setNextCompensation(): boolean {
        const lastStep = this.context._steps[this.context._steps.length - 1];
        let index = this.context._steps.indexOf(lastStep) - 1;
        if (index < 0) {
            return false;
        }
        const key = this.context._steps[index]
        this.context._steps.push(key);
        this.context._response = undefined;
        this.context._stepKey = this.context._communication.keyRule.generateKeyFor(key, StepType.Compensation);
        this.context._communication.sendEvent(this.context._stepKey, this.context);
        return true;
    }

    retryCompensation()
    {
        const lastStep = this.context._steps[this.context._steps.length - 1];

        this.context._steps.push(lastStep);
        this.context._response = undefined;
        this.context._communication.sendEvent(this.context._stepKey, this.context);
    }

    canRetry(retryAttempt: number): boolean {
        const lastStep = this.context._steps[this.context._steps.length - 1];
        return this.context._steps.filter(it => it === lastStep).length < retryAttempt;
    }
}

