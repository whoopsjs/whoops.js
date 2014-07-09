document.onreadystatechange = function() {
	if(document.readyState == 'complete') {   
    var span = document.createElement('span');
		var input1 = document.createElement('input');
		document.body.appendChild(input1);
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
          var input2 = prompt('Evil Dom Input!');
          span.appendChild(document.createTextNode(input2));
				}
			}
		};
		document.body.appendChild(button1);
    document.body.appendChild(span);
	}
};