const assert = require('assert');
const top = require('../index.js');

describe('top', function () {
    describe('#result size', function () {
        it('should return result size as per passed value', function (done) {
            var size = 5;
            top('api', 5).then(function (list) {
                assert.equal(list.length, size);
                done();
            }).catch(function () { });
        });
    });
});

describe('top', function () {
    describe('#result size default', function () {
        it('should return result size as per arg value', function (done) {
            top('api').then(function (list) {
                assert.equal(list.length, 10);
                done();
            }).catch(function () { });
        });
    });
});

describe('top', function () {
    describe('#package full detail', function () {
        it('should return array of packages with full details', function (done) {
            top('api', 1, {
                fullPackageDetail: true
            }).then(function (list) {
                var p = list[0];
                assert.ok(p.name && p.version);
                done();
            }).catch(function () { });
        });
    });
});

