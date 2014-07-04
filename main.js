// April 1
// HTML extension
// main module
'use strict';

var A = require ('april1');

var builder = require ('./modules/builder');
var types = require ('./modules/types');

module.exports = {
	// modules
	builder: builder,
	types: types,

	// external interface

	// spec node builders
	insert: A.insert,
	list: A.list,
	macro: A.macro,

	// operation functions
	template: builder.template,
	string: A.string
};
