/*
 * npm-exists
 * https://github.com/parroit/npm-exists
 *
 * Copyright (c) 2014 Andrea Parodi
 * Licensed under the MIT license.
 */

'use strict';

var request = require('request');
var Promise = require('bluebird');

module.exports = function npmExists(moduleName) {
    return new Promise(function(resolve, reject) {
        request('https://www.npmjs.org/package/' + moduleName, function(error, response, body) {
            if (error) {
                return reject(error);
            } 

            if (response.statusCode === 200) {
                return resolve(true);
            }

            resolve(false);
        });
    });
};
