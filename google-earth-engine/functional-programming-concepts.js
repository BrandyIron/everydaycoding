// This generates a list of numbers from 1 to 10.
var myList = ee.List.sequence(1, 10);

// The map operation takes a function that works on each element independently
// and returns a value. You define a function that can be applied to the input.
var computeSquares = function(number) {
  // We define the operation using the EE API.
  return ee.Number(number).pow(2);
}

// Apply your function to each item in the list by using the map() function.
var squares = myList.map(computeSquares);
print(squares);

// The following function determines if a number is even or odd. The mod(2)
// function returns 0 if the number is even and 1 if it is odd (the remainder
// after dividing by 2). The input is multiplied by this remainder so even
// numbers get set to 0 and odd numbers are left changed.
var getOddNumbers = function(number) {
  number = ee.Number(number); // Cast the input to a Number so we can use mod.
  var remainder = number.mod(2);
  return number.multiply(remainder);
};

var newList = myList.map(getOddNumbers);

// Remove the 0 values.
var oddNumbers = newList.removeAll([0]);

var squares = oddNumbers.map(computeSquares);
print(squares);

var collection = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA');

// Divide the collection into 2 subsets and apply a different algorithm on them.
var subset1 = collection.filter(ee.Filter.lt('SUN_ELEVATION', 40));
var subset2 = collection.filter(ee.Filter.gte('SUN_ELEVATION', 40));

var processed1 = subset1.map(function(image) {
  return image.multiply(2);
});
var processed2 = subset2;

// Merge the collections to get a single collection.
var final = processed1.merge(processed2);
print('Original collection size', collection.size());
print('Processed collection size', final.size());



