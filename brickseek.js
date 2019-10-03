// ==UserScript==
// @name         Brickseek auto-redirect - Walmart
// @namespace    http://brickseek.com
// @version      0.1
// @description  Auto redirect links
// @author       Scott Goering
// @match        https://brickseek.com/*inventory-checker*
// @grant        none
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// @run-at       document-idle
// ==/UserScript==
// debugger;
function getElementByXpath(path) {
      return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function clickSubmitBtn (jNode) {
    var zip = document.getElementById("inventory-checker-form-zip")
     if(zip.value != "66018") {
        zip.value = "66018"
    }
    var step_icon = getElementByXpath('//*[@id="main"]/div/div[2]/div/div[3]/div[1]');

    // Only click the button once.  We determine that by looking for the "step icon"
    if(step_icon !== null){
        if(step_icon.attributes[0].value == "guide__step-icon"){
            var clickEvent = document.createEvent('MouseEvents');
            clickEvent.initEvent ('click', true, true);
            jNode[0].dispatchEvent (clickEvent);
        }
    }
}

var jTableToSort = document.getElementsByClassName("table inventory-checker-table inventory-checker-table--store-availability-price-pickup inventory-checker-table--columns-4");
var jTableToSort2 = document.getElementsByClassName("table inventory-checker-table inventory-checker-table--store-availability-price inventory-checker-table--columns-3");

if(jTableToSort.length == 0 && jTableToSort2.length == 0)
{
    //This is the selector for the submit button.
 waitForKeyElements ("#main > div > form > div > div.grid__item.inventory-checker-form__submit.grid__item--align-content-end > div > button > span", clickSubmitBtn);
}
else
{
    // Hide the local results disclaimer that takes up screen space
    var localResults = document.getElementsByClassName("local-inventory-disclaimer")
    if(localResults.length > 0) {
        localResults[0].hidden = true
    }

    //Get the results rows and process them.  Anything that is out of stock will be hidden
    if(jTableToSort.length > 0 ){
        var jRowsToSort = jTableToSort[0].getElementsByClassName("table__row")
        for(var i = 0; i < jRowsToSort.length; i++){
            $(jRowsToSort[i]).hide();
            //if(((jRowsToSort[i].getElementsByClassName("availability-status-indicator availability-status-indicator--stock-2 availability-status-indicator--style-label")).length > 0) || ((jRowsToSort[i].getElementsByClassName("availability-status-indicator availability-status-indicator--stock-1 availability-status-indicator--style-label")).length > 0)) {
            //    $(jRowsToSort[i]).show();
            //}
            if(jRowsToSort[i].getElementsByClassName("availability-status-indicator__text").length > 0 ){
                if((jRowsToSort[i].getElementsByClassName("availability-status-indicator__text")[0].textContent == 'In Stock')) {
                    $(jRowsToSort[i]).show();
                }
            }
        }
    }
    if(jTableToSort2.length > 0 ){
        //Get the results rows and process them.  Anything that is out of stock will be hidden
        var jRowsToSort2 = jTableToSort2[0].getElementsByClassName("table__row")
        for(var j = 0; j < jRowsToSort2.length; j++){
            $(jRowsToSort2[j]).hide();
            //if(((jRowsToSort[i].getElementsByClassName("availability-status-indicator availability-status-indicator--stock-2 availability-status-indicator--style-label")).length > 0) || ((jRowsToSort[i].getElementsByClassName("availability-status-indicator availability-status-indicator--stock-1 availability-status-indicator--style-label")).length > 0)) {
            //    $(jRowsToSort[i]).show();
            //}
            if(jRowsToSort2[j].getElementsByClassName("availability-status-indicator__text").length > 0 ){
                if((jRowsToSort2[j].getElementsByClassName("availability-status-indicator__text")[0].textContent == 'In Stock')) {
                    $(jRowsToSort2[j]).show();
                }
            }
        }
    }
}
