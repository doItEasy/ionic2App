#!/usr/bin/env node

var fs = require('fs');
var rootdir = process.argv[2];

if (rootdir) {
  fs.createReadStream('release-signing.properties').pipe(fs.createWriteStream('platforms/android/release-signing.properties'));
  fs.createReadStream('yuanbaopu.keystore').pipe(fs.createWriteStream('platforms/android/yuanbaopu.keystore'));
}
