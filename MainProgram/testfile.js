////////////////////////////////////////////////////////////////////////////////
//                                  DOM I/O                                   //
////////////////////////////////////////////////////////////////////////////////

// TODO
document.onreadystatechange = function() {
	if(document.readyState == 'complete') {   
    var span = document.createElement('span');
		var input1 = document.createElement('input');
    var input3 = document.createElement('input');
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
          var input2 = 'Hello World!';
          input2 = prompt('Evil Dom Input!');
          span.appendChild(document.createTextNode(input2));
          span.appendChild(document.createTextNode(evil()));
				}
			}
		};
		document.body.appendChild(button1);
    document.body.appendChild(span);
	}
  
  function evil(){
    var evilInput = prompt('Another Evil Dom Input!');
    return evilInput;
  }
};
////////////////////////////////////////////////////////////////////////////////
//                           Direct Execution Sinks                           //
//          https://code.google.com/p/domxsswiki/wiki/ExecutionSinks          //
////////////////////////////////////////////////////////////////////////////////

var userControlledValue = document.getElementById('input');
var hTMLScriptElement = document.getElementById('script');
var hTMLElement = document.getElementById('element');

// Function Name: eval
// Argument:      first
// Browser:       All
// Identifier:    {type: 'CallExpression', callee.name: 'eval', arguments[0]: isUserControlledValue}
eval('console.log(\'' + userControlledValue + '\');');

// Function Name: Function
// Argument:      last
// Browser:       All
// Identifier:    {type: 'CallExpression', callee.name: 'Function', arguments[arguments.length - 1]: isUserControlledValue}
Function('arg', 'arg2', 'console.log(\'' + userControlledValue + '\');');

// Function Name: setTimeout
// Argument:      first if it is a string
// Browser:       All
// Identifier:    {type: 'CallExpression', callee.name: 'setTimeout', arguments[0]: isUserControlledValue}
setTimeout('console.log(\'' + userControlledValue + '\');', 1000);

// Function Name: setInterval
// Argument:      first if it is a string
// Browser:       All
// Identifier:    {type: 'CallExpression', callee.name: 'setInterval', arguments[0]: isUserControlledValue}
setInterval('console.log(\'' + userControlledValue + '\');', 1000);

// Function Name: setImmediate
// Argument:      first if it is a string
// Browser:       IE 10+
// Identifier:    {type: 'CallExpression', callee.name: 'setImmediate', arguments[0]: isUserControlledValue}
setImmediate('console.log(\'' + userControlledValue + '\');');

// Function Name: execScript
// Argument:      first
// Browser:       IE 6+
// Identifier:    {type: 'CallExpression', callee.name: 'execScript', arguments[0]: isUserControlledValue, arguments[1]: 'JScript'}
execScript('console.log(\'' + userControlledValue + '\');', 'JScript');

// Function Name: crypto.generateCRMFRequest
// Argument:      5th
// Browser:       Firefox 2+
// Identifier:    {type: 'CallExpression', callee.type: 'MemberExpression', callee.object.name: 'crypto', callee.property.name: 'generateCRMFRequest', arguments[0]: 'CN=0', arguments[1]: 0, arguments[2]: 0, arguments[3]: null, arguments[4]: isUserControlledValue, arguments[5]: 384, arguments[6]: null, arguments[7]: 'rsa-dual-use'}
crypto.generateCRMFRequest('CN=0', 0, 0, null, 'console.log(\'' + userControlledValue + '\');', 384, null, 'rsa-dual-use');

// Function Name: HTMLScriptElement.src
// Argument:      assignedValue
// Browser:       All
// Identifier:    {type: 'AssignmentExpression', left.type: 'MemberExpression', left.object: isHTMLScriptElement, left.property.name: 'src', right: isUserControlledValue}
hTMLScriptElement.src = 'console.log(\'' + userControlledValue + '\');';

// Function Name: HTMLScriptElement.text
// Argument:      assignedValue
// Browser:       Explorer
// Identifier:    {type: 'AssignmentExpression', left.type: 'MemberExpression', left.object: isHTMLScriptElement, left.property.name: 'text', right: isUserControlledValue}
hTMLScriptElement.text = 'console.log(\'' + userControlledValue + '\');';

// Function Name: HTMLScriptElement.textContent
// Argument:      assignedValue
// Browser:       All but IE
// Identifier:    {type: 'AssignmentExpression', left.type: 'MemberExpression', left.object: isHTMLScriptElement, left.property.name: 'textContent', right: isUserControlledValue}
hTMLScriptElement.textContent = 'console.log(\'' + userControlledValue + '\');';

// Function Name: HTMLScriptElement.innerText
// Argument:      assignedValue
// Browser:       All but Firefox
// Identifier:    {type: 'AssignmentExpression', left.type: 'MemberExpression', left.object: isHTMLScriptElement, left.property.name: 'innerText', right: isUserControlledValue}
hTMLScriptElement.innerText = 'console.log(\'' + userControlledValue + '\');';


// Function Name: HTMLElement.on*
// Argument:      assignedValue
// Browser:       All
// Identifier:    {type: 'AssignmentExpression', left.type: 'MemberExpression', left.object: isHTMLElement, left.property.name: 'on*', right: isUserControlledValue}
// Note:          List compiled from
//                 https://developer.mozilla.org/en-US/docs/Web/Reference/Events
//                 using using only non-deprecated standard events
hTMLElement.onabort = 'console.log(\'' + userControlledValue + '\');';
/*
hTMLElement.onafterprint = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onanimationend = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onanimationiteration = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onanimationstart = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onaudioprocess = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onbeforeprint = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onbeforeunload = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onbeginEvent = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onblocked = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onblur = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.oncached = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.oncanplay = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.oncanplaythrough = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onchange = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onchargingchange = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onchargingtimechange = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onchecking = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onclick = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onclose = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.oncompassneedscalibration = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.oncomplete = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.oncompositionend = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.oncompositionstart = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.oncompositionupdate = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.oncontextmenu = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.oncopy = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.oncut = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.ondblclick = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.ondevicelight = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.ondevicemotion = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.ondeviceorientation = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.ondeviceproximity = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.ondischargingtimechange = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.ondownloading = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.ondrag = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.ondragend = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.ondragenter = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.ondragleave = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.ondragover = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.ondragstart = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.ondrop = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.ondurationchange = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onemptied = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onended = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onendEvent = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onerror = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onfocus = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onfocusin = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onfocusout = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onfullscreenchange = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onfullscreenerror = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.ongamepadconnected = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.ongamepaddisconnected = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onhashchange = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.oninput = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.oninvalid = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onkeydown = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onkeypress = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onkeyup = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onlevelchange = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onload = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onloadeddata = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onloadedmetadata = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onloadend = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onloadstart = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onmessage = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onmousedown = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onmouseenter = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onmouseleave = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onmousemove = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onmouseout = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onmouseover = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onmouseup = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onnoupdate = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onobsolete = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onoffline = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.ononline = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onopen = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onorientationchange = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onpagehide = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onpageshow = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onpaste = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onpause = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onpointerlockchange = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onpointerlockerror = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onplay = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onplaying = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onpopstate = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onprogress = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onratechange = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onreadystatechange = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onrepeatEvent = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onreset = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onresize = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onscroll = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onseeked = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onseeking = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onselect = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onshow = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onstalled = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onstorage = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onsubmit = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onsuccess = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onsuspend = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onSVGAbort = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onSVGError = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onSVGLoad = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onSVGResize = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onSVGScroll = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onSVGUnload = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onSVGZoom = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.ontimeout = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.ontimeupdate = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.ontouchcancel = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.ontouchend = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.ontouchenter = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.ontouchleave = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.ontouchmove = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.ontouchstart = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.ontransitionend = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onunload = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onupdateready = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onupgradeneeded = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onuserproximity = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onversionchange = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onvisibilitychange = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onvolumechange = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onwaiting = 'console.log(\'' + userControlledValue + '\');';
hTMLElement.onwheel = 'console.log(\'' + userControlledValue + '\');';
*/