// April 1
// HTML extension
// main module
'use strict';

var A = require ('april1');

var tempBuild = require ('./modules/templates/build');
var template = require ('./modules/template');
var types = require ('./modules/types');

/**
 *
 * @param name
 * @returns {Function}
 */
function specTag (name) {
	return A.modules.spec
		.nodeBuilder (types.TAG).bind (null, name);
}

/**
 *
 * @param name
 * @returns {Function}
 */
function specAttr (name) {
	return A.modules.spec
		.nodeBuilder (types.ATTR).bind (null, name);
}

module.exports = {
	// modules
	modules: {
		templates: {
			build: tempBuild
		},
		template: template,
		types: types
	},

	// external interface

	// spec node builders

	insert: A.insert,
	list: A.list,
	macro: A.macro,

	DOCTYPE: '<!DOCTYPE html>',

	// tags

	specTag: specTag,

	a: specTag ('a'),
	blockquote: specTag ('blockquote'),
	body: specTag ('body'),
	br: specTag ('br'),
	button: specTag ('button'),
	code: specTag ('code'),
	col: specTag ('col'),
	colgroup: specTag ('colgroup'),
	div: specTag ('div'),
	em: specTag ('em'),
	fieldset: specTag ('fieldset'),
	form: specTag ('form'),
	h1: specTag ('h1'),
	h2: specTag ('h2'),
	h3: specTag ('h3'),
	h4: specTag ('h4'),
	h5: specTag ('h5'),
	h6: specTag ('h6'),
	head: specTag ('head'),
	html: specTag ('html'),
	hr: specTag ('hr'),
	img: specTag ('img'),
	input: specTag ('input'),
	li: specTag ('li'),
	link: specTag ('link'),
	meta: specTag ('meta'),
	noscript: specTag ('noscript'),
	object: specTag ('object'),
	ol: specTag ('ol'),
	optgroup: specTag ('optgroup'),
	option: specTag ('option'),
	p: specTag ('p'),
	param: specTag ('param'),
	pre: specTag ('pre'),
	script: specTag ('script'),
	select: specTag ('select'),
	small: specTag ('small'),
	span: specTag ('span'),
	strong: specTag ('strong'),
	style: specTag ('style'),
	sub: specTag ('sub'),
	sup: specTag ('sup'),
	table: specTag ('table'),
	tbody: specTag ('tbody'),
	td: specTag ('td'),
	textarea: specTag ('textarea'),
	tfoot: specTag ('tfoot'),
	th: specTag ('th'),
	thead: specTag ('thead'),
	title: specTag ('title'),
	tr: specTag ('tr'),
	ul: specTag ('ul'),

	// attributes

	specAttr: specAttr,

	inClass: specAttr ('class'),
	href: specAttr ('href'),
	id: specAttr ('id'),
	lang: specAttr ('lang'),
	name: specAttr ('name'),
	src: specAttr ('src'),
	inStyle: specAttr ('style'),
	type: specAttr ('type'),

	// operation functions

	template: template.doBuildTemplate,
	string: A.string
};
