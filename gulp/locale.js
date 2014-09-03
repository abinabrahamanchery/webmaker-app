var fs = require('fs');
var glob = require('glob');
var path = require('path');

module.exports = function (callback) {
    var langMap = Object.create(null);

    glob('./locale/*.json', function (err, files) {
        if (err) return callback(err);

        files.forEach(function (filename) {
            var code = path.basename(filename, '.json');

            // Remove descriptions
            var temp = {};
            var raw = JSON.parse(fs.readFileSync(filename, 'utf-8'));
            for (var key in raw) {
                temp[key] = raw[key].message;
            }

            // Add to map
            langMap[code] = temp;
        });

        var file = 'module.exports = ';
        file += JSON.stringify(langMap);
        file += ';';

        fs.writeFile('./locale/index.js', file, callback);
    });
};
