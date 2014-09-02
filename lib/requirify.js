'use strict';

var npm = require('npm');
var _ = require('lodash');
var fs = require('fs-extra');
var exists = require('npm-exists');
var path = require('path');
var Q = require('q');


module.exports = function(name, moduleName, cb) {

    var requirifyModuleName = 'requirify' + '-' + name + '-' + moduleName;

    Q.all([
        exists(moduleName),
        exists(requirifyModuleName)
    ]).spread(function(moduleExists, requirifyExists) {

        if(!moduleExists) {
            return cb && cb(new Error('Module' + moduleName + ' does not exist'));
        }

        if(requirifyExists) {
            return cb && cb(null, requirifyModuleName);
        }

        var inputPath = path.resolve(__dirname + '/templates');
        var outputDir = path.resolve(__dirname + '/.tmp/' + (new Date().getTime()) + '/' + requirifyModuleName);

        // get to making the shit
        fs.mkdirsSync(outputDir);
        var packageJSONTemplate = _.template(fs.readFileSync(inputPath + '/_package.json'));
        var indexTemplate = _.template(fs.readFileSync(inputPath + '/_index.js'));

        var templateVars = {
            requirifyModuleName: requirifyModuleName,
            moduleName: moduleName,
            name: name
        };

        var packageJSON = packageJSONTemplate(templateVars);
        var index = indexTemplate(templateVars);

        fs.writeFileSync(outputDir + '/package.json', packageJSON);
        fs.writeFileSync(outputDir + '/index.js', index);

        npm.load(function(err, npm) {
            
            npm.commands.publish([outputDir], function(err) {
                cb && cb(err, requirifyModuleName);
            });
        });
    });

};