'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server({
    host: 'localhost',
    port: 3000
});

async function startup() {
    await server.register([{
        plugin: require('../'),
        options: {
            nameOverride: 'MyHotApp'
        }
    }]);
    await server.start();
}

try {
    startup();
    console.log(`${new Date()}: server running at ${server.info.uri}`);
} catch (err) {
    console.log(err);
}

process.on('unhandledRejection', (error) => {
    console.log(error);
    process.exit(1);
})
