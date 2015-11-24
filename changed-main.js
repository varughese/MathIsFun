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
