////////////////////////////////////////////////////////////////////////////////
//                                  DOM I/O                                   //
////////////////////////////////////////////////////////////////////////////////

// TODO


////////////////////////////////////////////////////////////////////////////////
//                           Direct Execution Sinks                           //
//          https://code.google.com/p/domxsswiki/wiki/ExecutionSinks          //
////////////////////////////////////////////////////////////////////////////////

var userControlledValue = document.getElementById("input");
var scriptDOMElement = document.getElementById("script");
var anyDOMElement = document.getElementById("element");

// Function Name: eval
// Argument:      CallExpression.arguments[0]
// Browser:       All
// Example:       eval("jsCode"+usercontrolledVal )
// Identifier:    {type: 'CallExpression', callee.name: 'eval'}
eval("console.log(\"" + userControlledValue + "\");");

// Function Name: Function
// Argument:      first if there's one, the last if >1 args
// Browser:       All
// Example:       Function("jsCode"+usercontrolledVal ) ,
//                Function("arg","arg2","jsCode"+usercontrolledVal )
// TODO does 'Function(String)' work this way?
/*
(Function(userControlledValue) {
    console.log(userControlledValue);
}());
(Function("arg", "arg2", userControlledValue) {
    console.log(userControlledValue);
}());
*/

// Function Name: setTimeout
// Argument:      CallExpression.arguments[0]
// Browser:       All
// Example:       setTimeout("jsCode"+usercontrolledVal ,timeMs)
// Identifier:    {type: 'CallExpression', callee.name: 'setTimeout'}
setTimeout("console.log(\"" + userControlledValue + "\");", 1000);

// Function Name: setInterval
// Argument:      first IIF it is a string
// Browser:       All
// Example:       setInterval("jsCode"+usercontrolledVal ,timMs)
// Identifier:    {type: 'CallExpression', callee.name: 'setInterval'}
setInterval("console.log(\"" + userControlledValue + "\");", 1000);

// Function Name: setImmediate
// Argument:      CallExpression.arguments[0]
// Browser:       IE 10+
// Example:       setImmediate("jsCode"+usercontrolledVal )
// Identifier:    {type: 'CallExpression', callee.name: 'setImmediate'}
setImmediate("console.log(\"" + userControlledValue + "\");");

// Function Name: execScript
// Argument:      CallExpression.arguments[0]
// Browser:       IE 6+
// Example:       execScript("jsCode"+usercontrolledVal ,"JScript")
// Identifier:    {type: 'CallExpression', callee.name: 'execScript', arguments[1]: 'JScript'}
execScript("console.log(\"" + userControlledValue + "\");", "JScript");

// Function Name: crypto.generateCRMFRequest
// Argument:      CallExpression.arguments[0]
// Browser:       Firefox 2+
// Example:       crypto.generateCRMFRequest('CN=0',0,0,null,'jsCode'+usercontrolledVal,384,null,'rsa-dual-use')
// Identifier:    {type: 'CallExpression', callee.type: 'MemberExpression', callee.object.name: 'crypto', callee.property.name: 'generateCRMFRequest'}
crypto.generateCRMFRequest("CN=0", 0, 0, null, "console.log(\"" + userControlledValue + "\");", 384, null, "rsa-dual-use");

// Function Name: ScriptElement.src
// Argument:      AssignmentExpression.right (== userControlledValue)
// Browser:       All
// Example:       script.src = usercontrolledVal
// Identifier:    {type: 'AssignmentExpression', left.type: 'MemberExpression', left.object.name: 'scriptDOMElement', left.property.name: 'src'}
scriptDOMElement.src = userControlledValue;

// Function Name: ScriptElement.text
// Argument:      AssignmentExpression.right (== userControlledValue)
// Browser:       Explorer
// Example:       script.text = 'jsCode'+usercontrolledVal
// Identifier:    {type: 'AssignmentExpression', left.type: 'MemberExpression', left.object.name: 'scriptDOMElement', left.property.name: 'text'}
scriptDOMElement.text = "console.log(\"" + userControlledValue + "\");";

// Function Name: ScriptElement.textContent
// Argument:      AssignmentExpression.right (== userControlledValue)
// Browser:       All but IE
// Example:       script.textContent = 'jsCode'+usercontrolledVal
// Identifier:    {type: 'AssignmentExpression', left.type: 'MemberExpression', left.object.name: 'scriptDOMElement', left.property.name: 'textContent'}
scriptDOMElement.textContent = "console.log(\"" + userControlledValue + "\");";

// Function Name: ScriptElement.innerText
// Argument:      AssignmentExpression.right (== userControlledValue)
// Browser:       All but Firefox
// Example:       script.innerText = 'jsCode'+usercontrolledVal
// Identifier:    {type: 'AssignmentExpression', left.type: 'MemberExpression', left.object.name: 'scriptDOMElement', left.property.name: 'innerText'}
scriptDOMElement.innerText = "console.log(\"" + userControlledValue + "\");";


// Function Name: anyTag.onEventName
// Argument:      assignedValue
// Browser:       All
// Example:       anyTag.onclick = 'jsCode'+usercontrolledVal
// Note:          List compiled from
//                 https://developer.mozilla.org/en-US/docs/Web/Reference/Events
//                 using using only non-deprecated standard events


// Identifier:     {type: 'AssignmentExpression', left.type: 'MemberExpression', left.object.name: 'anyDOMElement', left.property.name: 'on*'}
/*
anyDOMElement.onabort = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onafterprint = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onanimationend = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onanimationiteration = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onanimationstart = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onaudioprocess = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onbeforeprint = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onbeforeunload = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onbeginEvent = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onblocked = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onblur = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.oncached = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.oncanplay = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.oncanplaythrough = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onchange = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onchargingchange = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onchargingtimechange = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onchecking = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onclick = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onclose = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.oncompassneedscalibration = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.oncomplete = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.oncompositionend = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.oncompositionstart = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.oncompositionupdate = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.oncontextmenu = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.oncopy = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.oncut = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.ondblclick = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.ondevicelight = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.ondevicemotion = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.ondeviceorientation = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.ondeviceproximity = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.ondischargingtimechange = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.ondownloading = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.ondrag = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.ondragend = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.ondragenter = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.ondragleave = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.ondragover = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.ondragstart = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.ondrop = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.ondurationchange = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onemptied = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onended = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onendEvent = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onerror = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onfocus = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onfocusin = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onfocusout = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onfullscreenchange = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onfullscreenerror = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.ongamepadconnected = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.ongamepaddisconnected = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onhashchange = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.oninput = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.oninvalid = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onkeydown = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onkeypress = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onkeyup = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onlevelchange = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onload = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onloadeddata = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onloadedmetadata = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onloadend = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onloadstart = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onmessage = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onmousedown = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onmouseenter = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onmouseleave = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onmousemove = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onmouseout = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onmouseover = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onmouseup = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onnoupdate = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onobsolete = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onoffline = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.ononline = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onopen = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onorientationchange = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onpagehide = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onpageshow = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onpaste = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onpause = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onpointerlockchange = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onpointerlockerror = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onplay = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onplaying = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onpopstate = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onprogress = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onratechange = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onreadystatechange = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onrepeatEvent = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onreset = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onresize = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onscroll = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onseeked = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onseeking = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onselect = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onshow = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onstalled = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onstorage = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onsubmit = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onsuccess = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onsuspend = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onSVGAbort = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onSVGError = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onSVGLoad = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onSVGResize = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onSVGScroll = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onSVGUnload = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onSVGZoom = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.ontimeout = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.ontimeupdate = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.ontouchcancel = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.ontouchend = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.ontouchenter = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.ontouchleave = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.ontouchmove = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.ontouchstart = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.ontransitionend = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onunload = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onupdateready = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onupgradeneeded = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onuserproximity = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onversionchange = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onvisibilitychange = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onvolumechange = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onwaiting = "console.log(\"" + userControlledValue + "\");";
anyDOMElement.onwheel = "console.log(\"" + userControlledValue + "\");";
*/