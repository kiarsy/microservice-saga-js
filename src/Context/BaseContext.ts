import { ITransport } from '../Transport/ITransport';
import { SagaContextParam } from '../Utilities/types';

export class BaseContext {
  _id: string;
  _orchestrationKey: string;
  _payload: any;
  _stepKey: string;
  _communication: ITransport;
  _steps: string[];
  _eventSequence: number = 0;
  _response?: boolean;
  constructor(params: SagaContextParam) {
    this._id = params.id;
    this._orchestrationKey = params.orchestrationKey;
    this._payload = params.payload;
    this._stepKey = params.stepKey;
    this._communication = params.communication;
    this._steps = params.steps;
    this._eventSequence = params.eventSequence;
    this._response = params.response;
  }

  // static fromJson(jsonString: string) {
  //     return JSON.parse(jsonString);
  // }

  toJson() {
    return {
      id: this._id,
      orchestrationKey: this._orchestrationKey,
      payload: this._payload,
      stepKey: this._stepKey,
      steps: this._steps,
      eventSequence: this._eventSequence,
      response: this._response,
    };
  }

  increaseEventSequence() {
    this._eventSequence++;
  }
}
