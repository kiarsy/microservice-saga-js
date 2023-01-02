import { InMemoryCommunication } from "../src/Communication/inMemoryCommunication";
import { SagaJS } from "../src/index";
import { JsonTransformer } from "../src/Transformer/JsonTransformer";


// const sagaJs = new SagaJS(new InMemoryCommunication(new JsonTransformer()));

// sagaJs.onStep("stepA", (context) => {
//     console.log("StepA", context);
//     context.complete({ stepA: 'done' });
// });

// sagaJs.onStep("stepB", (context) => {
//     console.log("stepB", context);
// });

// sagaJs.runChoreography("stepA", { start: 'here' });
