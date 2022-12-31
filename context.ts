import { ICommunication } from "./Communication/ICommunication";

export type SagaContextParam = {
    id: string, key: string,
    payload: any,
    currentStep: string, nextStep: string,
    steps: string[], eventSequence: number,
    communication: ICommunication
};

export class BaseContext {
    _id: string;
    _key: string;
    _payload: any;
    _currentStep: string;
    _nextStep: string;
    _communication: ICommunication;
    _steps: string[];
    _eventSequence: number = 0;
    constructor(
        params: SagaContextParam,
    ) {
        this._id = params.id;
        this._key = params.key;
        this._payload = params.payload;
        this._currentStep = params.currentStep;
        this._nextStep = params.nextStep;
        this._communication = params.communication;
        this._steps = params.steps;
        this._eventSequence = params.eventSequence;
    }

    // static fromJson(jsonString: string) {
    //     return JSON.parse(jsonString);
    // }

    toJson() {
        return {
            id: this._id,
            key: this._key,
            payload: this._payload,
            currentStep: this._currentStep,
            nextStep: this._nextStep,
            steps: this._steps,
            eventSequence: this._eventSequence
        };
    }

    increaseEventSequence() {
        this._eventSequence++;
    }
}

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


export class ChoreographyStepContext extends BaseContext { }