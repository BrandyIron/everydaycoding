let b = 10
var a = 5
a = b
// a is now equal to 10

let (x, y) = (1, 2)
// x is qeual to 1, and y is equal to 2

if x = y {
    // This isn't valid, because x = y doesn't return a value
}

let three = 3
let minusThree = -three // minusThree equals -3
let plusThree = -minusThree // plusThree equals 3, or "minus minus three"

let minusSix = -6
let alsoMinusSix = +minusSix // alsoMinusSix equals -6

var a = 1
a += 2
// a is now equal to 3

let name = "world"
if name == "world" {
    print("hello, world")
} else {
    print("I'm sorry ¥(name), but I don't recognize you")
}

(1, "zebra") < (2, "apple") // true because 1 is less than 2; "zebra" and "apple" aren't compared
(3, "apple") < (3, "bird") // true because 3 is equal to 3, and "apple" is less than "bird"
(4, "dog") == (4, "dog") // true because 4 is equal to 4, and "dog" is equal to "dog"

