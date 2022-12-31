import { ICommunication } from "../Communication/ICommunication";
import { SagaContextParam } from "../Utilities/types";



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



