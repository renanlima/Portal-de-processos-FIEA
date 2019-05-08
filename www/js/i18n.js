var i18n = {

	initialize: function() {
		// http://www.oodlestechnologies.com/blogs/Implementing-i18n-(internationalization)-in-PhoneGap-or-Cordova-Application
		var cLANGUAGE = null;
		navigator.globalization.getPreferredLanguage(
		    //Get Language from Settings
		    function (locale) {
		        cLANGUAGE = locale.value;
		        languageControls(cLANGUAGE);
		    },
		    //On Failure set language to english
		    function () {cLANGUAGE = "en";}
		);

		var languageSpecificObject = null;
		var languageSpecificURL = "";
		var portugueseLanguageSpecificURL = "i18n/pt/strings.json";
		// var spanishLanguageSpecificURL = "i18n/es/strings.json";
		var englishLanguageSpecificURL = "i18n/en/strings.json";
		 
		//Function to make network call according to language on load
		var languageControls = function(language){
		    if ((language.toString() == "en") || (language.toString() == "english") || (language.toString().indexOf("en") != -1)) {
		        languageSpecificURL = englishLanguageSpecificURL;
		    } else {
		        //Default English
		        languageSpecificURL = portugueseLanguageSpecificURL;
		    }
		        //Make an ajax call to strings.json files
		    onNetworkCall(languageSpecificURL,function(msg){
		        languageSpecificObject = JSON.parse(msg);
		        $(".languagespecificHTML").each(function(){
		            $(this).html(languageSpecificObject.languageSpecifications[0][$(this).data("text")]);
		        });
		        $(".languageSpecificPlaceholder").each(function(){
		            $(this).attr("placeholder",languageSpecificObject.languageSpecifications[0][$(this).data("text")]);
		        });
		                $(".languageSpecificValue").each(function(){
		            $(this).attr("value",languageSpecificObject.languageSpecifications[0][$(this).data("text")]);
		        });
		    });
		};
		 
		//Function to get specific value with unique key
		var getLanguageValue = function(key){
		    value = languageSpecificObject.languageSpecifications[0][key];
		    return value;
		};
		 
		//Network Call
		var onNetworkCall = function(urlToHit,successCallback){
		    $.ajax({
		        type: "POST",
		        url: urlToHit,
		        timeout: 30000 ,
		    }).done(function( msg ) {
		        successCallback(msg);
		    }).fail(function(jqXHR, textStatus, errorThrown){
		        alert("Internal Server Error");
		    });
		}

	} // initialize

};