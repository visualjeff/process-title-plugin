
## About process-title-plugin

A hapi plugin that sets the process.title of your hapi application to the name defined within your project's package.json file.  Optional overrides exist for setting the location of your package.json (packageFileLocation) and for overriding the name defined within the package.json file (nameOverride).

[![Build Status](https://travis-ci.org/visualjeff/process-title-plugin.png)](https://travis-ci.org/visualjeff/process-title-plugin)

See the example for details on accessing the database within routes.

## Usage

```js
'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 3000
});

server.register([{
    register: require('process-title-plugin')
}, {
    register: require('./routes/applicationRoutes') //Load some routes
}], (err) => {
    if (err) {
        throw err;
    }
});

server.start((err) => {
    if (err) {
        throw err;
    }

    console.dir(`${process.title} is running at:  ${server.info.uri}`, {
        colors: true
    });
});
```
## Usage using plugin option for package file location:

```js
'use strict';

const Hapi = require('hapi');
const Path = require('path');

const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 3000
});

server.register([{
    register: require('process-title-plugin'),
    options: {
        packageFileLocation: Path.join(__dirname, '../differentDirectory', 'paquet.json')
    }
}, {
    register: require('./routes/applicationRoutes') //Load some routes
}], (err) => {
    if (err) {
        throw err;
    }
});

server.start((err) => {
    if (err) {
        throw err;
    }

    console.dir(`${process.title} is running at:  ${server.info.uri}`, {
        colors: true
    });
});
```


## Usage using plugin option for name override:

```js
'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 3000
});

server.register([{
    register: require('process-title-plugin'),
    options: {
        nameOverride: 'myCustApp'
    }
}, {
    register: require('./routes/applicationRoutes') //Load some routes
}], (err) => {
    if (err) {
        throw err;
    }
});

server.start((err) => {
    if (err) {
        throw err;
    }

    console.dir(`${process.title} is running at:  ${server.info.uri}`, {
        colors: true
    });
});
```
