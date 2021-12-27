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
