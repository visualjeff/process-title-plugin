'use strict';

const Fs = require('fs');
const Path = require('path');
const Joi = require('joi');

const internals = {};

// JOI Schema for validation
internals.schema = Joi.object().keys({
    packageFileLocation: Joi.string(),
    nameOverride: Joi.string()
});

const processTitlePlugin = {
    register: (server, options, next) => {

        const validateOptions = internals.schema.validate(options);
        if (validateOptions.error) {
            return next(validateOptions.error);
        }

        let packageFile;
        try {
            packageFile = JSON.parse(Fs.readFileSync(options.packageFileLocation || (Path.join(__dirname, '../', 'package.json'))));
            process.title = options.nameOverride || packageFile.name;
        }
        catch (err) {
            return next(err);
        }

        next();
    }
};

processTitlePlugin.register.attributes = {
    pkg: require('../package.json')
};

module.exports = processTitlePlugin;
