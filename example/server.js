'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: 3000
});

//If an optional override is provided it will be used instead of the package.json name property.
server.register([{
    register: require('../'),
    options: {
        nameOverride: 'MyHotApp'
    }
}], (err) => {

    if (err) {
        throw err;
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }

    console.dir(`${process.title} is running at: ${server.info.uri}`, {
        colors: true
    });
});
