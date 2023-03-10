import { BaseContext } from '../Context/BaseContext';
import { IKeyRule } from '../KeyRule/IKeyRule';
import { ITransformer } from '../Transformer/ITransformer';
import { OrchestrationCallback, OrchestrationStepCallback } from '../Utilities/types';

export abstract class ICommunication {
  keyRule!: IKeyRule;

  constructor(protected readonly transformer: ITransformer) {}

  public sendEvent(key: string, payload: BaseContext) {
    payload.increaseEventSequence();
    this.sendEventToKey(key, this.transformer.to(payload.toJson()));
  }
  abstract sendEventToKey(key: string, payload: Buffer): void;
  abstract onChoreographyStep(key: string, callback: OrchestrationStepCallback): void;
  abstract onOrchestrationStep(key: string, callback: OrchestrationStepCallback): void;
  abstract onOrchestration(orchestrationKey: string[], callback: OrchestrationCallback): void;
  abstract commit(): void;
}
