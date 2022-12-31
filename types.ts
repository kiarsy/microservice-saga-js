import { OrchestrationStepContext, OrchestrationContext,ChoreographyStepContext } from "./context";

export type OrchestrationStepCallback = (context: OrchestrationStepContext) => void;
export type ChoreographyStepCallback = (context: ChoreographyStepContext) => void;
export type OrchestrationCallback = (context: OrchestrationContext) => void;
