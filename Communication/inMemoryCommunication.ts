import { BaseContext, OrchestrationContext, OrchestrationStepContext } from "../context";
import { ICommunication } from "./ICommunication";
import { ITransformer } from "../Transformer/ITransformer";
import { OrchestrationCallback, OrchestrationStepCallback } from "../types";

export class InMemoryCommunication extends ICommunication {
    constructor(protected readonly transformer: ITransformer) {
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
            this.orchestrationListeners[key](context);
        }
    }

    onOrchestrationStep(key: string, callback: OrchestrationStepCallback): void {
        this.stepListeners[key] = callback;
    }

    onOrchestration(key: string, callback: OrchestrationCallback): void {
        this.orchestrationListeners[key] = callback;
    }

    onChoreographyStep(key: string, callback: OrchestrationStepCallback): void {
        throw new Error("Method not implemented.");
    }
}