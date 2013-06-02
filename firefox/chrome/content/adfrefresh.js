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
	},
	
	/**
		* Installs the toolbar button with the given ID into the given
		* toolbar, if it is not already present in the document.
		*
		* @param {string} toolbarId The ID of the toolbar to install to.
		* @param {string} id The ID of the button to install.
		* @param {string} afterId The ID of the element to insert after. @optional
	*/
	installButton: function(toolbarId, id, afterId) {
		if (!document.getElementById(id)) {
			var toolbar = document.getElementById(toolbarId);
			
			// If no afterId is given, then append the item to the toolbar
			var before = null;
			if (afterId) {
				let elem = document.getElementById(afterId);
				if (elem && elem.parentNode == toolbar)
					before = elem.nextElementSibling;
			}
			
			toolbar.insertItem(id, before);
			toolbar.setAttribute("currentset", toolbar.currentSet);
			document.persist(toolbar.id, "currentset");
			
			if (toolbarId == "addon-bar")
			toolbar.collapsed = false;
		}
	},

	initButton: function() {
		var firstRunPref = "extensions.paadfrefresh.updateTracker";
		var updatePref = this.prefManager.getIntPref(firstRunPref);
		if (!updatePref || 1 > updatePref) {
			this.prefManager.setIntPref(firstRunPref, 1);
			this.installButton("nav-bar", "adfrefresh-button");
		}
	},
	
	prefManager: Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch)
}

window.addEventListener("load", function () { adfrefreshjs.initButton(); }, false);