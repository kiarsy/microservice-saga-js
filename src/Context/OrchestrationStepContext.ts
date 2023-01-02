import { StepType } from '../Utilities/StepType';
import { BaseContext } from './BaseContext';

export class OrchestrationStepContext {
  constructor(protected readonly context: BaseContext) {}

  get payload() {
    return this.context._payload;
  }

  complete(payload: any) {
    this.context._payload = { ...this.context._payload, ...payload };
    this.context._response = true;
    this.context._communication.commit();
    this.context._communication.sendEvent(this.context._orchestrationKey, this.context);
  }

  fail(reason: any) {
    this.context._payload = { ...this.context._payload, reason };
    this.context._response = false;
    this.context._communication.commit();
    this.context._communication.sendEvent(this.context._orchestrationKey, this.context);
  }
}
