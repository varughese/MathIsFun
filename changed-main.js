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

function getQ() {
	var qs = "";
	for (var i = 0; i < arguments.length; i++) {
		if (i > 0) qs += "_";
		qs += arguments[i];
	}
	var s = "";
	for (i = 0; i < arguments.length; i++) {
		s += '<a href="javascript:doQ(' + arguments[i] + ",'" + qs + "'" + ')">' + (i + 1) + '</a> ';
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
		["activity/index.html", "Activities", 1], ["definitions/index.html", "Dictionary", 0], ["games/index.html", "Games", 0]]//,
		// ["puzzles/index.html", "Puzzles", 0],
		// ["worksheets/index.php", "Worksheets", 0]]; //replace with "extras"

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
