#!/usr/bin/env node
'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server({
    host: 'localhost',
    port: 3000
});

const startup = async () => {

    await server.register([{
        plugin: require('../'),
        options: {
            nameOverride: 'MyHotApp'
        }
    }]);
    await server.start();
};

startup().catch((err) => {

    console.log(err);
    process.exit(1);
});

console.log(`${new Date()}: server running at ${server.info.uri}`);

