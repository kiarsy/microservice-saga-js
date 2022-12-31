import { SagaJS } from "../index";
import { InMemoryCommunication } from "../Communication/inMemoryCommunication";


const sagaJs = new SagaJS(new InMemoryCommunication());

sagaJs.onStep("stepA", (context) => {
    console.log("StepA", context);
    context.complete({ stepA: 'done' });
});

sagaJs.onStep("stepB", (context) => {
    console.log("stepB", context);
});

sagaJs.runChoreography("stepA", { start: 'here' });

// todo: status : running,completed,in_compensation,failed
// todo: retry
// todo: timeout
// todo: compensation
// todo: choregraphy
// todo: communicationTransportLayer : json | protoBuff
