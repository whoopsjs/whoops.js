/* Test 1
 *
 * Should fail
 *
 * inject evil things with something like
 * <img src="https://farm4.staticflickr.com/3734/9080284237_b2d8820070.jpg" onload="console.log('blah');this.parentNode.removeChild(this);"></img>
 * as input
 *
 */

var nameInput = document.getElementById('nameInput');
var newElement = document.createElement('div');
newElement.innerHtml = 'Hello ' + nameInput.value;
document.appendChild(newElement);


/* Test 2
 *
 * Should fail
 *
 * eval is evil
 *
 */

var mathInput = document.getElementById('mathInput');

alert('Your result: ' + eval(mathInput.value));


/* Test 3
 *
 * Should pass
 *
 */

var now = new Date();
var days = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
var months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');

today = days[now.getDay()] + ", " +
  now.getDate() + ". " +
  months[now.getMonth()] + " " +
  now.getYear();

document.write(today);


/* Test 4
 *
 * Should fail
 *
 * just renaming eval >:(
 *
 */

var myFunction = eval;
console.log(myFunction('2+2'));


/* Test 5
 *
 * Should pass
 *
 * To be discussed if this should be inspected
 *
 */

(function ($, x) {
  return $.cos($.asin(x));
}(Math, 0.5));


/* Test 6
 *
 * Should fail
 *
 * Use of undeclared variable
 *
 */

var c = myUndeclaredVariable;

/* Test 7
 *
 * Should fail
 *
 * Call of undeclared function
 *
 */

var d = myUndeclaredFunction();


/* Test 8
 *
 * Should fail
 *
 * Set global variable
 *
 */

global = 42;


/* Test 9
 *
 * Should pass
 *
 */

var a = 3;
if (a < 2) {
  var c = 5;
} else if (a > 5) {
  var f = 41;
} else {
  var g = 'I am a String!';
}



/* Test 10
 *
 * Should pass
 *
 */
var a = 0;
while (a < 5) {
  ++a;
}
