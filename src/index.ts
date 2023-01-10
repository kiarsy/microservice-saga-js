import { BaseContext } from './Context/BaseContext';
import { ITransport } from './Transport/ITransport';
import { OrchestrationCallback, OrchestrationStepCallback } from './Utilities/types';
import { StepType } from './Utilities/StepType';
import { IKeyRule } from './KeyRule/IKeyRule';
import { DefaultKeyRule } from './KeyRule/DefaultKeyRule';

export class SagaJS {
  constructor(readonly communication: ITransport, readonly keyRule: IKeyRule = new DefaultKeyRule()) {
    communication.keyRule = keyRule;
  }

  public runOrchestration(orchestrationKey: string, payload: any) {
    const id = `${orchestrationKey}_asda-324-34-54-3-`;
    const context = new BaseContext({
      id,
      communication: this.communication,
      stepKey: orchestrationKey,
      orchestrationKey,
      payload,
      steps: [],
      eventSequence: 0,
    });
    this.communication.sendEvent(orchestrationKey, context);
  }

  public createOrchestrationByInstruction(orchestrationKey: string, steps: string[], retryAttempt: number = 3) {
    this.communication.onOrchestration([orchestrationKey], (context, channel) => {
      const keyOp = this.keyRule.destructKey(context.stepKey);

      if (context.response === false && keyOp.type === StepType.Step && context.canRetry(retryAttempt)) {
        context.setNextStep(keyOp.step);
      }
      // if compensation and compensation is failed
      else if (keyOp.type === StepType.Compensation && context.response === false && context.canRetry(retryAttempt)) {
        context.retryCompensation();
      } else if (keyOp.type === StepType.Compensation || context.response === false) {
        // Compensation steps
        if (context.setNextCompensation()) {
          console.log('End Compensation');
        }
      } else {
        const currentIndex = steps.indexOf(keyOp.step);
        const step = steps[currentIndex === steps.length - 1 ? -1 : currentIndex + 1];
        if (step) {
          context.setNextStep(step);
        } else {
          console.log('End Orchestration');
        }
      }
      this.communication.commit();
    });
  }

  public createOrchestrationByCommand(orchestrationKey: string[], callback: OrchestrationCallback) {
    this.communication.onOrchestration(orchestrationKey, callback);
  }

  public runChoreography(key: string, payload: any) {
    return;
  }

  public onOrchestrationStep(stepKey: string, stepType: StepType, callback: OrchestrationStepCallback) {
    this.communication.onOrchestrationStep(this.keyRule.generateKeyFor(stepKey, stepType), callback);
  }
}
