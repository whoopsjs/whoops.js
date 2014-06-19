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
var aDOMElement = document.getElementById("element");

// Function Name: eval
// Argument:      first
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
// Argument:      first IIF it is a string
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
// Argument:      first IIF it is a string
// Browser:       IE 10+
// Example:       setImmediate("jsCode"+usercontrolledVal )
// Identifier:    {type: 'CallExpression', callee.name: 'setImmediate'}
setImmediate("console.log(\"" + userControlledValue + "\");");

// Function Name: execScript
// Argument:      first
// Browser:       IE 6+
// Example:       execScript("jsCode"+usercontrolledVal ,"JScript")
// Identifier:    {type: 'CallExpression', callee.name: 'execScript'}
execScript("console.log(\"" + userControlledValue + "\");", "JScript");

// Function Name: crypto.generateCRMFRequest
// Argument:      5th
// Browser:       Firefox 2+
// Example:       crypto.generateCRMFRequest('CN=0',0,0,null,'jsCode'+usercontrolledVal,384,null,'rsa-dual-use')
// Identifier:    {type: 'CallExpression', callee.type: 'MemberExpression', callee.object.name: 'crypto', callee.property.name: 'generateCRMFRequest'}
crypto.generateCRMFRequest("CN=0", 0, 0, null, "console.log(\"" + userControlledValue + "\");", 384, null, "rsa-dual-use");

// Function Name: ScriptElement.src
// Argument:      assignedValue
// Browser:       All
// Example:       script.src = usercontrolledVal
// Identifier:    {type: 'AssignmentExpression', left.type: 'MemberExpression', left.object.name: 'scriptDOMElement', left.property.name: 'src'}
scriptDOMElement.src = userControlledValue;

// Function Name: ScriptElement.text
// Argument:      assignedValue
// Browser:       Explorer
// Example:       script.text = 'jsCode'+usercontrolledVal
// Identifier:    {type: 'AssignmentExpression', left.type: 'MemberExpression', left.object.name: 'scriptDOMElement', left.property.name: 'text'}
scriptDOMElement.text = "console.log(\"" + userControlledValue + "\");";

// Function Name: ScriptElement.textContent
// Argument:      assignedValue
// Browser:       All but IE
// Example:       script.textContent = 'jsCode'+usercontrolledVal
// Identifier:    {type: 'AssignmentExpression', left.type: 'MemberExpression', left.object.name: 'scriptDOMElement', left.property.name: 'textContent'}
scriptDOMElement.textContent = "console.log(\"" + userControlledValue + "\");";

// Function Name: ScriptElement.innerText
// Argument:      assignedValue
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
/*
aDOMElement.onabort = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onafterprint = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onanimationend = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onanimationiteration = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onanimationstart = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onaudioprocess = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onbeforeprint = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onbeforeunload = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onbeginEvent = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onblocked = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onblur = "console.log(\"" + userControlledValue + "\");";
aDOMElement.oncached = "console.log(\"" + userControlledValue + "\");";
aDOMElement.oncanplay = "console.log(\"" + userControlledValue + "\");";
aDOMElement.oncanplaythrough = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onchange = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onchargingchange = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onchargingtimechange = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onchecking = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onclick = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onclose = "console.log(\"" + userControlledValue + "\");";
aDOMElement.oncompassneedscalibration = "console.log(\"" + userControlledValue + "\");";
aDOMElement.oncomplete = "console.log(\"" + userControlledValue + "\");";
aDOMElement.oncompositionend = "console.log(\"" + userControlledValue + "\");";
aDOMElement.oncompositionstart = "console.log(\"" + userControlledValue + "\");";
aDOMElement.oncompositionupdate = "console.log(\"" + userControlledValue + "\");";
aDOMElement.oncontextmenu = "console.log(\"" + userControlledValue + "\");";
aDOMElement.oncopy = "console.log(\"" + userControlledValue + "\");";
aDOMElement.oncut = "console.log(\"" + userControlledValue + "\");";
aDOMElement.ondblclick = "console.log(\"" + userControlledValue + "\");";
aDOMElement.ondevicelight = "console.log(\"" + userControlledValue + "\");";
aDOMElement.ondevicemotion = "console.log(\"" + userControlledValue + "\");";
aDOMElement.ondeviceorientation = "console.log(\"" + userControlledValue + "\");";
aDOMElement.ondeviceproximity = "console.log(\"" + userControlledValue + "\");";
aDOMElement.ondischargingtimechange = "console.log(\"" + userControlledValue + "\");";
aDOMElement.ondownloading = "console.log(\"" + userControlledValue + "\");";
aDOMElement.ondrag = "console.log(\"" + userControlledValue + "\");";
aDOMElement.ondragend = "console.log(\"" + userControlledValue + "\");";
aDOMElement.ondragenter = "console.log(\"" + userControlledValue + "\");";
aDOMElement.ondragleave = "console.log(\"" + userControlledValue + "\");";
aDOMElement.ondragover = "console.log(\"" + userControlledValue + "\");";
aDOMElement.ondragstart = "console.log(\"" + userControlledValue + "\");";
aDOMElement.ondrop = "console.log(\"" + userControlledValue + "\");";
aDOMElement.ondurationchange = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onemptied = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onended = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onendEvent = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onerror = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onfocus = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onfocusin = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onfocusout = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onfullscreenchange = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onfullscreenerror = "console.log(\"" + userControlledValue + "\");";
aDOMElement.ongamepadconnected = "console.log(\"" + userControlledValue + "\");";
aDOMElement.ongamepaddisconnected = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onhashchange = "console.log(\"" + userControlledValue + "\");";
aDOMElement.oninput = "console.log(\"" + userControlledValue + "\");";
aDOMElement.oninvalid = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onkeydown = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onkeypress = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onkeyup = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onlevelchange = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onload = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onloadeddata = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onloadedmetadata = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onloadend = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onloadstart = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onmessage = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onmousedown = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onmouseenter = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onmouseleave = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onmousemove = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onmouseout = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onmouseover = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onmouseup = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onnoupdate = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onobsolete = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onoffline = "console.log(\"" + userControlledValue + "\");";
aDOMElement.ononline = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onopen = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onorientationchange = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onpagehide = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onpageshow = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onpaste = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onpause = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onpointerlockchange = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onpointerlockerror = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onplay = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onplaying = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onpopstate = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onprogress = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onratechange = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onreadystatechange = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onrepeatEvent = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onreset = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onresize = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onscroll = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onseeked = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onseeking = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onselect = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onshow = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onstalled = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onstorage = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onsubmit = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onsuccess = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onsuspend = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onSVGAbort = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onSVGError = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onSVGLoad = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onSVGResize = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onSVGScroll = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onSVGUnload = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onSVGZoom = "console.log(\"" + userControlledValue + "\");";
aDOMElement.ontimeout = "console.log(\"" + userControlledValue + "\");";
aDOMElement.ontimeupdate = "console.log(\"" + userControlledValue + "\");";
aDOMElement.ontouchcancel = "console.log(\"" + userControlledValue + "\");";
aDOMElement.ontouchend = "console.log(\"" + userControlledValue + "\");";
aDOMElement.ontouchenter = "console.log(\"" + userControlledValue + "\");";
aDOMElement.ontouchleave = "console.log(\"" + userControlledValue + "\");";
aDOMElement.ontouchmove = "console.log(\"" + userControlledValue + "\");";
aDOMElement.ontouchstart = "console.log(\"" + userControlledValue + "\");";
aDOMElement.ontransitionend = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onunload = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onupdateready = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onupgradeneeded = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onuserproximity = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onversionchange = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onvisibilitychange = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onvolumechange = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onwaiting = "console.log(\"" + userControlledValue + "\");";
aDOMElement.onwheel = "console.log(\"" + userControlledValue + "\");";
*/