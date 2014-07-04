//
'use strict';

var A = require ('../main');

var template;
var string;
var expect;

function showResult (expect, string) {
	console.log (expect);
	console.log (string);
	if (expect === string) {
		console.log ('OK');
	} else {
		console.log ('FAIL');
	}
}

// test 0

template = A.template (
	[
		A.types.TAG,
		'p',
		'Hello, ',
		A.insert ('who'),
		'.',
		[
			A.types.ATTR,
			'id',
			A.insert ('id')
		],
		[
			A.types.TAG,
			'br'
		],
		'You ばか!'
	]
);

var values = {
	who: 'World',
	id: 'text'
};

expect = '<p id="text">Hello, World.<br/>You ばか!</p>';
string = A.string (template, values);
showResult (expect, string);
