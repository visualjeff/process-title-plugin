'use strict';

const Path = require('path');
const Code = require('code');
const Hapi = require('hapi');
const Lab = require('lab');

// Declare internals
const internals = {};

// Test shortcuts
const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;


describe('hapi-process-title-plugin tests', () => {

    it('did the process.title get set?', (done) => {

        const server = new Hapi.Server();
        server.connection();

        server.register({
            register: require('../')
        }, (err) => {

            expect(err).to.be.undefined();
            expect(process.title).to.equal('process-title-plugin');
        });
        done();
    });

    it('did the process.title get set from package.json file in a different location?', (done) => {

        const server = new Hapi.Server();
        server.connection();

        server.register({
            register: require('../'),
            options: {
                packageFileLocation: Path.join(__dirname, '../example/miscDir', 'package.json')
            }
        }, (err) => {

            expect(err).to.be.undefined();
            expect(process.title).to.equal('MISC_APP');
        });
        done();
    });

    it('bad package.json location?', (done) => {

        const server = new Hapi.Server();
        server.connection();

        server.register({
            register: require('../'),
            options: {
                packageFileLocation: Path.join(__dirname, '../example/lala', 'package.json')
            }
        }, (err) => {

            expect(err).to.be.an.instanceof(Error);
            expect(err.name).to.equal('Error');
        });
        done();
    });

    it('did the process.title get set via the nameOverride?', (done) => {

        const server = new Hapi.Server();
        server.connection();

        server.register({
            register: require('../'),
            options: {
                nameOverride: 'aHapiApp'
            }
        }, (err) => {

            expect(err).to.be.undefined();
            expect(process.title).to.equal('aHapiApp');
        });
        done();
    });

    it('schema validation fails because of wrong data type', (done) => {

        const server = new Hapi.Server();
        server.connection();

        server.register({
            register: require('../'),
            options: {
                nameOverride: 12345
            }
        }, (err) => {

            expect(err).to.be.an.instanceof(Error);
            expect(err.name).to.equal('ValidationError');
            expect(err.details[0].message).to.equal('"nameOverride" must be a string');
        });
        done();
    });

    it('schema validation fails because of extra option value', (done) => {

        const server = new Hapi.Server();
        server.connection();

        server.register({
            register: require('../'),
            options: {
                nameOverride: 'HapiApp',
                dumb: 'lala'
            }
        }, (err) => {

            expect(err).to.be.an.instanceof(Error);
            expect(err.name).to.equal('ValidationError');
            expect(err.details[0].message).to.equal('"dumb" is not allowed');
        });
        done();
    });

});
