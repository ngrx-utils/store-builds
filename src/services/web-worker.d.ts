export declare class WebWorkerService {
    private workerFunctionToUrlMap;
    private promiseToWorkerMap;
    run<T>(fn: (input: any) => void, data?: any): Promise<T>;
    runUrl(url: string, data?: any): Promise<any>;
    terminate<T>(promise: Promise<T>): Promise<T>;
    getWorker(promise: Promise<any>): Worker;
    private createPromiseForWorker<T>(worker, data);
    private getOrCreateWorkerUrl(fn);
    private createWorkerUrl(fn);
    private createPromiseCleaner<T>(promise);
    private removePromise<T>(promise);
}
export declare class WebWorkerModule {
}
