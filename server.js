'use strict';

var path = require('path');
var CURRENT_DIR_PATH = path.resolve(__dirname);

var framework  = require(CURRENT_DIR_PATH + '/framework');
framework.init().execute();