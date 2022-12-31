import { InMemoryCommunication } from "../Communication/inMemoryCommunication";
import { SagaJS } from "../index";
import { JsonTransformer } from "../Transformer/JsonTransformer";


// const sagaJs = new SagaJS(new InMemoryCommunication(new JsonTransformer()));

// sagaJs.onStep("stepA", (context) => {
//     console.log("StepA", context);
//     context.complete({ stepA: 'done' });
// });

// sagaJs.onStep("stepB", (context) => {
//     console.log("stepB", context);
// });

// sagaJs.runChoreography("stepA", { start: 'here' });
