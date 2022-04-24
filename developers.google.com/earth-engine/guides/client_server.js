var clientString = 'I am a String';
print(typeof clientString);

var serverString = ee.String('I am not a String');
print(typeof serverString);
print('Is this an EE object?', serverString instanceof ee.ComputedObject);

var someString = serverString.getInfo();
var strings = someString + ' Am I?';
print(strings);

var toServerlist = ee.List(clientList);

var myList = ee.List([1, 2, 3]);
var serverBoolean = myList.contains(5);
print(serverBoolean);

var serverConditional = ee.Algorithm.If(serverBoolean, 'True', 'False!');
print('Should be false:', serverConditional);