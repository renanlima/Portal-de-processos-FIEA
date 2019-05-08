

var IS_MOBILE = (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4)))


window.onerror = function (message, file, line) {
    document.getElementById("app-error").style.display = "block";
    document.getElementById("app-error").innerText = message + ", " + file + ", " + line;
    return false;
};


/*****************************************************************************/
var app = {

    // Application Constructor
    init: function() {

        app.debug.write("ACTUAL_URL", location.href);
        app.debug.write("IS_DEBUG", IS_DEBUG);
        app.debug.write("IS_MOBILE", IS_MOBILE);
        app.debug.write("IS_RIPPLE", IS_RIPPLE);
        app.debug.write("IS_PHONEGAP", IS_PHONEGAP);

        this.UI.init();
        this.events.bind();
    },


    debug : {


        write: function(key, val) {
            if (IS_DEBUG) {
                $(".app-debug").show().html(key + ":" + val + ", <br>" + $(".app-debug").html());
                console.log('KEY: ' + key + ': ' + val + ';');
            }
        }

    },


    events : {

        isDeviceReady : false,

        // Bind Event Listeners
        // Bind any events that are required on startup. Common events are:
        // 'load', 'deviceready', 'offline', and 'online'.
        bind: function() {

            if(IS_PHONEGAP || IS_RIPPLE) {
                document.addEventListener('deviceready', app.events.onDeviceReady, true);
                window.addEventListener("online", app.UI.connection.online, false);
                window.addEventListener("offline", app.UI.connection.offline, false);

            }else {

                app.events.onDeviceReady();
            }
            window.addEventListener("message", app.events.onReceiveMessage, false);
            document.addEventListener('touchmove', function(e){ e.preventDefault(); }, false);
            /*
            setTimeout(function() {
                    if(!app.events.isDeviceReady) {
                        alert("DeviceReady problem");
                    }
                },4000);*/

        },




         onReceiveMessage: function(e) {

                app.debug.write('receiveMessage event', e.data);

                if (e.data == "close") {

                    app.orquestra.close();

                }

            },


        // deviceready Event Handler
        // The scope of 'this' is the event. In order to call the 'receivedEvent'
        // function, we must explicitly call 'app.receivedEvent(...);'
        onDeviceReady: function() {

            app.events.isDeviceReady = true;

            if(IS_PHONEGAP) {

                //multilingual
                i18n.initialize();

                //StatusBar.hide();
                //http://www.telerik.com/blogs/everything-hybrid-web-apps-need-to-know-about-the-status-bar-in-ios7
                StatusBar.overlaysWebView( false );
                StatusBar.styleDefault();


                if (cordova.platformId == 'android') {
                    StatusBar.backgroundColorByHexString("#333");
                } else {
                    // iOS
                    StatusBar.backgroundColorByHexString('#FFFFFF');
                }
            }

            app.orquestra.init();

        }

    },


    orquestra : {

        init: function() {

            if (DEFAULT_URL !== '' && DEFAULT_URL !== 'SYSTEM_DOMAIN') {

                app.UI.form.url.set(DEFAULT_URL);

            }

            if(app.UI.form.url.get()!="") {

               app.debug.write("localStorageUrl Found", app.UI.form.url.get());

               app.orquestra.try(app.UI.form.url.get());
               //app.UI.form.show();

            }else {

                app.UI.form.show();

            }

        },


        close: function() {


            var navtype = app.phonegap.navmode.get();
            app.debug.write("navtype is", navtype);
            if (navtype == app.phonegap.navmode.types.iframe) {

                app.debug.write("closing iframe", "");
                app.UI.iframe.hide();

            } else {

                app.phonegap.browser.close();

            }

            app.UI.form.url.set("");


        },

        istryingtoconnect : false,


        try: function(url) {

            var checkUrl = url;

            app.debug.write('base url to connect to ', checkUrl);

            if (checkUrl.lastIndexOf('?c=') > -1) {
                // obter apenas endereco base, sem query string
                checkUrl = checkUrl.substring(0, checkUrl.lastIndexOf('?c='));
            }
            // 06/04/2016 - Leonardo Luzzatto - Verificacao do codigo do app com URL no novo formato
            if (checkUrl.lastIndexOf('/mobile-') > -1) {
                // obter apenas endereco base, sem query string
                checkUrl = checkUrl.substring(0, checkUrl.lastIndexOf('/mobile-'));
            }

            app.debug.write('prepare url 1 ', checkUrl);

            if (checkUrl.lastIndexOf('/') == (checkUrl.length-1) == false) {
                // NÃO possui barra no final
                // deve adicionar
                checkUrl += '/';
            }

            app.debug.write('prepare url 2', checkUrl);

            checkUrl = checkUrl + 'common/images/v3/favicon.ico';

            app.debug.write('final url to test', checkUrl);

            istryingtoconnect = true;

            $.ajax({
                type: 'HEAD',
                url: checkUrl,
                success: function (data, textStatus, jqXHR ) {
                  app.debug.write('success', data);
                  app.debug.write('success textStatus', textStatus);
                  app.debug.write('success jqXHR', JSON.stringify(jqXHR));
                  app.orquestra.connect(url);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                  app.debug.write('error jqXHR', JSON.stringify(jqXHR));
                  app.debug.write('error status', textStatus);
                  app.debug.write('error thrown', errorThrown);
                  app.orquestra.notfound();
                }
            });


        },

        connect : function(currentUrl) {

            app.debug.write('url found', currentUrl);

            istryingtoconnect = false;

            $('.not-found').hide();

            app.UI.loading.hide();

            app.phonegap.navigateTo(currentUrl);

        },

        notfound: function() {

            app.debug.write("orquestra not found", "ok");

            istryingtoconnect = false;

            app.UI.loading.hide();

            app.UI.form.show();

            app.UI.form.notfound();

        }


    },

    phonegap:  {

        browser : null,

        navmode : {

            _type : "",

            types : {

                iframe : "iframe",
                cordova: "cordova",
                inapp: "inapp"
            },

            get : function() {

                if(IS_PREVIEW || (!IS_PHONEGAP && !IS_RIPPLE)) {

                    app.phonegap.navmode._type  = app.phonegap.navmode.types.iframe;

                }
                else if(app.phonegap.navmode._type=="") {

                    app.phonegap.navmode._type = $("#nav-type").val();
                }
                return app.phonegap.navmode._type;

            },

            set : function(t) {

                app.phonegap.navmode._type = t;

            }

        },

        navigateTo: function(url) {

            app.debug.write("start navigation", url);


            app.UI.form.url.set(url);

            if (url.indexOf('?') > -1) {
                url = url + '&ref=mobileApp';
            } else {
                url = url + '?ref=mobileApp';
            }

            url = url + '&t=' + app.phonegap.navmode.get();


            app.debug.write("final url navigation", url);

            app.debug.write("navigation mode wiil be", app.phonegap.navmode.get());


            if(app.phonegap.navmode.get() == app.phonegap.navmode.types.iframe) {

                app.UI.iframe.show(url);

            } else {

                var target = (app.phonegap.navmode.get() == app.phonegap.navmode.types.cordova ? "_self" : "_blank");

                var options = (IS_DEBUG ? "" : "location=no,status=no,titlebar=no,toolbar=no");


                app.phonegap.browser = window.open(encodeURI(url), target, options);


                app.phonegap.browser.addEventListener('loadstart', function(event) { 
                    app.debug.write(event.type, event.url);
                    if (event.url.indexOf('systemBrowser') > 0) {
                        // http://stackoverflow.com/questions/16519257/phonegap-inappbrowser-open-ios-safari-browser
                        app.debug.write('vai tentar abrir Safari', event.url);
                        window.open(event.url, '_system');
                    }
                } );
                //app.phonegap.browser.addEventListener('loadstop', function(event) { app.debug.write(event.type,event.url); } );
                app.phonegap.browser.addEventListener('loaderror', function(event) { app.debug.write(event.type, event.url + ' - ' + event.code + ' - ' + event.message); } );
                app.phonegap.browser.addEventListener('exit', function(event) { app.debug.write(event.type, ""); } );

                //if (app.phonegap.navmode.get() == app.phonegap.navmode.types.inapp) {

                    app.phonegap.browser.addEventListener('loadstop', function(event) {

                        if (event.url.match("mobile/mbclose.aspx")) {
                            app.UI.iframe.hide();
                            app.phonegap.browser.close();
                            app.UI.form.url.set("");
                        }
                    });
                //}
            }
        }


    },


    UI : {

        init : function() {

            app.UI.setHeights();
            app.UI.loading.show();
            app.UI.form.config();

        },

        setHeights: function() {

             $(".app-connection").height($(window).height() + 100);
             $(".app-loading").height($(window).height() + 100);
             $(".app-loading-body").css("top", ($(window).height() / 2 - $(".app-loading-body").height() / 2) + "px");
             $(".app-loading-body").css("left", ($(window).width() / 2 - $(".app-loading-body").width() / 2) + "px");

             // ANDROID EMULATOR - OK
             $('body').css('height', ($(window).height()-1) + 'px');
             $('#iframe-main').css('height', ($(window).height()-2) + 'px');

        },

        connection: {

            online: function () {
                app.debug.write("online", "OK");
                $(".app-connection").hide();
            },

            offline: function () {
                app.debug.write("offline", "OK");
                $(".app-connection").show();
            },

        },


        loading: {

            show : function() {

                    $(".app-loading").show();

            },

            hide: function() {

                    $(".app-loading").hide();

            }

        },

        iframe:  {

            show: function(url) {
                app.debug.write("showing iframe", url);

                app.debug.write('$(window).height()', $(window).height());
                app.debug.write('#iframe-main height', $('#iframe-main').css('height'));

                $('.app-iframe iframe').attr("src", url);
                $('.app-iframe').show();
                $('.app-ui').hide();

            },

            hide: function() {
                app.debug.write("hiding iframe", "");
                $('.app-iframe iframe').attr("src", "about:blank");
                $('.app-iframe').hide();
                $('.app-ui').show();

            },

            get: function() {

                return $('.app-iframe iframe')[0];

            }

        },


        form: {

            config: function() {

                $(".btn-go").click(app.UI.form.submit);

                if (DEFAULT_URL !== '' && DEFAULT_URL !== 'SYSTEM_DOMAIN') {
                    $("#orquestra-url").val(DEFAULT_URL);
                }

                $("#orquestra-url").focus(function (e) {
                    var $this = $(this);
                    if ($this.val() === '') {
                        $this.val('http://');
                    }
                });

                $("#orquestra-url").keypress(function (e) {
                    if (e.which === 13) {
                        app.UI.form.submit();
                    }
                });

                if(IS_DEBUG) {
                    $(".nav-type-container").removeClass("hide");
                }

            },

            show: function() {

                app.debug.write("show the form", "ok");

                app.UI.loading.hide();

                $(".app-ui").show();

            },


            url : {

                set: function(v) {
                    app.debug.write("storing url", v);
                    localStorage.orquestraUrl = v;

                },

                get : function() {

                    return localStorage.orquestraUrl && localStorage.orquestraUrl!=null ? localStorage.orquestraUrl : "";

                }

            },

            submit : function() {

                $('.not-found').hide();
                $(".label-input").removeClass("text-error");
                $(".label-input").show();

                var currentUrl = $('#orquestra-url').val();

                app.debug.write('buttonGo_Click curl', currentUrl);

                if (currentUrl !== '' && currentUrl !== "http://" && currentUrl !== "https://") {

                    app.UI.loading.show();

                    app.debug.write('before checkAvailability url', currentUrl);

                    app.orquestra.try(currentUrl);

                    //orquestraApp.checkAvailability(currentUrl, function () { orquestraApp.availabilitySuccess(currentUrl); }, orquestraApp.availabilityError);

                    // depois de 10 segundos tentando encontrar o ambiente deve considerar como erro
                    // e rodar a funcao que trata o erro
                    window.setTimeout(function () {
                        app.debug.write('window.setTimeout', 'FECHOU 5 SEGUNDOS.');
                        if (app.orquestra.istryingtoconnect) {
                            app.orquestra.notfound();
                        }else {
                            app.UI.form.notfound();
                        }
                    }, 10000);

                } else {

                    $(".label-input").addClass("text-error");

                    // passados 7 segundos retira o label de erro e retorna o label original
                    window.setTimeout(function (){
                        app.debug.write('window.setTimeout', 'FECHOU 7 SEGUNDOS.');
                        $(".label-input").removeClass("text-error");
                    }, 7000);
                }

            },

            notfound: function() {

                app.UI.loading.hide();
                $('.label-not-found').show();
                $('.label-input').hide();

                // passados 7 segundos retira o label de erro e retorna o label original
                window.setTimeout(function(){
                    app.debug.write('window.setTimeout', 'FECHOU 7 SEGUNDOS');
                    app.UI.form.searchagain();
                }, 7000);

            },

            searchagain: function() {
                $('.label-not-found').hide();
                $('.label-input').show();
            }

        }
    }

};