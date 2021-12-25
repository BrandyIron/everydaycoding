print('Hello World!');

// Use single (or double) quotes to make a string.
var greetString = 'Ahoy there!';
// Use parentheses to pass arguments to functions.
print(greetString);

// Store a number in a variable.
var number = 42;
print('The answer is:', number);

// Use square brackets [] to make a list
var listOfNumbers = [0, 1, 1, 2, 3, 5];
print('list of numbers:', listOfNumbers);

// Make a list of strings.
var listOfStrings = ['a', 'b', 'c', 'd'];
print('list of strings:', listOfStrings);

// Use curly brackets () to make a dictionary of key:value pairs.
var object = {
  foo: 'bar',
  baz: 13,
  stuff: ['this', 'that', 'the other thing']
};
print('Dictionary', object);
// Access dictionary items using square brackets.
print('Print foo', object['foo']);
// Access dictionary items using dot notation.
print('Print stuff', object.stuff);

var myFunction = function(parameter1, parameter2, parameter3) {
  statement;
  statement;
  statement;
  return statement;
};

// The reflect fuction takes a single parameter: element.
var reflect = function(element) {
  // Return the argument.
  return element;
};
print('A good day to you!', reflect('Back at you!'));

var aString = ee.Algorithms.String(42);
