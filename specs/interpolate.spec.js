(function() {

// Testing interpolate method of Barbarian.js 

const interpolate = require('../index').interpolate;

// sample test
test('it runs a test', () => {
	expect(typeof 'hello world').toBe('string')
});

// testing interpolation functionality of controllers 

test('it interpolates 1 expression from Barbarian controllers', () => {
		var view = '<h1>{name}</h1>';
		var template = document.createElement('div');
		template.innerHTML = view;
		template.setAttribute('barbarian-controller', 'Test');
		document.body.appendChild(template);		
		var mockController = {
			name: 'Test',
			properties: {
			name: 'Theo'
			}
		}
		var expected = 'Theo'

	 var result =	interpolate(mockController);

		expect(result).toBe(expected);
})

}());