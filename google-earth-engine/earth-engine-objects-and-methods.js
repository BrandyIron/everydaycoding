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


