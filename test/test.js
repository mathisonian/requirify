'use strict';

var expect = require('expect.js');
var requirify = require('..');


describe('requirify()', function(){

    it('it should find a module name requirify-_-lodash', function(done){
        requirify('_', 'lodash', function(err, moduleName) {
            expect(err).to.be(null);
            expect(moduleName).to.be('requirify-_-lodash');
            done();
        });
    });

    it('it should throw an error that module _ does not exist', function(done){
        requirify('_', '_', function(err, moduleName) {
            expect(err).to.be.an(Error);
            expect(moduleName).to.not.be.ok()
            done();
        });
    });

});
