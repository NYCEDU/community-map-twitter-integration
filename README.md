[The Community Map spreadsheet](https://drive.google.com/open?id=17nmBELMdwT1ScV3j5Vt66wIzSphQhnhhQLdBJdP4oN8) is a project by [#NYCEDU](http://nycedu.us/) that lists all of the EdTech companies in NYC and provides key information about each company. The purpose of the spreadsheet and #NYCEDU in general is to rally and strengthen the local EdTech community. The purpose of this code is to use Twitter's API to dynamically insert company information into the spreadsheet to make it more maintainable and up-to-date. If you would like to contribute to the code, I believe the first thing you will have to do is request WRITE priveledges to the spreadsheet. This code will not work independently of the spreadsheet. Please contact [me, for now](mailto:joeyazoulai@fastmail.fm) and I will try to facilitate, or, if you know Deborah or Fu, they would be the approriate people to contact.

### Note To The Reader

The intention of this README is to provide a very detailed explantion of this Google script. The reason for this over-explanation is (1) I would like it to be understood by people of varying technical experience, and (2) because my own technical experience is limited, and this is my way of making sure I understand what I'm presenting here. Likewise, the code is full of comments for the same reason.

### What Does This Custom Function Do?

This Google script creates a custom function for the Google spreadsheet [#NYCEDU Community Map](https://drive.google.com/open?id=17nmBELMdwT1ScV3j5Vt66wIzSphQhnhhQLdBJdP4oN8). The purpose of this custom function, called getTwitterDescription(), is to retrieve the descriptions from the Twitter profiles of each of the companies listed in the spreadsheet. We do this, so that we don't have to manually cut-and-paste the descriptions, and so that the descriptions stay up-to-date.

### How Is This Custom Function Used?

The code for this custom function lives in the actual spreadsheet file. With the spreadsheet open, navigate to the Google sheets menu and choose Tools/Script Editor.../get_twitter_description.

The function itself is used within the spreadsheet. Using this custom function within the spreadsheet involves entering =getTwitterDescription() into column B of the spreadsheet, which is called "Brief Description (via Twitter)," and passing the Twitter usernames, which are stored in column D, like so: =getTwitterDescription(D1). However, rather than entering the custom function into each row within column B, we enter the function once, and pass all of the Twitter usernames into the the function as an array, i.e. =getTwitterDescription(D:D). This is a suggestion made by Google [here](https://developers.google.com/apps-script/guides/sheets/functions#optimization), in order to avoid calling the custom function hundreds of times and overloading their script service which stores the custom function. However, despite following this advice, if I pass all 100+ usernames as an argument, I get an error that the "Argument Is Too Large." My solution was to enter =getTwitterDescription several times in order to call the username arrays in batches, i.e. =getTwitterDescription(D1:D20), =getTwitterDescription(D21:D40), etc.

### What issues can you help with? (issue tracker to come)

So what's the problem, then? Well, the problem right now (I believe) is that because there are 6 different simultaneous calls to the custom function (because of the solution I just mention above), there are times when I get an error that the "service was invoked too many times in too short of a time." This is surprising because invoking the custom function 6 times hardly seems like an abuse of the system.

Other times, the Twitter API returns an error that I've made, "Too many request..." and I'll have to wait a period of time before I can make any more requests. This doesn't happen as often, now that the custom function takes advantage of Google's cache service, but it's still surprising when it does happen since I believe the application is entitled to 180 requests every 15 minutes, and there are currently only 114 companies listed.

### Is All Of This Effort Worth It?

That is a fair question to ask. Can't we just cut-and-paste some descriptions and call it a day? Sure! But I think it is worth figuring this API stuff out, not just for the up-to-date descriptions, but also because once we get a handle on how to integrate APIs into Google Sheets we can use this ability to do so many other interesting things.

### What Is The Future Of This Spreadsheet?

That's up to you! I certainly don't claim any ownership over this spreadsheet, and am only attempting to contribute improvements. My personal plan is to feed this spreadsheet into an interactive map using [cartoDB](https://cartodb.com/), in order to visualize all of this information in a digestible way, and then provide the resulting map to the community. My hope is that doing so will invite people in the EdTech Community to look around the map and say, "I didn't know [THIS COOL COMPANY] is down the street!" Or, "Man, this [PARTICULAR NEIGHBORHOOD] is really becoming a hotspot for new EdTech Companies." But, basically, a cool interactive map is usually more inviting than a spreadsheet.

### Resources For People Contributing To This Code

Below are some resources I've used to get this far:
- [Custom Functions in Google Sheets](https://developers.google.com/apps-script/guides/sheets/functions)
- [How to add Twitter follower counts to a Google Spreadsheet by Sara Marshall](http://sarahmarshall.io/post/70812214349/how-to-add-twitter-follower-counts-to-a-google)
- [Twitter developer docs for REST APIs](https://dev.twitter.com/rest/public)

(this README is a work in progress...)
