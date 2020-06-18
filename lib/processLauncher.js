const spawn = require('child_process').spawn;
const EventEmitter = require('events');

/**
 * ProcessLauncher will launch a given process and will relaunch it when it closed / crashed (by configuration).
 * It will also log all its data to the given logger
 */
class ProcessLauncher extends EventEmitter {
    /**
     * Creates an instance of ProcessLauncher
     * @param execPath mandatory, the full path to the exec to run, including the exec name
     * The following parameters are part of the options object and are not mandatory
     * @param logger a logger to use in order to logs events in the library. If none is passed logs will not go out.
     * @param processName the processName that will be showed in the logs
     * @param processLogger if you wish to have a separate logger for the logs of the launched process, pass it here, otherwise
     * it will use the 'logger' parameter. If none was passed in the logger as well no logs will go out
     * @param restartOnExist whether to restart the process when it ends. Default true.
     * @param logProcess whether to log the launched process messages. Default true.
     */
    constructor(execPath, { logger, processName = execPath, processLogger = logger, restartOnExist = true, logProcess = true } ) {
        super();
        this._execPath = execPath;
        this._log = logger;
        this._processName = processName;
        this._processLogger = processLogger;
        this._restartOnExit = restartOnExist;
        this._logProcess = logProcess;
    }

    run() {
        const log = this._log;
        const processName = this._processName;
        // execute the exec
        const execFilePath = this._execPath;
        log && log.debug(`executing ${execFilePath}`);
        // The process should not end. If it was ended there
        // was an error, so we restart it
        let process = spawn(execFilePath, [], {stdio: this._logProcess ? 'pipe' : 'ignore'});

        process.on('error', err => {
            log && log.error(`${processName} error: ${err.message}`);
            this.emit('error', err);
        });

        process.on('exit', code => {
            log && log.error(`${processName} ended, with code ${code}`);
            this.emit('exit', code);
            if (this._restartOnExit) {
                log && log.info(`restarting ${processName}...`);
                this.run();
            }

        });

        if (this._logProcess) {
            const processLogger = this._processLogger || this._log;
            process.stdout.on('data', data => {
                processLogger && processLogger.info(data.toString());
            });

            process.stderr.on('data', data => {
                processLogger && processLogger.error(data.toString());
            });
        }
    }
}

module.exports = ProcessLauncher;