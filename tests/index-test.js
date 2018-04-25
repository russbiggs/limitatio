const test = require('tape');
const fs = require('fs');
const limitatio = require('../');

test("porec", function(test) {
    let geojson = fs.readFileSync("tests/porec.geojson");
    let actual = limitatio(JSON.parse(geojson).features[0], 9);
    let expected = fs.readFileSync("tests/porec_centuriation.geojson", "utf8");
    test.deepEqual(JSON.stringify(actual), expected);
    test.end();
});