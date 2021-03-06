var aws = 'd2gbom735ivs5c.cloudfront.net/m';
var mi2 = 'www.mi2f.com/m';
var eon = 'www.eonhq.com/m';
var d = document;

function headTags() {
	tag1 = document.createElement('meta');
	tag1.id = "viewport";
	tag1.name = "viewport";
	tag1.content = "width=device-width; initial-scale=1.0; user-scalable=true;";
	document.getElementsByTagName('head')[0].appendChild(tag1);
	tag2 = document.createElement('meta');
	tag2.id = "HandheldFriendly";
	tag2.name = "HandheldFriendly";
	tag2.content = "true";
	document.getElementsByTagName('head')[0].appendChild(tag2);
}
headTags();

function doPic() {
	var pics = document.getElementsByClassName('pic');
	//alert("pics=" + pics.length);
	for (var i = 0; i < pics.length; i++) {
		pictag = pics[i];

		var notags = pictag.getElementsByTagName('noscript');
		for (var j = 0; j < notags.length; j++) {
			notag = notags[j];  // inside a noscript is only text, not nodes

			var txt = notag.innerHTML;

			// replace name BEFORE creating img element, to stop browser downloading
			var col0 = txt.indexOf('src="');
			if (col0 < 0) continue;
			var col1 = txt.indexOf('"', col0 + 5);
			if (col1 < 0) continue;
			var path = txt.substr(col0 + 5, col1 - col0 - 5);
			if (path.length < 1) continue;

			txt = txt.replace(path, cdnPath(path)).replace("&lt;", "<").replace("&gt;", ">");
			//alert(txt);

			// is this the best way to append a new image tag using the text?
			var el = document.createElement('div');
			el.innerHTML = txt;
			els = el.getElementsByTagName('img');
			var picEl = els[0];
			var img = pictag.appendChild(picEl);
		}

	}
}

function cdnPath(path) {
	// replace path with cdn path if valid, else return path unchanged
	if (true) return (path);  // NB

	var url = absolute(location.href, path);   // full url
	var dum = "[$]";
	url = url.replace("www.mathsisfun.com", dum);
	url = url.replace("localhost:81/mathsisfun", dum);

	var col1 = url.indexOf(dum);
	if (col1 == -1) return path;
	var col2 = url.lastIndexOf("/");
	if (col2 == -1) return path;

	col1 += dum.length;
	var dirStr = url.substr(col1, col2 - col1);    // http://dum/bla/bla/file.swf => /bla/bla

	var newDom = "";
	var ext = url.split('.').pop();
	//alert("cdn:" + url + "," + ext);
	var dirs = [];
	switch (ext) {
		case "swf":
			dirs = [["images", "mi2"], ["activity#", "mi2"], ["algebra#", "mi2"], ["calculus#", "mi2"], ["combinatorics#", "mi2"], ["data#", "mi2"], ["definitions#", "mi2"], ["games#", "mi2"], ["geometry#", "mi2"], ["measure#", "mi2"], ["money#", "mi2"], ["numbers#", "mi2"], ["sets#", "mi2"], ["TI#", "mi2"]];
			break;
		case "jpg":
		case "gif":
		case "png":
			dirs = [["images", "mi2"], ["images/style", "mi2"], ["activity#", "mi2"], ["algebra#", "mi2"], ["calculus#", "mi2"], ["combinatorics#", "mi2"], ["data#", "mi2"], ["definitions#", "eon"], ["games#", "mi2"], ["geometry#", "mi2"], ["measure#", "mi2"], ["money#", "mi2"], ["numbers#", "mi2"], ["sets#", "mi2"], ["TI#", "mi2"]];
			break;
	}
	for (var i = 0; i < dirs.length; i++) {
		var dir0 = "/" + dirs[i][0].replace("#", "/images");
		if (dirStr == dir0) {
			newDom = dirs[i][1];
			break;
		}
	}
	//newDom = "?";
	switch (newDom) {
		case "eon":
			url = url.replace(dum, eon);
			return url;
			break;
		case "mi2":
			url = url.replace(dum, mi2);
			return url;
			break;
		case "aws":
			url = url.replace(dum, aws);
			return url;
			break;
	}

	return path;
}
function absolute(base, relative) {
	var stack = base.split("/"),
		parts = relative.split("/");
	stack.pop(); // remove current file name (or empty string)
	// (omit if "base" is the current folder without trailing slash)
	for (var i = 0; i < parts.length; i++) {
		if (parts[i] == ".")
			continue;
		if (parts[i] == "..")
			stack.pop();
		else
			stack.push(parts[i]);
	}
	return stack.join("/");
}


// flash interaction
function getLocation() {
	return window.location.toString();
}

// localization
DecSep = (1.5).toLocaleString().charAt(1);
ThouSep = String.fromCharCode(90 - DecSep.charCodeAt(0));
if (DecSep == ",") {
	DecType = "c";
} else {
	DecType = "";
}
function decfmt() {
	if (DecSep == ",") {
		// 0,00=>0#00 then 0.0=>0,0, then 0#0=>0.0
		document.body.innerHTML = document.body.innerHTML.replace(/(\d),(\d\d)/g, '$1#$2').replace(/(\d)\.(\d)/g, '$1,$2').replace(/(\d)#(\d)/g, '$1.$2');
		// images replace "." with "c."
		var imgs = document.body.getElementsByTagName("img");
		for (var i = 0; i < imgs.length; i++) {
			if (imgs[i].getAttribute("hasdec") != null && imgs[i].getAttribute("hasdec") != "") {
				imgs[i].src = imgs[i].src.replace(/\.(gif|jpg|png)/g, "c.$1");
			}
		}
	}
}
function doSpell() {
	if (typeof(reSpell) == 'undefined') return;
	var userLang = (navigator.language) ? navigator.language : navigator.userLanguage;
	switch (userLang.toLowerCase()) {
		case "en-us":
			break;
		case "en-au":
		case "en-ca":
		case "en-gb":
		case "en-ie":
		case "en-nz":
		case "en-za":
			fixSpells(document.body);
			break;
		default:
	}
}

function fixSpells(elem) {
	// check if parameter is a an ELEMENT_NODE
	if (!(elem instanceof Node) || elem.nodeType !== Node.ELEMENT_NODE) return;
	var children = elem.childNodes;
	for (var i = 0; children[i]; ++i) {
		var node = children[i];
		switch (node.nodeType) {
			case Node.ELEMENT_NODE: // call recursively
				fixSpells(node);
				break;
			case Node.TEXT_NODE: // fix spelling
				var s = node.nodeValue;
				if (s.length < 4) break; // leave quickly if small
				if (s.match(/(?=.*[a-zA-Z])/)) { // any chars inside at all?
					//s = "(" + s + ")"
					var sStt = s;
					for (var j = 0; j < reSpell.length; j++) {
						var s0 = reSpell[j][0];
						var s1 = reSpell[j][1];
						s = s.replace(new RegExp('\\b' + s0 + '\\b', 'g'), s1)
						s = s.replace(new RegExp('\\b' + proper(s0) + '\\b', 'g'), proper(s1));
					}
					if (s != sStt) node.nodeValue = s; // only update if changed
				}
				break;
		}
	}
}

function doLocal() {
	decfmt();
	doSpell();
	getRelated();

	// top clickable link
	document.getElementById('header').addEventListener('click', function (e) {
		if (e.target.id == "header") {
			location.href = 'http://www.mathsisfun.com/index.htm';
		}
	}, false);


}

window.onload = doLocal;


function proper(s) {
	return s.charAt(0).toUpperCase() + s.substring(1, s.length).toLowerCase();
}
function tellAFriend() {
	var msg = "\nI found '" + document.title + "' here: " + location.href + "\n";
	window.location = "mailto:?subject=" + encodeURIComponent(document.title) + "&body=" + encodeURIComponent(msg);
}
function addFavorites() {
	if (window.sidebar) { // Mozilla Firefox Bookmark
		window.sidebar.addPanel(document.title, location.href, "");
	} else if (window.external) { // IE Favorite
		window.external.AddFavorite(location.href, document.title);
	}
}
function openEnglish() {
	if (typeof tranfrom == 'undefined') tranfrom = 'index.htm';
	var path = tranfrom;  // only relative path to avoid spoofing
	var url = "http://www.mathsisfun.com/" + path;
	window.location = url;
}
function linkToUs() {
	var path = location.pathname + location.search;  // only relative path to avoid spoofing
	var title = document.title;
	postWith("http://" + document.domain + "/link-to-us.php", {path: path, title: title});
}
function Citation() {
	var months = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
	var path = location.pathname + location.search;  // only relative path to avoid spoofing
	var atitle = document.title;
	var md = new Date(document.lastModified)
	mDate = md.getDate() + " " + months[md.getMonth()] + " " + md.getFullYear();
	if (typeof Author == 'undefined') Author = 'Pierce, Rod';
	//postWith("http://localhost:81/mathsisfun/citation.php",{path:path,title:atitle,moddate:mDate,author:Author});
	postWith("http://" + document.domain + "/citation.php", {
		path: path,
		title: atitle,
		moddate: mDate,
		author: Author
	});
}
function Contribute() {
	var path = location.pathname + location.search;  // only relative path to avoid spoofing
	var atitle = document.title;
	postWith("http://" + document.domain + "/contribute.php", {path: path, title: atitle});
}
function postWith(to, p) {
// from http://mentaljetsam.wordpress.com
	var myForm = document.createElement("form");
	myForm.method = "post";
	myForm.action = to;
	for (var k in p) {
		var myInput = document.createElement("input");
		myInput.setAttribute("name", k);
		myInput.setAttribute("value", p[k]);
		myForm.appendChild(myInput);
	}
	document.body.appendChild(myForm);
	myForm.submit();
	document.body.removeChild(myForm);
}

function URLEncode(text) {
	// The Javascript escape and unescape functions do not correspond with what browsers actually do...
	var SAFECHARS = "0123456789" + "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz" + "-_.!~*'()"; // numeric,alpha, and RFC2396 Mark characters
	var HEX = "0123456789ABCDEF";

	var s = "";
	for (var i = 0; i < text.length; i++) {
		var ch = text.charAt(i);
		if (ch == " ") {
			s += "+";	// x-www-urlencoded, rather than %20
		} else if (SAFECHARS.indexOf(ch) != -1) {
			s += ch;
		} else {
			var charCode = ch.charCodeAt(0);
			if (charCode > 255) {  // Unicode cannot be encoded using standard URL encoding
				s += "+";
			} else {
				s += "%";
				s += HEX.charAt((charCode >> 4) & 0xF);
				s += HEX.charAt(charCode & 0xF);
			}
		}
	}

	return s;
}

function CopyToClipboard(txtArea) {
	txtArea.focus();
	txtArea.select();
	CopiedTxt = document.selection.createRange();
	CopiedTxt.execCommand("Copy");
}

/* Flash */

function getFlash6HTML(w, h, fn, querystring, clr) {
	// w=width, h=height, fn=filename(minus '.swf'), querystring=..., clr=bg color
	if (!querystring) {
		querystring = "";
	} else {
		querystring = "?" + querystring;
	}

	fn = cdnPath(fn); // replace with cdn path (if valid)

	if (!clr) {
		clr = "#d6d9e6";
	}   // default background color

	if (fn.substring(fn.lastIndexOf('.swf')) != '.swf') fn = fn + '.swf';  // append .swf if absent

	var s = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http:\/\/download.macromedia.com\/pub\/shockwave\/cabs\/flash\/swflash.cab#version=6,0,79,0" width="' + w + '" height="' + h + '" id="' + fn + '">\n';
	s += '<param name="movie" value="' + fn + querystring + '"\/> ';
	s += '<param name="quality" value="high"\/> ';
	s += '<param name="bgcolor" value="' + clr + '"\/> ';
	s += '<param name="menu" value="false"\/> ';
	s += '<param name="allowScriptAccess" value="sameDomain"\/> ';    //        always
	s += '<param name="allowFullScreen" value="true"\/> ';
	s += '<embed src="' + fn + querystring + '" quality="high" bgcolor="' + clr + '" ';
	s += 'menu="false" width="' + w + '" height="' + h + '" type="application\/x-shockwave-flash" ';
	s += 'pluginspage="http:\/\/www.macromedia.com\/go\/getflashplayer" ';
	s += 'swLiveConnect="true" allowscriptaccess="sameDomain" allowFullScreen="true" id="' + fn + '" name="' + fn + '"><noembed><\/noembed><\/embed>\n';   //       always
	s += '</object>\n';

	//if (location.href.indexOf("localhost:81/mathsisfun") > 0) s += "<br>" + fn + "<br>";

	return (s);
}
function putFlash6(w, h, fn, querystring, clr, noflash) {
	if (hasFlash()) {
		document.write(getFlash6HTML(w, h, fn, querystring, clr));
	} else {
		if (noflash) {
			s = noflash;
		} else {
			s = '<a href="/flash-player.html"><img src="/images/style/no-flash.jpg" alt="Needs Flash Player"></a>';
		}
		document.write(s);

		if (Math.random() < 0.1) {
			// log that flash not available
			var path = location.pathname;
			var pg = path + ", " + fn;
	    var pgHex = '';
	    for (var i=0; i<pg.length; i++) {
	        pgHex += '' + pg.charCodeAt(i).toString(16);
	    }
			addView(pgHex, "View", window.location.hostname);
		}
	}
}
function hasFlash() {
	try {
		var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
		if (fo) return true;
	} catch (e) {
		if (navigator.mimeTypes &&
			navigator.mimeTypes["application/x-shockwave-flash"] &&
			navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin)    return true;
	}
	return false;
}
function FlashPHP(w, h, pathtoswf, clr) {
	var path = location.pathname;
	path = URLEncode(path.substring(0, path.lastIndexOf('/')));
	var atitle = URLEncode(document.title);
	var url = "http://" + document.domain + "/flash.php?path=" + path + "/" + pathtoswf + "&w=" + w + "&h=" + h + "&col=" + URLEncode(clr) + "&title=" + atitle;
	window.location = url;
}

/* ads */
var adIDs = Array(Array('topads', 1, 0), Array('adend', 1, 0), Array('hideads1', 1, 0), Array('showads1', 0, 1));
function sethideadscookie(val) {
	var date = new Date();
	if (val == 1)
		date.setTime(date.getTime() + (1 * 25 * 60 * 60 * 1000));  // 25 hrs
	else
		date.setTime(date.getTime() - (30 * 24 * 60 * 60 * 1000));
	document.cookie = "math_hideads=" + val.toString() + "; expires=" + date.toGMTString() + "; path=/";
}

function setAds(stateNo) {
	var styles = Array('none', 'inline');
	for (var i = 0; i < adIDs.length; i++) {
		var e = document.getElementById(adIDs[i][0]);
		if (e) {
			var styleNo = adIDs[i][stateNo];
			if (navigator.userAgent.indexOf('MSIE') > 0) {
				//e.style.setAttribute('csstext', style, 0);
				e.style.display = styles[styleNo];
			} else {
				var style = "display: " + styles[styleNo] + ";";
				e.setAttribute('style', style);
			}
		}
	}
}

function hideads() {
	sethideadscookie(1);
	setAds(2);
}

function showads() {
	sethideadscookie(0);
	setAds(1);
}

// do hide ads based on cookie
var ca = document.cookie.split(';');
for (var i = 0; i < ca.length; i++) {
	var c = ca[i];
	var pair = c.split('=');
	var key = pair[0];
	var value = pair[1];
	key = key.replace(/ /, '');
	if (key == 'math_hideads') {
		var styles = Array('none', 'inline');
		if (value == '1') {
			var s = '<style type="text/css" media="screen">';
			for (var j = 0; j < adIDs.length; j++) {
				var styleNo = adIDs[j][2];
				s += '#' + adIDs[j][0] + ' { display: ' + styles[styleNo] + '; }\n ';
				//example: s += '#hideads1 { display: none; }\n ';
			}
			s += '</style>';
			//alert(s);
			document.write(s);
		}
	}
}
function printImg(s) {
	pwin = window.open(s, "_blank");
	setTimeout("pwin.print()", 2000);
}

/* Question Database */
function doQ(id, qs) {
	var fromPath = location.pathname + location.search;  // only relative path to avoid spoofing
	var url = "http://www.mathopolis.com/questions/q.php?id=" + parseInt(id) + "&site=1" + "&ref=" + fromPath;
	if (typeof qs == 'undefined') {
		url += "&qs=0";
	} else {
		url += "&qs=" + qs;
	}
	window.open(url, "mathopolis");
}
function getQ() {
	var qs = "";
	for (var i = 0; i < arguments.length; i++) {
		if (i > 0) qs += "_";
		qs += arguments[i];
	}
	var s = "";
	for (i = 0; i < arguments.length; i++) {
		s += '<a href="javascript:doQ(' + arguments[i] + ",'" + qs + "'" + ')">Question&nbsp;' + (i + 1) + '</a> ';
	}
	document.write(s);
}


function getMenuTop() {
	// cope with urls at root or down one folder  NB: what about URLs down two folders?

	var stack = location.href.split("/");
	stack.pop(); // remove current file name (or empty string)
	var url = stack.join("/");   // remove filename

	var urlStt = "../";      // most urls are down one folder
	if (endsWith(url, "/mathsisfun")) urlStt = "";     // for urls at root
	if (endsWith(url, "mathsisfun.com")) urlStt = "";

	var links = [["index.htm", "Home", 0], ["algebra/index.html", "Algebra", 0], ["data/index.html", "Data", 0],
		["geometry/index.html", "Geometry", 0], ["measure/index.html", "Measure", 0], ["money/index.html", "Money", 1], ["numbers/index.html", "Numbers", 0],
		["activity/index.html", "Activities", 1], ["definitions/index.html", "Dictionary", 0], ["games/index.html", "Games", 0],
		["puzzles/index.html", "Puzzles", 0],
		["worksheets/index.php", "Worksheets", 0]];

	var s = "";
	s += '<ul>';

	var linkLen = links.length;
	if (window.innerWidth > 760) {
		for (var i = 0; i < linkLen; i++) {
			if (links[i][2] == 0)
				s += '<li><a href="' + urlStt + links[i][0] + '">' + links[i][1] + '</a></li>';
		}
	} else {

		s += '<li><a href="' + urlStt + links[0][0] + '">' + links[0][1] + '</a></li>';
		s += '<li><a href="#">Subjects &#x25BC;</a>';
		s += '<ul>';
		for (i = 1; i <= 6; i++) {
			s += '<li><a href="' + urlStt + links[i][0] + '">' + links[i][1] + '</a></li>';
		}
		s += '</ul>';
		s += '</li>';

		s += '<li><a href="#">More &#x25BC;</a>';
		s += '<ul>';
		for (i = 7; i < links.length; i++) {
			s += '<li><a href="' + urlStt + links[i][0] + '">' + links[i][1] + '</a></li>';
		}
		s += '</ul>';
		s += '</li>';
/* menu search
		s += ' &nbsp; ';
		s += '<div style="border: 2px solid black; width: 100%; display:inline; " role="search">';
		s += '<form action="../sphider/search.php" method="get" style="width: auto; display:inline; margin: 0 0 0 10px; padding:0;">';
		s += '<input type="text" name="query" value="" style="width: auto; display:inline-block; overflow: hidden; font-size: 18px; padding: 4px;  border-radius: 5px; " />';
		s += '<input type="submit" value="Search" name="submit" style="font-size: 18px; font-weight: bold; color: #ffffff; background-color: #8888ff; border: 1px solid #666600; cursor: pointer; padding: 4px 12px 4px 12px; border-radius: 5px;" />';
		s += '<input type="hidden" name="search" value="1" />';
		s += '</form>';
		s += '</div>';
*/
	}
	s += '</ul>';
	//alert(s);
	document.write(s);
}
function endsWith(str, suffix) {
	return str.indexOf(suffix, str.length - suffix.length) !== -1;
}
// function getAdRight() {
// 	var s = "";
// 	s += '<div style="margin-left: -425px; width:300px;">';
// 	s += getLinks(true);
// 	s += '</div>';
// 	document.write(s);
// }
// function getAdRight2() {
// 	var s = '';
// 	//s += '<div style="border: 4px solid green; width: 360px;"></div>';
// 	s += getLinks(false);
// 	if (true) {
// 		s += '<div id="google_translate_element" style="border: none; display:inline; float:left; "></div>';
// 		s += '<script type="text/javascript">';
// 		s += '	function googleTranslateElementInit() {';
// 		s += "new google.translate.TranslateElement({pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');";
// 		s += '	}</script>';
// 		s += '	<script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>';
// 	}
// 	if (true) {
// 	var url = location.href;   //  safe?
// 			s += '<div style="border: none; display:inline; margin: 0px; position:absolute; left:310px;">';
// 			s += '<span class="g-plusone" data-size="standard" data-href="' + url + '"></span>';
// 			s += '</div>';
// 	}
// 	//s += '</div>';
// 	document.write(s);
// }
// function getAdTop() {
// 	var s = "";
// 	s += '<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>';
// 	s += '<!-- MIFTop -->';
// 	s += '<ins class="adsbygoogle"';
// 	s += '     style="display:block;height:100px"';
// 	s += '     data-ad-client="ca-pub-1389989178296449"';
// 	s += '     data-ad-slot="6226552230"';
// 	s += '     data-ad-format="auto"></ins>';
// 	s += '<script>';
// 	s += '(adsbygoogle = window.adsbygoogle || []).push({});';
// 	s += '</script>';
// 	document.write(s);
// }
// function getAdEnd() {
// 	var url = location.href;
// 	if (url.indexOf("definitions") > 0) return;
// 	var s = "";
// 	s += '<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>';
// 	s += '<!-- MathsIsFunResp -->';
// 	s += '<ins class="adsbygoogle mathsisfunresp"';
// 	s += '     style="display:inline-block"';
// 	s += '     data-ad-client="ca-pub-1389989178296449"';
// 	s += '     data-ad-slot="8658120633"></ins>';
// 	s += '<script>';
// 	s += '(adsbygoogle = window.adsbygoogle || []).push({});';
// 	s += '</script>';
// 	document.write(s);
// }
// function getLinks(oldQ) {
// 	//var ffq = false;
// 	//if (navigator.userAgent.indexOf("Firefox")!=-1) ffq = true;
// 	//var url    = encodeURIComponent(location.href);
// 	var url = location.href;   //  safe?
// 	var title = encodeURIComponent(document.title);
// 	var linkstt = '<a target="_blank" href="';
//
// 	var s = "";
// 	s += linkstt + 'http://twitter.com/home?status=' + title + ': ' + url + '" id="linktw">Twitter</a> ';
// 	s += linkstt + "http://www.stumbleupon.com/submit?url=" + url + "&title=" + title.replace(/%20/g, '+') + '" id="linksu">StumbleUpon</a> ';
// 	s += linkstt + "http://www.facebook.com/sharer.php?u=" + url + "&t=" + title + '" id="linkfb">Facebook</a> ';
// 	s += '<a href="javascript:linkToUs()" id="linkus">Link To Us</a>';
// 	return s;
// }
// function getBodyEnd() {
// 	doPic();
// // delay scripts till end to speed page load (only on templates post June 2011)
// 	var ffq = false;
// 	if (navigator.userAgent.indexOf("Firefox") != -1) ffq = true;
//
// 	var s = "";
// 	//s += '<script type="text/javascript" src="http://apis.google.com/js/plusone.js"></script>';
// 	s += gPlusOneCall();
// 	s += gAnalyticsCall();
// 	if (ffq) {
// 	} else {
// 		//s += '<script src="http://connect.facebook.net/en_US/all.js#xfbml=1"></script>';
// 	}
//
// 	document.write(s);
// }
// function gPlusOneCall() {
// // http://www.google.com/webmasters/+1/button/#utm_source=wm&utm_medium=blog&utm_campaign=schema
// 	var s = "";
// 	s += '<script type="text/javascript">';
// 	s += '(function() {';
// 	s += "var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;";
// 	s += "po.src = 'https://apis.google.com/js/plusone.js';";
// 	s += "var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);";
// 	s += '})();';
// 	s += '</script>';
// 	return s;
// }
// function gAnalyticsCall() {
// 	var s = "";
// 	s += '<script type="text/javascript">';
// 	s += 'var _gaq = _gaq || [];';
// 	s += "_gaq.push(['_setAccount', 'UA-29771508-1']);";
// 	s += "_gaq.push(['_trackPageview']);";
// 	s += '(function() {';
// 	s += "var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;";
// 	s += "ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';";
// 	s += "var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);";
// 	s += '})();';
// 	s += '</script>';
// 	return s;
// }
//
// function logVisit() {
// 	var pg = location.pathname;
// 	var pgHex = '';
// 	for (var i = 0; i < pg.length; i++) {
// 		pgHex += '' + pg.charCodeAt(i).toString(16);
// 	}
// 	addView(pgHex, "Visit", window.location.hostname);
// }
// if (Math.random() < 0.1) logVisit();
//
// function addView(pg, viewtype, hostname) {
// 	var req;
// 	req = new XMLHttpRequest();
//
// 	params = "type=" + viewtype;
// 	params += "&pg=" + encodeURIComponent(pg);
//
// 	if (hostname == "localhost") {   // hostname so we can know if develop or production
// 		req.open("POST", "http://localhost:81/mathopolis/links/update.php", true);    // NB: false=synchronous
// 	} else {
// 		req.open("POST", "http://www.mathopolis.com/links/update.php", true);     // NB: false=synchronous
// 	}
// 	req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
// 	req.setRequestHeader("Content-length", params.length);
// 	req.setRequestHeader("Connection", "close");
// 	req.send(params);
// }


//window.addEventListener("scroll", onScroll);
function onScroll() {
	var scrollTop = document.documentElement ? document.documentElement.scrollTop : document.body.scrollTop;
	var menu = document.getElementById("menu");
	//alert(scrollTop);
	if (scrollTop > 100) {
		menu.style.top = "0px";
		menu.style.width = "1000px";
		//menu.style.margin = "0 auto 0 auto";
		//menu.style.borderBottom = "2px solid #ffffff";
		menu.style.border = "1px solid #ffffff";
		menu.style.boxShadow = "0px 12px 12px -12px #77cc77";
		menu.style.backgroundColor = "white";
		//menu.style.right = "0";
		//menu.style.left = "0";
		menu.style.textAlign = "center";
		menu.style.position = "fixed";
		menu.style.zIndex = "5000";
	} else {
		//menu.style.backgroundColor = "transparent";
		menu.style.boxShadow = "none";
		menu.style.position = "static";
	}
}


function getRelated() {

	if (window.innerWidth < 1050) {
		return;  // don't bother if screen not wide enough
	}
	var rels = document.getElementsByClassName('related');
	if (rels.length == 0) {
		return;
	}
	var rel = rels[0];

	//var array = [];
	var links = rel.getElementsByTagName("a");
	var count = links.length;
	//for (var i = 0; i < count; i++) {
	//	array.push([links[i].href, links[i].text]);
	//}

	right = null;
	left = null;
	if (count > 0) {
		right = links[0];
		if (count > 1) {
			left = links[count - 1];
		}
	}

	s = '';

	if (left != null) {
		s += '<div style="position: fixed; top: 0px; right: 50%; margin: 10px 460px 10px 0; text-align: left; ">';
		s += fmtMenuBox(left.href, left.text, 0);
		s += '</div>';
	}
	if (right != null) {
		s += '<div style="position: fixed; top: 0px; left: 50%; margin: 10px 0 10px 460px; text-align: right; ">';
		s += fmtMenuBox(right.href, right.text, 1);
		s += '</div>';
	}
	//console.log("getRelated",s);

	document.getElementById("searchBox").innerHTML += s;
	//document.getElementById("header").innerHTML += s;   // NB stops google translate from working
	//document.body.innerHTML = s + document.body.innerHTML;
	//document.getElementById("midfull").innerHTML += s;


}

function fmtMenuBox(url, txt, dirn) {
	var s = "";
	var boxClass = "menuLt";
	if (dirn == 1) {
		boxClass = "menuRt";
	}
	s += '<a href="' + url + '"  style="text-decoration: none; color: #888888; vertical-align: middle; display: table;">';
	s += '<div class="' + boxClass + '" >';
	s += txt;
	s += '</div>';
	s += '</a>';
	return s;
}


function initVideo(id, titleid, spanid, style) {
	// defaults
	titleid = typeof titleid !== 'undefined' ? titleid : 'title';
	spanid = typeof spanid !== 'undefined' ? spanid : 'video';
	style = typeof style !== 'undefined' ? style : 'h1';

	// in FF, setting width AGAIN causes window to reset size
	if (navigator.appName=="Microsoft Internet Explorer") window.onresize = resizeVideo;

	title = document.getElementById(titleid).innerHTML;

	s = '';
	switch (style) {
		case "h1":
	s += '<div class="centerfull" style="clear:both; font-weight:400; padding: 3px 0 5px 0;">';
	s += '<div style="float:left; width:60px; text-align:left;">';
	s += '  <a href="javascript:doVideo(\'' + id + '\',\'' + spanid + '\')">';
	s += '    <img src="/images/style/video2.gif" alt="Video" width="75" height="33" style="vertical-align:middle; border:none;" />';
	s += ' </a>';
	s += '</div>';
	s += '<div style="float:right; width:60px; text-align:right;">&nbsp;</div>';
	s += '  <div style="margin:0 auto;">';
	s += '    <h1 align="center">' + title + '</h1>';
	s += '  </div>';
	s += '</div>';
			break;

		case "h2":
	s += '<div style="float:right; width:100px; margin: -10px 0 5px 0;">';
	s += '  <a href="javascript:doVideo(\'' + id + '\',\'' + spanid + '\')">';
	s += '    <img src="/images/style/video2.gif" alt="Video" width="75" height="33" style="vertical-align:middle; border:none;" />';
	s += ' </a>';
	s += '</div>';
	s += '    <h2>' + title + '</h2>';
			break;
	}

	document.getElementById(titleid).innerHTML = s;	    // outerHTML ?

}

function doVideo(id,spanid) {
	var s="";

	var visIndex = videoVis.indexOf(spanid);
	var visQ = visIndex > -1 ? true : false;  // is it currently visible?

	if (visQ) {       // turn off
 		var frame = document.getElementById(spanid + "v1");
 		frame.parentNode.removeChild(frame);
		videoVis.splice(visIndex, 1);
		visQ = false;
	} else {           // turn on
		s += '<div class="center">';
		s += '<iframe id="' + spanid + 'v1" src="https://www.youtube.com/embed/'+id+'?rel=0&autoplay=1" frameborder="0" allowfullscreen></iframe>';
		s += '</div>';
 		videoVis.push(spanid);
		visQ = true;
	}

	var vid = document.getElementById(spanid);
	vid.innerHTML = s;
	if (visQ) resizeVideo(spanid);
	/*
	if (visQ) {
		var pg = id;
    var pgHex = '';
    for (var i=0; i<pg.length; i++) {
        pgHex += '' + pg.charCodeAt(i).toString(16);
    }
		addView(pgHex, "View", window.location.hostname); // hostname so we can know if develop or production
	}   */
}
function resizeVideo(spanid) {
	var v1 = document.getElementById(spanid + "v1");
	var wd = window.innerWidth-40;
	if (wd>640) wd = 640;
  v1.style.width = wd + "px";
  v1.style.height = (wd*(340/640)+80) + "px";
}

videoVis = Array();
