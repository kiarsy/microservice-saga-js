import { SagaJS } from "../index";
import { InMemoryCommunication } from "../Communication/inMemoryCommunication";
import { JsonTransformer } from "../Transformer/JsonTransformer";

const sagaJs = new SagaJS(new InMemoryCommunication(new JsonTransformer()));

sagaJs.onOrchestrationStep("stepA", (context) => {
    console.log("StepA", context);
    context.complete({ stepA: 'done' });
});

sagaJs.onOrchestrationStep("stepB", (context) => {
    console.log("stepB", context);
    context.fail({ stepB: 'failed' });
});


sagaJs.createOrchestrationInstruction("Org1",["stepA", "stepB"]);

// sagaJs.createOrchestrationInstruction("Orchestration_1", (context) => {
//     console.log("Orchestration_1", context);
//     const steps = ["Orchestration_1", "stepA", "stepB"];
//     if (context.payload.error) {
//         const currentIndex = steps.indexOf(context.CurrentHop);
//         let step = steps[(currentIndex === steps.length - 1) ? -1 : currentIndex + 1];
//         console.log("NEXT", step)
//         context.setNextStep(step);
//     }
//     else {
//     }
// });

sagaJs.runOrchestration("Org1", { start: 'here' });

// todo: status : running,completed,in_compensation,failed
// todo: communicationTransportLayer : json | protoBuff
// todo: retry
// todo: compensation
// todo: choregraphy
// todo: timeout