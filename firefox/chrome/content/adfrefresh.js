var adfrefreshjs = {
	refresh: function(aEvent) {
		var currURL = gBrowser.currentURI.spec;
		if(!currURL) {// no url on the page
			return;
		}
		
		if(-1 != currURL.indexOf("?")) {
			currURL = currURL.substring(0, currURL.indexOf("?"));
		}
		gBrowser.loadURI(currURL);
	}
}