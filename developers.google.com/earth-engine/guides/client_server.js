var clientString = 'I am a String';
print(typeof clientString);

var serverString = ee.String('I am not a String');
print(typeof serverString);
print('Is this an EE object?', serverString instanceof ee.ComputedObject);

var someString = serverString.getInfo();
var strings = someString + ' Am I?';
print(strings);

