
# top-packages-category-wise

find top npm packages in given category by popularity|maintenance|quality|overall.

- returs a promise
- fullfillment value for promise is array of packages
- default oredering ceriteria is 'popularity'
- default result size is 10


1. top 10 'api' packages
```js
var top = require('top-packages-category-wise');
top('api').then(function (list) {
    console.log(list); //[ 'express', 'aws-sdk', 'googleapis', ...]
}).catch(function (error) {
    console.log(error);
});
```

2. top 5 'database' packages
```js
var top = require('top-packages-category-wise');
top('database', 5).then(function (list) {
    console.log(list); //[ 'redis', 'mongoose', 'pg', 'mime-db', 'levelup' ]
}).catch(function (error) {
    console.log(error);
});
```

3. top 5 'database' packages with full package detail
```js
var top = require('top-packages-category-wise');
top('database', 5, {
    'fullPackageDetail': true,
    criteria: 'quality'
}).then(function (list) {
    console.log(list);
}).catch(function (error) {
    console.log(error);
});
```
