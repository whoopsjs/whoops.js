var input1 = prompt('Evil Dom Input!');

var span = document.createElement("span");
span.appendChild(document.createTextNode(input1));
document.body.appendChild(span);
