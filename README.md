# process-launcher
small package for spawning a process, restarting it if it fails and logging its output

## usage
```js
const ProcessLauncher = require('process-lancher');

let launcher = new ProcessLauncher('/path/to/exec', 
    { // options object, all is optional and with defaults
        processName: 'myProcess',
        restartOnExit: true,
        logger: null,
        processLogger: null,
        logProcess: true
    });

// run the process
launcher.run();

// if you want to get notified on events, the ProcessLauncher is an EventEmitter
launcher.on('error', err => {
    // do what ever you want
});

launcher.on('exit', code => {
    // the library will restart the process (unless you changed 'restartOnExit' to false),
    // but if you want to do anything else you are welcome
});
```

## API reference
<a name="ProcessLauncher"></a>

## ProcessLauncher
ProcessLauncher will launch a given process and will relaunch it when it closed / crashed (by configuration).
It will also log all its data to the given logger

**Kind**: global class
<a name="new_ProcessLauncher_new"></a>

### new ProcessLauncher(execPath, options)
Creates an instance of ProcessLauncher


| Param | Description |
| --- | --- |
| execPath | mandatory, the full path to the exec to run, including the exec name The following parameters are part of the options object and are not mandatory |
| options |
| logger | a logger to use in order to logs events in the library. If none is passed logs will not go out. |
| processName | the processName that will be showed in the logs |
| processLogger | if you wish to have a separate logger for the logs of the launched process, pass it here, otherwise it will use the 'logger' parameter. If none was passed in the logger as well no logs will go out |
| restartOnExist | whether to restart the process when it ends. Default true. |
| logProcess | whether to log the launched process messages. Default true. |


