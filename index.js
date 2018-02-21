const request = require('request');
const util = require('util');

const baseUri = 'https://api.npms.io/v2/search';
const defaultSize = 10;
const defaultCriteria = 'popularity';
const defaultExcludes = ['deprecated', 'unstable', 'insecure'];

function setDefaults(options) {
    if (!options.size)
        options.size = defaultSize;

    if (!options.fullPackageDetail)
        options.fullPackageDetail = false;

    if (!options.criteria)
        options.criteria = defaultCriteria;

    if (!options.excludes)
        options.excludes = defaultExcludes;
}

//formulate query string
function formulateQuery(options) {
    var filter = '';

    if ('popularity' === options.criteria)
        filter += '+popularity-weight:1+quality-weight:0+maintenance-weight:0';

    if ('quality' === options.criteria)
        filter += '+popularity-weight:0+quality-weight:1+maintenance-weight:0';

    if ('maintenance' === options.criteria)
        filter += '+popularity-weight:0+quality-weight:0+maintenance-weight:1';

    if ('overall' === options.criteria)
        filter += '';

    options.excludes.forEach(element => {
        filter += '+not:' + element;
    });

    return util.format('?q=%s+keywords:%s%s&size=%i', options.keyword, options.keyword, filter, options.size);
}

function apiRequest(options, callback) {
    request(baseUri + formulateQuery(options), function (error, response, body) {
        if (error) {
            callback('query failed');
        }

        var results = JSON.parse(body).results;
        var list = [];

        if (options.fullPackageDetail) {
            for (var entry in results) {
                list.push(results[entry].package);
            }
        } else {
            for (var entry in results) {
                list.push(results[entry].package.name);
            }
        }

        callback(null, list);
    });
}

function search(category, size, options) {
    return new Promise((resolve, reject) => {
        if (!('string' === typeof category))
            throw new error('invalid category: ' + category);

        if (!options && 'object' === typeof size)
            options = size;

        if (options) {
            if (!options.size)
                options.size = size;
        } else {
            options = 'object' === typeof size ? size : { 'size': size };
        }

        options.keyword = category;

        //add missing parameters with default value
        setDefaults(options);

        apiRequest(options, function (error, list) {
            if (error)
                reject(error);
            else
                resolve(list);
        });
    });
}

module.exports = search;