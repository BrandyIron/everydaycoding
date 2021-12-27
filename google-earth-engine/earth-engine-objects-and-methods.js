// Define a string, then put it into a an EE container.
var eeString = ee.String('To the cloud');
print('Where to?', eeString);

// Define a string that exists on the server.
var serverString = ee.String('This is on the server.');
print('String on the server', serverString);

// Define a number that exists on the server.
var serverNumber = ee.Number(Math.E);
print('e=', serverNumber);

// Use a built-in function to perform an operation on the number
var logE = serverNumber.log();
print('log(e)=', logE);

// Make a sequence the hard way.
var eeList = ee.List([1, 2, 3, 4, 5]);
// Make a sequence the easy way!
var sequence = ee.List.sequence(1, 5);
print('sequence', sequence);

// Use a method on an ee.List to extract a value.
var value = sequence.get(2);
print('Value at index 2:', value);

// Cast the return value of get() to a number.
print('No error:', ee.Number(value).add(3));

// Make a Dictionary on the server.
var dictionary = ee.Dictionary({
  e: Math.E,
  pi: Math.PI,
  phi: (1 + Math.sqrt(5)) / 2
});

// Get some values from the dictionary.
print('Euler:', dictionary.get('e'));
print('Pi:', dictionary.get('pi'));
print('Golden ratio:', dictionary.get('phi'));

// Get all the keys:
print('Keys:', dictionary.keys());
