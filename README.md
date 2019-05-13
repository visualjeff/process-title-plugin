
## About process-title-plugin

A hapi plugin that sets the process.title of your hapi application to the name defined within your project's package.json file.  Optional overrides exist for overriding the name defined within the package.json file (nameOverride).  Version 2.0.1 of this plugin has been tested with v17 and v18 of Hapi but if you are committed to running Hapi v16 then checkout the 1.0.0 version of this plugin.

[![Build Status](https://travis-ci.org/visualjeff/process-title-plugin.png)](https://travis-ci.org/visualjeff/process-title-plugin)

See the example for details on accessing the database within routes.

## Usage:

```js
'use strict';

const Hapi = require('@hapi/hapi');
const Path = require('path');

const server = new Hapi.Server({
    host: 'localhost',
    port: 3000
});

const startup = async () => {
    await server.register([{
        plugin: require('../'),
        options: {
            packageFileLocation: Path.join(__dirname, '../', 'package.json')
        }
    }]);
    await server.start();
};

startup().catch((err) => {
    throw err;
});

console.log(`${new Date()}: server running at ${server.info.uri}`);
```


## Usage using plugin option for name override:

```js
'use strict';

const Hapi = require('@hapi/hapi');
const Path = require('path');

const server = new Hapi.Server({
    host: 'localhost',
    port: 3000
});

const startup = async () => {
    await server.register([{
        plugin: require('../'),
        options: {
            packageFileLocation: Path.join(__dirname, '../', 'package.json')
            nameOverride: 'myCustApp'
        }
    }]);
    await server.start();
};

startup().catch((err) => {
    throw err;
});

console.log(`${new Date()}: server running at ${server.info.uri}`);
```
