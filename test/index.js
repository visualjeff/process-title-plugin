'use strict';

const Path = require('path');
const Code = require('@hapi/code');
const Hapi = require('@hapi/hapi');
const Lab = require('@hapi/lab');

// Declare internals
const internals = {};

// Test shortcuts
const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;


describe('hapi-process-title-plugin tests', () => {

    it('did the process.title get set?', () => {

        const server = new Hapi.Server();
        const register = async () => {

            await server.register([{
                plugin: require('../')
            }]);
        };

        register().catch((err) => {

            console.log(err);
        });

        expect(process.title).to.equal('process-title-plugin');
    });

    it('did the process.title get set from package.json file in a different location?', () => {

        const server = new Hapi.Server();
        const register = async () => {

            await server.register([{
                plugin: require('../'),
                options: {
                    packageFileLocation: Path.join(__dirname, '../example/miscDir', 'package.json')
                }
            }]);
        };

        register().catch((err) => {

            console.log(err);
        });

        expect(process.title).to.equal('MISC_APP');
    });

    it('bad package.json location?', () => {

        const server = new Hapi.Server();
        const register = async () => {

            await server.register([{
                plugin: require('../'),
                options: {
                    packageFileLocation: Path.join(__dirname, '../example/lala', 'package.json')
                }
            }]);
        };

        register().catch((err) => {

            expect(err).to.be.an.instanceof(Error);
            expect(err.name).to.equal('Error');
        });
    });

    it('did the process.title get set via the nameOverride?', () => {

        const server = new Hapi.Server();
        const register = async () => {

            await server.register([{
                plugin: require('../'),
                options: {
                    nameOverride: 'aHapiApp'
                }
            }]);
        };

        register().catch((err) => {

            console.log(err);
        });

        expect(process.title).to.equal('aHapiApp');
    });

    it('schema validation fails because of wrong data type', () => {

        const server = new Hapi.Server();
        const register = async () => {

            await server.register([{
                plugin: require('../'),
                options: {
                    nameOverride: 12345
                }
            }]);
        };

        //async / await handles catch for us!
        register().catch((err) => {

            expect(err).to.be.an.instanceof(Error);
            expect(err.name).to.equal('Error');
            expect(err.message).to.equal('ValidationError: child "nameOverride" fails because ["nameOverride" must be a string]');
        });
    });

    it('schema validation fails because of extra option value', () => {

        const server = new Hapi.Server();
        const register = async () => {

            await server.register([{
                plugin: require('../'),
                options: {
                    nameOverride: 'HapiApp',
                    dumb: 'lala'
                }
            }]);
        };

        //async / await handles catch for us!
        register().catch((err) => {

            expect(err).to.be.an.instanceof(Error);
            expect(err.name).to.equal('Error');
            expect(err.message).to.equal('ValidationError: "dumb" is not allowed');
        });
    });

});
