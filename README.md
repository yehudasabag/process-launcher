# process-launcher
small package for spawning a process, restarting it if it fails and logging its output

## usage
```js
const ProcessLauncher = require('process-lancher');

let launcher = new ProcessLauncher('/path/to/exec', 
    { // options object, all is optional and with defaults
        processName: 'myProcess',// the processName that will be showed in the logs
        restartOnExit: true, // whether to restart the process when it ends. Default true.
        logger: null, // a logger to use in order to logs events in the library. If none is passed logs will not go out. 
                      // Any object is valid as long it has .info, .debug and .error functions. Default null
        processLogger: null, // if you wish to have a separate logger for the logs of the launched process, 
                             // pass it here, otherwise it will use the 'logger' parameter. 
                             // If none was passed in the logger as well no logs will go out
        logProcess: true // whether to log the launched process messages. Default true.
        
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


