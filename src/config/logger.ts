export class Logger {
    private readonly log;

    constructor(opts: any) {
        this.log = opts.Log;
    }

    private getTimeStamp = (): string => {
        return new Date().toISOString();
    };

    info = (namespace: string, message: string, object?: any) => {
        if (object) {
            console.log(`[${this.getTimeStamp()}] [INFO] [${namespace}] ${message}`, object);
            return;
        }

        console.log(`[${this.getTimeStamp()}] [INFO] [${namespace}] ${message}`);
    };

    warn = (namespace: string, message: string, object?: any) => {
        if (object) {
            console.log(`[${this.getTimeStamp()}] [WARN] [${namespace}] ${message}`, object);

            return;
        }

        console.log(`[${this.getTimeStamp()}] [WARN] [${namespace}] ${message}`);
    };

    error = (namespace: string, message: string, object?: any) => {
        if (object) {
            console.log(`[${this.getTimeStamp()}] [ERROR] [${namespace}] ${message}`, object);
            return;
        }

        console.log(`[${this.getTimeStamp()}] [ERROR] [${namespace}] ${message}`);
    };

    debug = (namespace: string, message: string, object?: any) => {
        if (object) {
            console.log(`[${this.getTimeStamp()}] [DEBUG] [${namespace}] ${message}`, object);
            return;
        }

        console.log(`[${this.getTimeStamp()}] [DEBUG] [${namespace}] ${message}`);
    };
}
