chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender);
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.askFor == "body")
			parseBody(document.body, sendResponse);
});

function parseBody(bodyText, callback)  {
	var sumHtml = "";
	var pTags = bodyText.getElementsByTagName('p');
	for (var i = 0, length = pTags.length-1; i < length; i++) {
		p = pTags[i];
		if (p.innerText && p.innerText.indexOf('. ') && p.innerText.length > 15 ) {
			// GET THE FIRST SENTENCE OF A PARAGRAPH
			str = p.innerText.split(". ")[0]
			// SHORTEN IF NECESSARY
			if (str.length > 70) str = str.substring(0,70) + " ...";
			sumHtml += "<li class='summarized'>" + str + ". </li>";
		}
	}
	return callback({docBody: sumHtml});
}
