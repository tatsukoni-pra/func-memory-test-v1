import { AzureFunction, Context } from "@azure/functions"

const timerTrigger: AzureFunction = async function (context: Context, myTimer: any): Promise<void> {
    context.log('Timer trigger function started!');
    context.log('Memory usage before loop:', memoryCheck(context));

    for (let i = 0; i < 300; i++) {
        context.log('loop count:', i);
        var date = new Date();
        context.log('current date:', date.toISOString());
    }

    context.log('Timer trigger function completed!');
    context.log('Memory usage after loop:', memoryCheck(context));
};

function memoryCheck(context: Context) {
    const heap = process.memoryUsage();
    const msg = [];
    for (const key in heap) {
        msg.push(`${key}: ${Math.round(heap[key] / 1024 / 1024)} MB`);
    }
    context.log(msg.join(', '));
}

export default timerTrigger;
