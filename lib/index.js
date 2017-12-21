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

exports.plugin = {
    pkg: require('../package.json'),    
    register(server, options) { 
       const validateOptions = internals.schema.validate(options);

        	    if (validateOptions.error) {
                        throw new Error(validateOptions.error);
                    }
                    const packageFile = JSON.parse(Fs.readFileSync(options.packageFileLocation || (Path.join(__dirname, '../', 'package.json'))));
 
        process.title = options.nameOverride || packageFile.name;
    }
}
