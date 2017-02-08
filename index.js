(function(window) {
 'use strict';
  var modules = [];
  var interpolationMatches = ['{', '}'];

  var saveData = function(module) {
    window.localStorage.setItem(module.name, JSON.stringify(module));
  }
  var Barbarian = {
    // dependency injection
    injectDependencies: function(dependency) {
        return typeof dependency === "function";
    },
    // render method
    render: function(elementName, text, elementToBindTo) {

      var element = document.createElement(elementName);
      var elementToBindTo = document.querySelector(elementToBindTo);

      element.textContent = text;
      elementToBindTo.appendChild(element);

    },
    // custom interpolation method 
    interpolate: function(controller) {

     var hasBinding = function(element) {
      return element.textContent.indexOf(interpolationMatches[0]) > -1 && element.textContent.indexOf(interpolationMatches[1]) > -1
     }

     var startPoint = Array.from(document.querySelectorAll('[barbarian-controller =' + controller.name + ']'));

     startPoint.forEach(function(c) {

       if(c !== null) {
        // lets bind some properties!
       var children = Array.from(c.children);

       // loop through node list and interpolate 
       children.forEach(function(child) {

        if(hasBinding(child) === true) {

         var value = child.textContent.slice(1, child.textContent.lastIndexOf('}'));

         if(value !== null && controller.properties.hasOwnProperty(value)) {
            child.textContent = controller.properties[value];
         }
        }

       });
      }
     })
    },
    createModule: function(name) {

     var module = {
      name: name,
      controllers: [],
      components: [],
      services: [],
      makeController: this.makeController,
      makeComponent: this.makeComponent,
      interpolate: this.interpolate,
      render: this.render
     };

     modules.push(module);

     saveData(module);

     return module;

    },
    makeService: function(method) {

      this.injectDependencies(method) === true ? this.services.push(method) : 'Service must be a valid function!';

      saveData(this);
    },
    makeController: function(name, properties) {

     var controller = {
      name: name,
      properties: properties
     };

     this.interpolate(controller);
     this.controllers.push(controller);

     saveData(this);

     return this;

    },
    makeComponent: function(object) {

     var name = object.name;
     var text = object.text;
     var selector = object.selector;
     var bindTo = object.bindTo;
     var properties = object.properties;
     var element = document.createElement(selector);

     element.textContent = text;
     for(var prop in properties) {
      element.setAttribute('data-' + prop, properties[prop])
     }

     var elementToBindTo = document.querySelector(bindTo);

     elementToBindTo.appendChild(element);

     this.components.push(element);

     saveData(this);

     return element;
    }
   };
   window.Barbarian = Barbarian;
}(window));
