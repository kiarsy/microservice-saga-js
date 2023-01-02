import { StepType } from '../Utilities/StepType';

export type KeyStruct = {
  step: string;
  type: StepType | undefined;
};

export interface IKeyRule {
  generateKeyFor(step: string, type: StepType): string;
  destructKey(key: string): KeyStruct;
}
