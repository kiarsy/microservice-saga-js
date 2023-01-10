import { ITransport } from '../Transport/ITransport';
import { ChoreographyStepContext } from '../Context/ChoreographyStepContext';
import { OrchestrationContext } from '../Context/OrchestrationContext';
import { OrchestrationStepContext } from '../Context/OrchestrationStepContext';

export type OrchestrationStepCallback = (context: OrchestrationStepContext) => void;
export type ChoreographyStepCallback = (context: ChoreographyStepContext) => void;
export type OrchestrationCallback = (context: OrchestrationContext, channel: string) => void;

export type SagaContextParam = {
  eventSequence: number;
  id: string;
  orchestrationKey: string;
  payload: any;
  stepKey: string;
  steps: string[];
  response?: boolean;
  communication: ITransport;
};
