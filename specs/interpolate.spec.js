(function() {

  const interpolate = require('../src/index').interpolate;

  describe("it tests the basic functionality of the Barbarian interpolate method", () => {
    beforeAll(() => {
      this.view = '<h1>{name}</h1>';
      this.template = document.createElement('div');
      this.template.innerHTML = this.view;
      this.template.setAttribute('barbarian-controller', 'Test');
      document.body.appendChild(this.template);  
      this.mockController = {
        name: 'Test',
        properties: { name: 'Theo'}
      };
    });
    test('it interpolates 1 expression from Barbarian controllers', () => {
      var expected = this.mockController.properties.name;
      var result = interpolate(this.mockController);
      
      expect(result).toBe(expected);
    })
  });
}());
