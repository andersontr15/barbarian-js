(function(window) {
	'use strict';
	 var components = [];
	 var Barbarian = function() {
	 	return {
	 		render: function() {

	 		},
	 		request: function() {

	 		},
	 		route: function() {

	 		},
	 		interpolate: function() {

	 		},
	 		bind: function() {

	 		},
	 		updateBinding: function(prop, value, name) {
	 			var component = components.find(function(component) {
	 				return component.name === name;
	 			});
	 			component.element.setAttribute('data-'+prop, value);
	 		},
	 		makeComponent: function(object) {
	 			const name = object.name;
	 			const text = object.text;
	 			const selector = object.selector;
	 			const bindTo = object.bindTo;
	 			const properties = object.properties;

	 			var element = document.createElement(selector);
	 			element.textContent = text;
	 			for(var prop in properties) {
	 				element.setAttribute('data-' + prop, properties[prop])
	 			}
	 			var elementToBindTo = document.querySelector(bindTo);

	 			elementToBindTo.appendChild(element);
	 			components.push({
	 				name: name,
	 				text: text,
	 				selector: selector,
	 				bindTo: bindTo,
	 				properties: properties,
	 				element: element
	 			});
	 			return element;
	 		}
	 	};
	 } 
	 window.Barbarian = Barbarian;
}(window));
