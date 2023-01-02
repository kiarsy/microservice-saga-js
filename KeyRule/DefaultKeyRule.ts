import { StepType } from "../Utilities/StepType";
import { IKeyRule, KeyStruct } from "./IKeyRule";

export class DefaultKeyRule implements IKeyRule {
    destructKey(key: string): KeyStruct {

        if (key.endsWith(StepType.Step))
            return {
                step: key.replace(`_${StepType.Step}`, ""),
                type: StepType.Step
            }
        if (key.endsWith(StepType.Compensation))
            return {
                step: key.replace(`_${StepType.Compensation}`, ""),
                type: StepType.Compensation
            }
        return {
            step: key,
            type: undefined
        }
    }
    generateKeyFor(step: string, type: StepType): string {
        return `${step}_${type}`
    }

}