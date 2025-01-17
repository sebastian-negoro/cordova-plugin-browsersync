#!/usr/bin/env node
'use strict';

var path = require('path');
var fs = require('fs');
var Q = require('q');
var npm = require('npm');

/**
 * Installs the dependencies when this is installed as a Cordova plugin hook 
 * or as a project hook
 **/
module.exports = function(context) {
    var pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8'));

    return Q.ninvoke(npm, 'load', {
        loaded: false
    }).then(function() {
        return Q.ninvoke(npm.commands, 'install', Object.keys(pkg.dependencies).map(function(p) {
            return p + '@' + pkg.dependencies[p];
        }));
    });
};
