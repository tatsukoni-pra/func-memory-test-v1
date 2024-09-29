import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger2 start. Memory usage:', memoryCheck());

    var result = [];
    for (var i = 1; i <= 10; i++) {
        result.push(consume5MB());
    }
    context.log(result.length);

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: "200 OK"
    };
    context.log('HTTP trigger2 finish. Memory usage:', memoryCheck());
};

function consume5MB(): string {
    const targetSize = 1 * 1024 * 1024 / 2; // 1MB in characters

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

export default httpTrigger;