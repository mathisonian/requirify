

var activeTabs = [];


chrome.browserAction.onClicked.addListener(function callback() {

    chrome.tabs.query({active: true, currentWindow: true}, function(arrayOfTabs) {

         // since only one tab should be active and in the current window at once
         // the return variable should only have one entry
         var activeTab = arrayOfTabs[0];
         var activeTabId = arrayOfTabs[0].id; // or do whatever you need

         var code = '';

         if(activeTabs.indexOf(activeTabId) === -1) {
            // it doesnt already exists on this tab...
            chrome.browserAction.setBadgeText({
                text: 'On',
                tabId: activeTabId
            });

            code = 'var elt = document.createElement("script");';
            code += 'elt.type="text/javascript";';
            code += 'elt.src = "https://s3.amazonaws.com/s3.mathisonian.com/javascripts/requirify-browser.js";';
            code += 'document.getElementsByTagName("body")[0].appendChild(elt)';
            chrome.tabs.executeScript(activeTabId, { code: code });
            activeTabs.push(activeTabId);
         }
  });

});


chrome.tabs.onUpdated.addListener(function(tabId) {

    var index = activeTabs.indexOf(tabId);
    if (index > -1) {
        activeTabs.splice(index, 1);
    }
})