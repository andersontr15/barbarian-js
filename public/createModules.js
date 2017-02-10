window.onload = function() {
  var router = new Barbarian.Router({
    routes: [
      {
        path: '/grandparent',
        controller: 'GrandParent'
      },
      {
        path: '/parent',
        controller: 'Parent'
      },
      {
        path: '/child',
        controller: 'Child'
      }
    ]
  });
  // using router
  var buttons = Array.from(document.querySelectorAll('button'));

  function handleClick(event) {
    var route = event.target.getAttribute('route');
    router.routeTo(route);
  }

  buttons.forEach(function(button) {
    button.addEventListener('click', handleClick, false)
  })

  // // GrandParent Module
  // var grandParentModule = Barbarian.createModule('GrandParent', []);

  // var grandParentController = grandParentModule.makeController('GrandParent', {
  //   name: 'Grand Parent',
  //   age: 78
  // });

  // // Parent Module
  // var parentModule = Barbarian.createModule('Parent', []);

  // var parentController = parentModule.makeController('Parent', {
  //   name: 'Parent',
  //   age: 51,
  //   dependencies: [grandParentModule]
  // });

  // // Child Module
  // var childModule = Barbarian.createModule('Child', []);

  // var childController = childModule.makeController('Child', {
  //   name: 'Child',
  //   age: 23,
  //   dependencies: [parentModule, grandParentModule]
  // });
}
