import { BaseContext } from "../Context/BaseContext";
import { ITransformer } from "../Transformer/ITransformer";
import { OrchestrationCallback, OrchestrationStepCallback } from "../Utilities/types";

export abstract class ICommunication {
    constructor(protected readonly transformer: ITransformer) { }
    public sendEvent(key: string, payload: BaseContext) {
        payload.increaseEventSequence();
        this.sendEventToKey(key, this.transformer.to(payload.toJson()));
    }

    abstract sendEventToKey(key: string, payload: Buffer): void;
    abstract onChoreographyStep(key: string, callback: OrchestrationStepCallback): void;
    abstract onOrchestrationStep(key: string, callback: OrchestrationStepCallback): void;
    abstract onOrchestration(key: string, callback: OrchestrationCallback): void;
}
