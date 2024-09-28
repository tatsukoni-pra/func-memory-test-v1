import { AzureFunction, Context } from "@azure/functions"

const timerTrigger: AzureFunction = async function (context: Context, myTimer: any): Promise<void> {
    context.log('Timer trigger function started!');
    context.log('Memory usage before loop:', memoryCheck());

    const result = consume5MB();
    context.log(result.length);

    context.log('Timer trigger function completed!');
    context.log('Memory usage after loop:', memoryCheck());
};

function consume5MB(): string {
    const targetSize = 10 * 1024 * 1024 / 2; // 10MB in characters

    let largeString = '';
    for (let i = 0; i < targetSize; i++) {
        largeString += 'A';
    }

    return largeString;
}

function memoryCheck(): string {
    const heap = process.memoryUsage();
    const msg = [];
    for (const key in heap) {
        msg.push(`${key}: ${Math.round(heap[key] / 1024 / 1024)} MB`);
    }
    return msg.join(', ');
}

export default timerTrigger;
