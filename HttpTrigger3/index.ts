import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger3 start. Memory usage:', memoryCheck());

    var result = [];
    for (var i = 1; i <= 50000000; i++) {
        result.push(Math.random().toString());
    }
    // result = [];
    context.log(result.length);

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: "200 OK"
    };
    context.log('HTTP trigger3 finish. Memory usage:', memoryCheck());
};

function memoryCheck(): string {
    const heap = process.memoryUsage();
    const msg = [];
    for (const key in heap) {
        msg.push(`${key}: ${Math.round(heap[key] / 1024 / 1024)} MB`);
    }
    return msg.join(', ');
}

export default httpTrigger;