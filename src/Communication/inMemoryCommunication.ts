import { BaseContext } from '../Context/BaseContext';
import { ICommunication } from './ICommunication';
import { ITransformer } from '../Transformer/ITransformer';
import { OrchestrationCallback, OrchestrationStepCallback } from '../Utilities/types';
import { OrchestrationStepContext } from '../Context/OrchestrationStepContext';
import { OrchestrationContext } from '../Context/OrchestrationContext';
import { JsonTransformer } from '../Transformer/JsonTransformer';

export class InMemoryCommunication extends ICommunication {
  commit(): void {
    return;
  }
  constructor(protected readonly transformer: ITransformer = new JsonTransformer()) {
    super(transformer);
  }

  stepListeners: { [key: string]: OrchestrationStepCallback } = {};
  orchestrationListeners: { [key: string]: OrchestrationCallback } = {};

  sendEventToKey(key: string, payload: Buffer): void {
    const baseContext = new BaseContext({ ...this.transformer.from(payload), communication: this } as any);

    if (this.stepListeners[key]) {
      const context = new OrchestrationStepContext(baseContext);
      this.stepListeners[key](context);
    }
    if (this.orchestrationListeners[key]) {
      const context = new OrchestrationContext(baseContext);
      this.orchestrationListeners[key](context, key);
    }
  }

  onOrchestrationStep(key: string, callback: OrchestrationStepCallback): void {
    this.stepListeners[key] = callback;
  }

  onOrchestration(orchestrationKey: string[], callback: OrchestrationCallback): void {
    orchestrationKey.forEach((it) => (this.orchestrationListeners[it] = callback));
  }

  onChoreographyStep(key: string, callback: OrchestrationStepCallback): void {
    throw new Error('Method not implemented.');
  }
}
