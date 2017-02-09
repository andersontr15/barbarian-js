# Barbarian.js

![](./barbarian.png?raw=true)

Primitive JavaScript framework taking advantage of vanilla JavaScript and DOM scripting.

The purpose of this framework is to reduce bloat often found in JavaScript frameworks in 2017.

Functionality of this framework will include: interpolation, routing, rendering, component architecture
and encapsulation

## API 

#### Router

- Top level method provided by Barbarian.js to create a router 
- Arguments: name, routes, routeTo, routeHistory, currentRoute

#### createModule

- This method will instantiate a new module and return to you the freshly created object

#### render 

- For basic debugging, Barbarian.js will render an element to the page
- Arguments: name, elementToBindTo, text

#### makeController

- Calling this method on on the module will create a controller and add it to the module
- Arguments: name, properties

#### makeComponent

- Calling this method will create a new component for you and add it to the module
- Arguments: name, properties, selector, bindTo

#### makeService

- Calling this method will create a new service to be injected within your module 

#### interpolate
- This method will attempt to interpolate all of your controllers bindings within the { } syntax. 
