import { ICommunication } from "../Communication/ICommunication";
import { ChoreographyStepContext } from "../Context/ChoreographyStepContext";
import { OrchestrationContext } from "../Context/OrchestrationContext";
import { OrchestrationStepContext } from "../Context/OrchestrationStepContext";

export type OrchestrationStepCallback = (context: OrchestrationStepContext) => void;
export type ChoreographyStepCallback = (context: ChoreographyStepContext) => void;
export type OrchestrationCallback = (context: OrchestrationContext) => void;

export type SagaContextParam = {
    id: string, key: string,
    payload: any,
    currentStep: string, nextStep: string,
    steps: string[], eventSequence: number,
    communication: ICommunication
};