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

// test 1

template = A.template (
	A.p (
		'Hello, ',
		A.em (A.insert ('who')),
		'.',
		[
			A.types.ATTR,
			'id',
			A.insert ('id')
		],
		A.br (),
		'You ',
		A.strong ('⑨'),
		'!'
	)
);

expect = '<p id="text">Hello, <em>World</em>.<br/>You <strong>⑨</strong>!</p>';
string = A.string (template, values);
showResult (expect, string);

// test 2

template = A.template (
	A.p (
		'Hello, ',
		A.a (
			A.href (
				'/who/',
				A.insert ('who')
			),
			A.em (
				A.insert ('who')
			)
		),
		'.',
		A.id (A.insert ('id')),
		A.br (),
		'You ',
		A.strong (
			A.inClass ('baka'),
			'⑨'
		),
		'!'
	)
);

expect = '<p id="text">Hello, <a href="/who/World"><em>World</em></a>.<br/>You <strong class="baka">⑨</strong>!</p>';
string = A.string (template, values);
showResult (expect, string);

// test 3

template = A.template (
	A.DOCTYPE,
	A.html (
		A.head (
			A.title (A.insert ('title'))
		),
		A.body (
			A.h1 ('List:'),
			A.ul (
				A.list (
					'items',
					A.li (
						A.id (A.insert ('id')),
						A.p (
							A.insert ('text'),
							A.img (
								A.inClass ('item image'),
								A.src (
									'/img/',
									A.insert ('id')
								)
							)
						)
					)
				)
			)
		)
	)
);

values = {
	title: 'Empty',
	items: []
};

expect = '<!DOCTYPE html>'
	+ '<html>'
	+ '<head><title>Empty</title></head>'
	+ '<body><h1>List:</h1><ul></ul></body>'
	+ '</html>';
string = A.string (template, values);
showResult (expect, string);

// test 4

values = {
	title: 'Utau list',
	items: [
		{id: 'teto', text: 'Kasane Teto.'},
		{id: 'uta', text: 'Utane Uta.'},
		{id: 'momo', text: 'Momone Momo.'}
	]
};

expect = '<!DOCTYPE html>'
	+ '<html>'
	+ '<head><title>Utau list</title></head>'
	+ '<body><h1>List:</h1><ul>'
	+ '<li id="teto"><p>Kasane Teto.<img class="item image" src="/img/teto"/></p></li>'
	+ '<li id="uta"><p>Utane Uta.<img class="item image" src="/img/uta"/></p></li>'
	+ '<li id="momo"><p>Momone Momo.<img class="item image" src="/img/momo"/></p></li>'
	+ '</ul></body>'
	+ '</html>';
string = A.string (template, values);
showResult (expect, string);

// test 5

template = A.template (
	A.DOCTYPE,
	A.html (
		A.head (
			A.title (A.insert ('title'))
		),
		A.body (
			A.h1 (A.insert ('title')),
			A.p ('Hello, World.'),
			A.h1 ('List:'),
			A.ul (
				A.list (
					'items',
					A.li (
						A.id (A.insert ('id')),
						A.p (
							A.insert ('text'),
							A.img (
								A.inClass ('item image'),
								A.src (
									'/img/',
									A.insert ('id')
								)
							)
						)
					)
				)
			)
		)
	)
);

values = {
	title: 'Test',
	items: [
		{ id: 'item_1', text: 'This is the first item.' },
		{ id: 'item_2', text: 'This is the second item.' }
	]
};

expect = '<!DOCTYPE html>'
	+ '<html><head><title>Test</title></head>'
	+ '<body><h1>Test</h1><p>Hello, World.</p><h1>List:</h1><ul>'
	+ '<li id="item_1"><p>This is the first item.'
	+ '<img class="item image" src="/img/item_1"/></p></li>'
	+ '<li id="item_2"><p>This is the second item.'
	+ '<img class="item image" src="/img/item_2"/></p></li>'
	+ '</ul></body></html>';
string = A.string (template, values);
showResult (expect, string);
