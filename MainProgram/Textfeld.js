document.onreadystatechange = function() {
	if(document.readyState == "complete") {   
    var span = document.createElement("span");
		var input1 = document.createElement('input');
		document.body.appendChild(input1);
		var button1 = document.createElement('button');
		var button1text = document.createTextNode('push me');
		button1.appendChild(button1text);
		button1.onclick = function() {
			var inputs = document.getElementsByTagName('input');
			for (var i = 0; i < inputs.length; i++)
			{
				if(input.value === '')
				{
					input.style.borderColor = 'red';
				}
				else
				{
					input.style.borderColor = 'lime';
          span.appendChild(document.createTextNode(input.value));
				}
				console.log(input);
			}
		};
		document.body.appendChild(button1);
    document.body.appendChild(span);
	}
};