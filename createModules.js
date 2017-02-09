window.onload = function() {

  var router = new Barbarian.Router();

  router.routeTo('test')
  // GrandParent Module
  var grandParentModule = Barbarian.createModule('GrandParent', []);

  var grandParentController = grandParentModule.makeController('GrandParent', {
    name: 'Grand Parent',
    age: 78
  });

  // Parent Module
  var parentModule = Barbarian.createModule('Parent', []);

  var parentController = parentModule.makeController('Parent', {
    name: 'Parent',
    age: 51,
    dependencies: [grandParentModule]
  });

  // Child Module
  var childModule = Barbarian.createModule('Child', []);

  var childController = childModule.makeController('Child', {
    name: 'Child',
    age: 23,
    dependencies: [parentModule, grandParentModule]
  });
}
