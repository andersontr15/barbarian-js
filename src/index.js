(function(window) {
  'use strict';
  var modules = [];
  var interpolationMatches = ['{', '}'];

  var saveData = function(data) {
    window.localStorage.setItem(data.name, JSON.stringify(data))
  }

  var Router = function(options) {
      return {
        routes: options.routes || [],
        previousRoute: null,
        currentRoute: window.location.href,
        routeTo: function(path) {
          var route = this.routes.filter(r => r.path === path)[0];
          if(route) {
            history.pushState({ controller: route.controller } , '', route.path);
            window.localStorage.setItem('controller', route.controller);
            document.querySelector('h3').innerHTML = route.path;
          }
          else {
            throw new Error('No route found with this name')
          }
        }
      }
    }
  var Barbarian = {
    Router: Router,
    // custom interpolation method
    interpolate: function(controller) {
      if(controller === undefined || !controller.name) {
        throw new Error('Must be a valid controller!')
      }
      var hasBinding = function(element) {
        return element.textContent.indexOf(interpolationMatches[0]) > -1 && element.textContent.indexOf(interpolationMatches[1]) > -1
      }
      var startPoint = Array.from(document.querySelectorAll('[barbarian-controller=' + controller.name + ']'));
      // testing for a single property binding 
      if(startPoint.length < 2) {
        var element = startPoint[0];
        if(hasBinding(element) === true) {
          var value = element.textContent.slice(element.textContent.indexOf('{') + 1, element.textContent.lastIndexOf('}'));
          if(value !== null && controller.properties.hasOwnProperty(value)){
            element.textContent = controller.properties[value];
            return element.textContent;
          }
        }
      }
      startPoint.forEach(function(c) {
        if(c !== null) {
          // lets bind some properties!
          var children = Array.from(c.children);
          // loop through node list and interpolate
          children.forEach(function(child) {
            if(hasBinding(child) === true) {
              var value = child.textContent.slice(child.textContent.indexOf('{') + 1, child.textContent.lastIndexOf('}'));
              if(value !== null && controller.properties.hasOwnProperty(value)) {
                if (controller.dependencies) {
                  child.textContent = controller.properties[value];
                  controller.dependencies.forEach(dep => {
                    child.textContent += ` > ${dep.name}`;
                  })
                } else {
                  child.textContent = controller.properties[value];
                }
              }
            }
          });
        }
      })
    },
    createModule: function(name, dependencies) {
      var module = {
        name: name,
        dependencies: dependencies,
        controllers: [],
        components: [],
        services: [],
        makeController: this.makeController,
        makeComponent: this.makeComponent,
        interpolate: this.interpolate,
        Router: this.Router
      };
      modules.push(module);
      return module;
    },
    makeController: function(name, properties) {
      var controller = {
        // trim controller name so as to allow for white space without 
        // throwing an exception
        name: name.trim(),
        properties: properties,
        dependencies: properties.dependencies,
      };
      this.interpolate(controller);
      this.controllers.push(controller);
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
      return element;
    },
    render: function(element, insertAfter) {

      var newElement = document.createElement(element.tagName);
      newElement.textContent = element.content;

      var nodeToAppendTo = document.querySelector(insertAfter);
      nodeToAppendTo.appendChild(newElement);

      return {
        outerHTML: document.querySelector(element.tagName).outerHTML,
        textContent: document.querySelector(element.tagName).textContent
      }
    }
  };
  window.Barbarian = Barbarian;
  // Exports for jest spec testing 
}(window));


module.exports = {
    interpolate: window.Barbarian.interpolate,
    render: window.Barbarian.render
};