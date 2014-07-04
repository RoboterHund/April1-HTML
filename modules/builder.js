// tag tree template builder
// creates template with XML-like structure
'use strict';

var A = require ('april1');

var types = require ('./types');

var BUILD_ATTRS = 'attrs';

function TagBuildState (prev) {
	this.prev = prev;
	this.open = null;
	this.content = null;
}

function tag (builder, node) {
	var state =
		builder.buildStackTop =
			new TagBuildState (builder.buildStackTop);

	var tag = node [1];
	state.open = [types.OPEN_TAG_PART, '<', tag];
	state.content = [types.CONTENT_TAG_PART];

	builder.setState (BUILD_ATTRS);
	builder.build (node, 2);

	if (state.content.length > 1) {
		state.open.push ('>');
		var close = [types.CLOSE_TAG_PART, '</', tag, '>'];

	} else {
		state.open.push ('/>');
	}

	builder.setState (A.common.BUILD);
	builder.build (state.open);
	builder.build (state.content);
	if (close) {
		builder.build (close);
	}

	builder.buildStackTop = builder.buildStackTop.prev;
}

function attr (builder, node) {
	var open = builder.buildStackTop.open;
	open.push (' ', node [1], '="');
	var i;
	var n = node.length;
	for (i = 2; i < n; i++) {
		open.push (node [i]);
	}
	open.push ('"');
}

function content (builder, node) {
	builder.buildStackTop.content.push (node);
}

function tagBuilderStates () {
	var states = {};
	var dispatch;

	// build attributes state
	dispatch = {};
	dispatch [types.ATTR] = attr;
	dispatch [undefined] = content;
	states [BUILD_ATTRS] = dispatch;

	// build state
	dispatch = A.common.builderDispatcher ();
	dispatch [types.TAG] = tag;
	states [A.common.BUILD] = dispatch;

	return states;
}
var states = tagBuilderStates ();

function tagBuilderParams () {
	params = A.common.builderParams ();
	params.states = states;

	return params;
}
var params = tagBuilderParams ();

var template = A.common.buildTemplate.bind ({params: params});

module.exports = {
	BUILD_ATTRS: BUILD_ATTRS,

	TagBuildState: TagBuildState,

	tag: tag,
	attr: attr,
	content: content,

	tagBuilderStates: tagBuilderStates,
	tagBuilderParams: tagBuilderParams,

	states: states,
	params: params,

	template: template
};
