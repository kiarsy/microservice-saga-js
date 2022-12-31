import { BaseContext } from "./context";
import { ICommunication } from "./Communication/ICommunication";
import { OrchestrationCallback, OrchestrationStepCallback } from "./types";

export class SagaJS {
    constructor(readonly communication: ICommunication) { }

    public runOrchestration(key: string, payload: any) {
        const id = `${key}_asda-324-34-54-3-`;
        const context = new BaseContext({
            id,
            communication: this.communication,
            currentStep: key,
            key,
            nextStep: key,
            payload,
            steps: [],
            eventSequence: 0
        });
        this.communication.sendEvent(key, context);
    }

    public runChoreography(key: string, payload: any) {
        const id = `${key}_asda-324-34-54-3-`;
        const context = new BaseContext({
            id,
            communication: this.communication,
            key: '',
            currentStep: key,
            nextStep: key,
            payload,
            steps: [],
            eventSequence: 0
        })
        this.communication.sendEvent(key, context);
    }

    public onOrchestrationStep(key: string, callback: OrchestrationStepCallback) {
        this.communication.onOrchestrationStep(key, callback);
    }

    public createOrchestrationInstruction(key: string, steps: string[]) {
        steps = [key, ...steps];
        this.communication.onOrchestration(key, (context) => {
            console.log("createOrchestrationInstruction", context);
            // const steps = ["Orchestration_1", "stepA", "stepB"];
            if (context.payload.error) {
                // context.fail
                context.startCompensation();
            }
            else {
                const currentIndex = steps.indexOf(context.currentStep);
                let step = steps[(currentIndex === steps.length - 1) ? -1 : currentIndex + 1];
                context.setNextStep(step);
            }
        });
    }

    public onOrchestrationNeeded(key: string, callback: OrchestrationCallback) {
        this.communication.onOrchestration(key, callback);
    }


}