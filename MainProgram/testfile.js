////////////////////////////////////////////////////////////////////////////////
//                                  DOM I/O                                   //
////////////////////////////////////////////////////////////////////////////////

// TODO
document.onreadystatechange = function() {
	if(document.readyState == 'complete') {   
    var span = document.createElement('span');
		var input1 = document.createElement('input');
    var input3 = document.createElement('input');
    input1.setAttribute('name', 'herp');
    input1.name = 'herp';
    input3.setAttribute('id', 'derp');
    input3.id = 'derp';
		var button1 = document.createElement('button');
		var button1text = document.createTextNode('push me');
		button1.appendChild(button1text);
		button1.onclick = function() {
			var inputs = document.getElementsByTagName('input');
			for (var i = 0; i < inputs.length; i++)
			{
				if(inputs[0].value === '')
				{
					inputs[0].style.borderColor = 'red';
				}
				else
				{
					inputs[0].style.borderColor = 'lime';
          span.appendChild(document.createTextNode(inputs[0].value));
          var input2 = 'Hello World!';
          input2 = prompt('Evil Dom Input!');
          span.appendChild(document.createTextNode(input2));
          span.appendChild(document.createTextNode(evil()));
          var testDoc = document.createTextNode(inputs[i].value);
          span.appendChild(testDoc);
				}
			}
      var derp = document.getElementByID('derp');
      span.appendChild(document.createTextNode(document.getElementsByName('herp')));
      span.appendChild(document.createTextNode(derp));
		};
		document.body.appendChild(button1);
    document.body.appendChild(span);
	}
  
  function evil(){
    var evilInput = prompt('Another Evil Dom Input!');
    return evilInput;
  }
};
