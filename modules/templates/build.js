//
'use strict';

var A = require ('april1');
var dispatch = A.modules.dispatch;
var processNode = dispatch.node;

var types = require ('../types');

/**
 *
 * @param builder
 * @param node
 */
function tag (builder, node) {
	builder.state = {
		prev: builder.state,
		content: []
	};

	var name = node [1];

	var dispOutput = builder.dispatchers.output;
	processNode (builder, dispOutput, '<');
	processNode (builder, dispOutput, name);

	dispatch.nodes (
		builder, builder.dispatchers.attrs,
		node, 2, node.length);

	var content = builder.state.content;
	if (content.length <= 0) {
		processNode (builder, dispOutput, '/>');

	} else {
		processNode (builder, dispOutput, '>');

		dispatch.nodes (
			builder, dispOutput, content, 0, content.length);

		processNode (builder, dispOutput, '</');
		processNode (builder, dispOutput, name);
		processNode (builder, dispOutput, '>');
	}

	builder.state = builder.state.prev;
}

/**
 *
 * @param builder
 * @param node
 */
function attr (builder, node) {
	var dispOutput = builder.dispatchers.output;

	processNode (builder, dispOutput, ' ');
	processNode (builder, dispOutput, node [1]);

	processNode (builder, dispOutput, '="');
	dispatch.nodes (
		builder, dispOutput, node, 2, node.length);
	processNode (builder, dispOutput, '"');
}

/**
 *
 * @param builder
 * @param node
 */
function content (builder, node) {
	builder.state.content.push (node);
}

/**
 *
 * @param builder
 * @param node
 */
function invalidAttr (builder, node) {
	var msg = 'attr [';
	var s = '';
	var i;
	var n = node.length;
	var item;
	for (i = 1; i < n; i++) {
		item = node[i];
		msg += s;
		if (item === undefined) {
			msg += 'undefined';
		} else {
			if (item === null) {
				msg += 'null';
			} else {
				msg += item.toString ();
			}
		}
		s = ',';
	}
	msg = '] is not properly nested';
	throw new Error (msg);
}

/**
 *
 * @returns {{}}
 */
function outputDispatcher () {
	var outputTable = A.modules.templates.build.dispatcher ();

	dispatch.setup (outputTable, types.TAG, tag);
	dispatch.setup (outputTable, types.ATTR, invalidAttr);

	return outputTable;
}

/**
 *
 * @returns {{}}
 */
function attrsDispatcher () {
	var attrsTable = dispatch.dispatcher (content);

	dispatch.setup (attrsTable, types.ATTR, attr);

	return attrsTable;
}

module.exports = {
	tag: tag,
	attr: attr,
	content: content,
	outputDispatcher: outputDispatcher,
	attrsDispatcher: attrsDispatcher
};
