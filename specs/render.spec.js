(function() {
   const render = require('../src/index').render;
   describe('It tests for basic functionality of the Barbarian render method', () => {
    beforeAll(() => {
     this.tagName = 'h1';
     this.content = 'I am an h1';
     this.element = {
       tagName: this.tagName,
       content: this.content
     };
     this.div = document.createElement('div');
     document.body.appendChild(this.div);
     this.insertAfter = 'div';
     this.expectedTextContent = 'I am an h1';
     this.expectedOuterHTML = '<h1>' + this.expectedTextContent + '</h1>';
    });
    test("it creates and renders a simple h1 element with text", () => {
       var result =  render(this.element, this.insertAfter);
       expect(result.textContent).toBe(this.expectedTextContent);
    });
    test("it creates and returns an h1 element with the correct outerHTML", () => {
       var result = render(this.element, this.insertAfter);
       expect(result.outerHTML).toBe(this.expectedOuterHTML)
    });
  });
}());