import { AzureFunction, Context } from "@azure/functions"

const timerTrigger: AzureFunction = async function (context: Context, myTimer: any): Promise<void> {
    context.log('Timer trigger function started!');
    context.log('Memory usage before loop:', memoryCheck(context));

    const result = consume5MB();

    context.log('Timer trigger function completed!');
    context.log('Memory usage after loop:', memoryCheck(context));
};

function consume5MB(): string {
    const targetSize = 5 * 1024 * 1024 / 2; // 5MB in characters

    let largeString = '';
    for (let i = 0; i < targetSize; i++) {
        largeString += 'A';
    }

    return largeString;
}

function memoryCheck(context: Context): string {
    const heap = process.memoryUsage();
    const msg = [];
    for (const key in heap) {
        msg.push(`${key}: ${Math.round(heap[key] / 1024 / 1024)} MB`);
    }
    return msg.join(', ');
}

export default timerTrigger;
