import { SagaJS } from "../src/index";
import { InMemoryTransport } from "../src/Transport/InMemoryTransport";
import { StepType } from "../src/Utilities/StepType";

const sagaJs = new SagaJS(new InMemoryTransport());

sagaJs.onOrchestrationStep("stepA", StepType.Step, (context) => {
    console.log("StepA", context);
    context.complete({ stepA: 'done' });
});

sagaJs.onOrchestrationStep("stepA", StepType.Compensation, (context) => {
    console.log("StepA Compensation", context);
    context.complete({ CompensationA: 'done' });
});

sagaJs.onOrchestrationStep("stepB", StepType.Step, (context) => {
    console.log("stepB", context);
    context.complete({ stepB: 'failed' });
});

sagaJs.onOrchestrationStep("stepB", StepType.Compensation, (context) => {
    console.log("stepB Compensation ", context);
    if (Math.random() < 0.1) {
        context.complete({ CompensationB: 'done' });

    } else {
        context.fail({ CompensationB: 'failed' });
    }
    
});

sagaJs.onOrchestrationStep("stepC", StepType.Step, (context) => {
    console.log("stepC", context);
    if (Math.random() < 0.2) {
        context.complete({ stepC: 'done' });

    } else {
        context.fail({ stepC: 'failed' });
    }
});

sagaJs.onOrchestrationStep("stepC", StepType.Compensation, (context) => {
    console.log("stepC Compensation ", context);
    context.complete({ CompensationC: 'done' });
});

sagaJs.createOrchestrationByInstruction("Org1", ["stepA", "stepB", "stepC"],2);

sagaJs.runOrchestration("Org1", { start: 'here' });