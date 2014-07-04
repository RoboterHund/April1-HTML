April1-HTML
===========

HTML April1 extension.

Example template:


	var template = A.template (
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

Example values:

	var values = {
		title: 'Test',
		items: [
			{ id: 'item_1', text: 'This is the first item.' },
			{ id: 'item_2', text: 'This is the second item.' }
		]
	};

Generate string:

	var result = A.string (template, values);

Result:

	<!DOCTYPE html>
	<html><head><title>Test</title></head>
	<body><h1>Test</h1><p>Hello, World.</p><h1>List:</h1><ul>
	<li id="item_1"><p>This is the first item.
	<img class="item image" src="/img/item_1"/></p></li>
	<li id="item_2"><p>This is the second item.
	<img class="item image" src="/img/item_2"/></p></li>
	</ul></body></html>

Note that no extra whitespace is added to output.
Actual result has no line breaks, unless explicitly added with `\n`.
