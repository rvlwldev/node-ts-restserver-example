"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apps = void 0;
exports.apps = [
    {
        name: 'ts-intranet-server',
        script: './build/App.js',
        instances: 2,
        watch: true,
        ignore_watch: ['node_modules', 'Files', 'temp', 'logs', '.*', '*.json', 'App.run.js'],
        exec_mode: 'cluster',
        error_file: './logs/error.log'
    }
];
//# sourceMappingURL=App.run.js.map