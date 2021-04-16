export class LoggerRepository {
    private readonly Log;

    constructor(opts: any) {
        this.Log = opts.Log;
    }

    public insertOneLog = async (log: any) => {
        await this.Log.save();
    };
}
