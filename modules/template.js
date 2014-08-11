//
'use strict';

var A = require ('april1');

var tempBuild = require ('./templates/build');

/**
 *
 */
function templateBuilder (params) {
	var builder = A.modules.templates.build.templateBuilder (params);
	builder.dispatchers = params.dispatchers;
	return builder;
}

/**
 *
 */
function defaultTemplateParams () {
	var params = A.modules.template.defaultTemplateParams ();
	params.dispatchers = {
		output: tempBuild.outputDispatcher (),
		attrs: tempBuild.attrsDispatcher ()
	};
	params.dispatch = params.dispatchers.output;
	return params;
}

/**
 *
 */
var doBuildTemplate =
	A.modules.template.buildTemplate (
		defaultTemplateParams (),
		templateBuilder
	);

module.exports = {
	defaultTemplateParams: defaultTemplateParams,
	doBuildTemplate: doBuildTemplate
};
