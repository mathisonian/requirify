'use strict';

var npm = require('npm');
var _ = require('lodash');
var fs = require('fs-extra');
var exists = require('npm-exists');
var path = require('path');

module.exports = function(name, moduleName, cb) {

    var requirifyModuleName = 'requirify' + '-' + name + '-' + moduleName;

    exists(requirifyModuleName).then(function(moduleExists){
        if(moduleExists) {
            console.log('Module ' + requirifyModuleName + ' exists.');
            cb && cb(null, requirifyModuleName);
        } else {
            console.log('Module ' + requirifyModuleName + ' does not exist.');

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


        }
    });

};