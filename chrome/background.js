chrome.browserAction.onClicked.addListener(function(tab) {
	var currURL = tab.url;
	if(!currURL) {// no url on the page
		return;
	}
	
	if(-1 != currURL.indexOf("?")) {
		currURL = currURL.substring(0, currURL.indexOf("?"));
	}
	
	chrome.tabs.update(tab.id, {"url": currURL});
});