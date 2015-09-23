//v1.0 (please update this version number anytime the code below is deployed, i.e. cut and pasted from GitHub into this spreadsheet's Google script).

var CONSUMER_KEY = 'XpARgJqqq6KcVDx1b3hpbmeWk';
var CONSUMER_SECRET = '4CobTfxkgGsk6qiC4J1fDHvdxTsDJ3obwIPX8rcQpkRb7SsHbD'; //unsure how to keep this credential secret since this app is public. 
var PROJECT_KEY = 'M2sFbCVUA6zeWCc_aFjLyv4GXkj8jwwlY';


function getTwitterDescription(username) { //argument 'username' is an array of Twitter usernames supplied by column D of the spreadsheet
    Utilities.sleep(1000); //suggested by Google to slow down the calls to the Google Scripts service. Too many calls too quickly will result in an error.
    var cache = CacheService.getPublicCache();
    var cached = cache.get(username);
    var service = getTwitterService(); 
    
    if (username.map) { //test whether variable 'username' is an array, because map is only a property found on an array.
      return username.map(getTwitterDescription); // if variable username is an array, apply getTwitterDescription() on each individual username in the array. At this point, each 'username' will no longer be an array and we can move to the next conditional test.
    } else {
    if (cached != null) {
      return cached+' (via cache)'; //if the cache isn't empty, return Twitter descriptions from cache to the corresponding cell in the spreadsheet.  
    }
    if (service.hasAccess()) { //if we're here, that means there was nothing in the cache, and we should retrieve the information from the Twitter API
      var requestUrl = 'https://api.twitter.com/1.1/users/show.json?screen_name='+username;
      var requestResponse = service.fetch(requestUrl); //log into Twitter API and send the request url.
      var userDescription = JSON.parse(requestResponse.getContentText()).description; //parse the user description that was returned from the API into a string
      var cacheTimeLimit = Math.floor((Math.random() * 21600) + 7200);
      cache.put(username, userDescription, cacheTimeLimit); //store the user description string in the cache, using it's unique username as they key, for the maximum allowed 6 hours
      return userDescription+' (via API)' //return the user description from the API to the corresponding cell in the spreadsheet 
    }
  }
}

function getTwitterService() {
  var service = OAuth1.createService('twitter');
  service.setAccessTokenUrl('https://api.twitter.com/oauth/access_token')
  service.setRequestTokenUrl('https://api.twitter.com/oauth/request_token')
  service.setAuthorizationUrl('https://api.twitter.com/oauth/authorize')
  service.setConsumerKey(CONSUMER_KEY);
  service.setConsumerSecret(CONSUMER_SECRET);
  service.setProjectKey(PROJECT_KEY);
  service.setCallbackFunction('authCallback');
  service.setPropertyStore(PropertiesService.getScriptProperties());
  return service;
}

function authCallback(request) {
  var service = getTwitterService();
  var isAuthorized = service.handleCallback(request);
  if (isAuthorized) {
    return HtmlService.createHtmlOutput('Success! You can close this page.');
  } else {
    return HtmlService.createHtmlOutput('Denied. You can close this page');
  }
}
