var router = new $.mobile.Router([{
        "#home": {handler: "homePage", events: "bs"},
        "#about(?:[?/](.*))?": {handler: "aboutPage", events: "bs"},
        "#gallery(?:[?/](.*))?(&:[?/](.*))?": {handler: "galleryPage", events: "bs"},
        "#calendar(?:[?/](.*))?(&:[?/](.*))?": {handler: "calendarPage", events: "bs"},
        "#faq": {handler: "faqPage", events: "bs"},
        "#app": {handler: "appPage", events: "bs"},
        "#contact": {handler: "contactPage", events: "bs"},
        "#aboutanusham": {handler: "aboutAnushamPage", events: "bs"},
        "#aboutpradosham": {handler: "aboutPradoshamPage", events: "bs"}
    }], {
    homePage: function (type, match, ui) {
        log('Home page', 3);
        showHome();
    },
    aboutPage: function (type, match, ui) {
        log('About page', 3);
        var params = router.getParams(match[1]);
        var cat = "";
        if (params != null) {
            cat = params.cat;
        }
        showAbout(cat);
    },
    galleryPage: function (type, match, ui) {
        log('Gallery page', 3);
        var params = router.getParams(match[1]);
        var cat = "";
        var sub = "";
        if (params != null && params.cat != null) {
            cat = params.cat;
        }
        if (params != null && params.sub != null) {
            sub = params.sub;
        }
        showGallery(cat, sub);
    },
    calendarPage: function (type, match, ui) {
        log('Calendar page', 3);
        var params = router.getParams(match[1]);
        var cat = "";
        var sub = "";
        if (params != null && params.cat != null) {
            cat = params.cat;
        }
        if (params != null && params.sub != null) {
            sub = params.sub;
        }
        showCalendar(cat, sub);
    },
    faqPage: function (type, match, ui) {
        log('link page', 3);
        showFaq();
    },
    appPage: function (type, match, ui) {
        log('App page', 3);
        showApp();
    },
    contactPage: function (type, match, ui) {
        log('Contact page', 3);
        onlyNum();
    },
    aboutAnushamPage: function (type, match, ui) {
        log('About Anusham page', 3);
        showAboutAnusham();
    },
    aboutPradoshamPage: function (type, match, ui) {
        log('About Anusham page', 3);
        showAboutPradosham();
    }
}, {
    ajaxApp: true,
    defaultHandler: function (type, ui, page) {
        log("Default handler called due to unknown route (" + type + ", " + ui + ", " + page + ")", 1);
    },
    defaultHandlerEvents: "s",
    defaultArgsRe: true
});
document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener("pause", onAppClose, false);
function onDeviceReady() {
    playAudio("/android_asset/www/mp3/Jaya-Jaya-Shankara-Hara-Hara-Shankara.mp3");
    buildNotification();
}
var my_media = null;
var mediaTimer = null;
var repeat_audio = true;
function playAudio(src) {
    repeat_audio = true;
    if (!my_media) {
        my_media = new Media(src, onSuccess, onError, loop);
    }
    my_media.play();
    /* if (mediaTimer === null) {
     mediaTimer = setInterval(function () {
     my_media.getCurrentPosition(
     function (position) {
     if (position > -1) {
     setAudioPosition((position) + " sec");
     }
     },
     function (e) {
     setAudioPosition("Error: " + e);
     }
     );
     }, 1000);
     } */
}

var loop = function (status) {
    if (status === Media.MEDIA_STOPPED && true === repeat_audio) {
        my_media.play();
    }
};
function pauseAudio() {
    if (my_media) {
        my_media.pause();
    }
}

function stopAudio() {
    if (my_media) {
        my_media.stop();
        repeat_audio = false;
    }
// clearInterval(mediaTimer);
    mediaTimer = null;
}

function onSuccess() {
    console.log("playAudio():Audio Success");
}

function onError(error) {
    console.log('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
}

function onAppClose() {
    alert("Jaya Jaya Sankara");
    stopAudio();
}

function setAudioPosition(position) {
// document.getElementById('audio_position').innerHTML = position;
}

function buildNotification() {
    /* for loop add only for future
     * id formate ##YYMMDD - event
     *   10 - Pradosham
     *   20 - Anusham
     *   30 - Others
     *   
     *   date (one day before (10 am) & on the day (6 am)
     *   
     */
    var current = new Date();
    var now = new Date().getTime(),
            _60_seconds_from_now = new Date(now + 60 * 1000);
    /*window.plugin.notification.local.add({
     id: 1,
     title: 'MahaPeriyava',
     message: 'Local Notification test',
     date: current
     });
     
     window.plugin.notification.local.add({
     id: 1,
     title: 'MahaPeriyava 2',
     message: 'Local Notification test 2',
     repeat: 'weekly',
     date: _60_seconds_from_now
     });
     */

    //addNotification(12, current, "Test 1", "This is test msg for Periyava app");
    //addNotification(13, _60_seconds_from_now, "Test 2", "This is test msg for Periyava app");
}

function addNotification(id, dt, ttl, msg) {

    window.plugin.notification.local.add({
        id: id, // A unique id of the notifiction
        date: dt, // This expects a date object
        message: msg, // The message that is displayed
        title: ttl // The title of the message
    });
}

function log(msg, level) {
    var showlog = 3;
    if (typeof (level) === "undefined") {
        level = 3;
    }

    var logname = {0: "Disabled", 1: "Error", 2: "Warning", 3: "Info"};
    if (level <= showlog) {
        console.log(logname[level] + ": " + msg);
    }
}

function showHome() {
    $.getJSON("data/home.json", function (data) {
        $('#home_header').empty();
        $('#home_image').empty();
        $('#home_slogan').empty();
        var img = '<img src="img/' + data['home_image'] + '" alt="Sri Sri Kanji Maha Periyava" align="center" class="homeimg" />';
        var slogan = '<h2 class="align-center">' + data['slogan'] + '</h2>';
        var head = '<h1 class="ui-title" role="heading"><img src="img/' + data['header'].logo + '">  ' + data['header'].name + '</h1>';
        $('#home_header').html(head).enhanceWithin();
        $('#home_image').html(img).enhanceWithin();
        $('#home_slogan').html(slogan).enhanceWithin();
    });
    $.getJSON("data/calendar.json", function (data) {
        var prad = data['main']['one']['content']['2015'];
        var prow;
        var dat;
        $.each(prad, function (index, row) {
            dat = new Date(row.date);
            if (dat >= new Date())
            {
                prow = row;
                return false;
            }
        });
        var praout = '<div><ul data-role="listview"><a href="#calendar?cat=one&sub=2015"><li>Upcoming Pradosham: ' + $.format.date(dat, "dd-MM-yyyy (E)") + '</a></li></ul></div>';
        $("#nextpradosham").html(praout).enhanceWithin();
        var anus = data['main']['two']['content']['2015'];
        var dat;
        $.each(anus, function (index, row) {
            dat = new Date(row.date);
            if (dat >= new Date())
            {
                return false;
            }
        });
        var anushout = '<div><ul data-role="listview"><a href="#calendar?cat=two&sub=2015"><li>Upcoming Anusham: ' + $.format.date(dat, "dd-MM-yyyy (E)") + '</a></li></ul></div>';
        $("#nextanusham").html(anushout).enhanceWithin();
    }).fail(function (e) {
        console.log("Error reading file : " + e.statusText);
    });
}

function showAbout(cat) {
    $('#about_data').empty();
    $('#about_header').empty();
    $.getJSON("data/about.json", function (data) {
        var out = "";
        var head = '<h1 class="ui-title" role="heading"><img src="img/' + data['header'].logo + '" alt="Sri Sri" />  ';
        if (cat === "") {
            $('#back').hide();
            $('#footer').show();
            head = head + data['header'].title + '</h1>';
            out = out + '<div><ul data-role="listview">';
            var sub = data['content'];
            $.each(sub, function (index, row) {
                out = out + '<li><a href="#about?cat=' + index + '">' + row.name + '</a></li>';
            });
            out = out + '</ul></div>';
            $(out).appendTo('#about_data').enhanceWithin();
            $(head).appendTo('#about_header').enhanceWithin();
        } else {
            $('#back').show();
            $('#footer').hide();
            $.get("data/" + data['content'][cat].path, function (content) {
                head = head + data['content'][cat]['name'] + '</h1>';
                $(content).appendTo('#about_data').enhanceWithin();
                $(head).appendTo('#about_header').enhanceWithin();
            });

        }
    }).fail(function (e) {
        console.log("Error reading file : " + e.statusText);
    });
}

function showGallery(cat, sub) {
    $('#gallery_header').empty();
    $.getJSON("data/gallery.json", function (data) {
        var out = "";
        var head = '<h1 class="ui-title" role="heading"><img src="img/' + data['header'].logo + '" alt="Sri Sri" />  ';
        if (cat === "") {
            $("#return").hide();
            $("#bottom").show();
            out = out + '<div><ul data-role="listview">';
            head = head + data['header'].title + '</h1>';
            $.each(data['main'], function (index, row) {
                out = out + '<li><a href="#gallery?cat=' + index + '">' + row.icon + row.option + '</a></li>';
            });
            out = out + '</ul></div>';
            $(head).appendTo('#gallery_header').enhanceWithin();
        } else {
            $('#bottom').hide();
            $('#return').show();
            switch (cat) {
                case 'one':
                {
                    if (sub === "")
                    {
                        out = out + '<div><ul data-role="listview">'
                        var photo = data['main'][cat]['content'];
                        head = head + data['main'][cat].option + '</h1>';
                        $.each(photo, function (index, row) {
                            out = out + '<li><a href="#gallery?cat=' + cat + '&sub=' + index + '">' + row.name + '</a></li>';
                        });
                        out = out + '</ul></div>';
                        $(head).appendTo('#gallery_header').enhanceWithin();
                    }
                    else {
                        var subdata = data['main'][cat]['content'][sub]['source'];
                        head = head + data['main'][cat]['content'][sub].name + '</h1>';
                        $(head).appendTo('#gallery_header').enhanceWithin();
                        $.each(subdata, function (index, row) {
                            var im = '<div class="image"><img src="img/gallery/' + row.src + '" alt="Sri Maha Periyava" /></div>';
                            out = out + im;
                        });
                    }
                    break;
                }
                case 'two':
                {
                    if (sub === "")
                    {
                        out = '<div><ul data-role="listview">'
                        var video = data['main'][cat]['content'];
                        head = head + data['main'][cat].option + '</h1>';
                        $.each(video, function (index, row) {
                            out = out + '<li><a href="#gallery?cat=' + cat + '&sub=' + index + '">' + row.name + '</a></li>';
                        });
                        out = out + '</ul></div>';
                        $(head).appendTo('#gallery_header').enhanceWithin();
                    }
                    else {
                        var subdata = data['main'][cat]['content'][sub]['data'];
                        head = head + data['main'][cat]['content'][sub].name + '</h1>';
                        $.each(subdata, function (index, row) {
                            var vd = '<div class=video><div class=videoWrapper><iframe width=560 height=349 src=http://www.youtube.com/embed/' + row.id + '?rel=0&hd=1" frameborder="0" allowfullscreen></iframe></div><h2>' + row.title + '</h2></div>';
                            out = out + vd;
                        });
                        $(head).appendTo('#gallery_header').enhanceWithin();
                    }
                    break;
                }
                case 'three':
                {
                    var desc = '<p>Here we listed some of useful web sites, facebook and social pages about Sri Sri Maha Periyaya.</p>';
                    if (sub === "") {
                        out = out + desc + '<div><ul data-role="listview">';
                        head = head + data['main'][cat].option + '</h1>';
                        $.each(data['main'][cat]['content'], function (index, row) {
                            out = out + '<li><a href="#gallery?cat=' + cat + '&sub=' + index + '">' + row.name + '</a></li>';
                        });
                        out = out + '</ul></div>';
                        $(head).appendTo('#gallery_header').enhanceWithin();
                    } else if (sub === 'cat3') {
                        var im = '<div data-role="collapsible"><h2>' + data['main'][cat]['content'][sub].name + '</h2><ul data-role="listview" data-theme="a" data-divider-theme="b">';
                        head = head + data['main'][cat]['content'][sub].name + '</h1>';
                        var socdata = data['main'][cat]['content'][sub]['source'];
                        $.each(socdata, function (index, row) {
                            im = im + '<li data-role="list-divider">' + row.subcat + '</li>';
                            var soclink = row['sublink'];
                            $.each(soclink, function (subind, subrow) {
                                im = im + '<li><a href="' + subrow.link + '" target="_blank"><h3>' + subrow.name + '</h3></a></li>';
                            });
                        });
                        out = out + im + '</ul></div>';
                        $(head).appendTo('#gallery_header').enhanceWithin();
                    } else {
                        var im = '<div data-role="collapsible"><h2>' + data['main'][cat]['content'][sub].name + '</h2><ul data-role="listview" data-theme="a" data-divider-theme="b"><li data-role="list-divider">Madam and Organisations</li>';
                        var remdata = data['main'][cat]['content'][sub]['source'];
                        head = head + data['main'][cat]['content'][sub].name + '</h1>';
                        $.each(remdata, function (index, row) {
                            im = im + '<li><a href="' + row.link + '"><h3>' + row.name + '</h3></a></li>';
                        });
                        out = out + im + '</ul></div>';
                        $(head).appendTo('#gallery_header').enhanceWithin();
                    }
                    break;
                }
            }
        }
        $('#gallery_data').empty();
        $(out).appendTo('#gallery_data').enhanceWithin();
    }).fail(function (e) {
        console.log("Error reading file : " + e.statusText);
    });
}

function showCalendar(cat, sub) {
    $('#calendar_header').empty();
    $('#calendar_info').empty();
    $.getJSON("data/calendar.json", function (data) {
        var out = "";
        var head = '<h1 class="ui-title" role="heading"><img src="img/' + data['header'].logo + '" alt="Sri Sri" />  ';
        if (cat === "") {
            $('#bot').show();
            $('#pre').hide();
            $('#info').hide();
            head = head + data['header'].title + '</h1>';
            out = out + '<div><ul data-role="listview">';
            $.each(data['main'], function (index, row) {
                out = out + '<li><a href="#calendar?cat=' + index + '&sub=2015">' + row.icon + row.option + '</a></li>';
            });
            out = out + '</ul></div>';
            $(head).appendTo('#calendar_header').enhanceWithin();
        } else {
            $('#pre').show();
            $('#bot').hide();
            $('#info').show();
            switch (cat) {
                case 'one':
                {
                    out = out + '<div><div data-role="navbar"><ul>';
                    var info = '<a href="#aboutpradosham" data-icon="info" class="ui-link ui-btn-right ui-btn ui-icon-info ui-btn-icon-notext ui-shadow ui-corner-all" data-iconpos="notext">About</a>';
                    $(info).appendTo('#calendar_info').enhanceWithin();
                    head = head + data['main'][cat].option + '</h1>';
                    var cls = "";
                    var i = 1;
                    $.each(data['main'][cat]['content'], function (index, row) {
                        if (index === sub) {
                            cls = "ui-btn-active";
                        } else {
                            cls = "ui-btn";
                        }
                        out = out + '<li><a href="#calendar?cat=' + cat + '&sub=' + index + '" data-ajax="false" class="' + cls + '">' + index + '</a></li>';
                    });
                    out = out + '</ul></div>';
                    out = out + '<p class="align-center"><b>Pradosham Calendar ' + sub + '</b></p>';
                    out = out + '<table data-role="table" data-mode="none" class="calendar" id="pradosham">';
                    out = out + '<thead><tr><th>Date</th><th>Type</th><th>Start</th><th>End</th></tr></thead>';
                    out = out + '<tboady>';
                    $.each(data['main'][cat]['content'][sub], function (index, row) {
                        var ddd = row.date;
                        var now = new Date();
                        var time = now.getTime();
                        var _2_months = (60 * 60 * 24 * 60 * 1000);
                        var nn = ddd.split("-");
                        var dt = new Date(nn[0], parseInt(nn[1]) - 1, parseInt(nn[2]));
                        var tt = dt.getTime();
                        if (now <= dt && i == 1 && tt < (time + _2_months)) {
                            out = out + "<tr class=\"upcoming\"><td>" + $.format.date(dt, "dd-MM-yyyy (E)") + "</td><td>" + row.type + "</td><td>" + row.start + "</td><td>" + row.end + "</td></tr>";
                            i = i + 1;
                        } else {
                            out = out + "<tr><td>" + $.format.date(dt, "dd-MM-yyyy (E)") + "</td><td>" + row.type + "</td><td>" + row.start + "</td><td>" + row.end + "</td></tr>";
                        }
                    });
                    out = out + "</tbody></table></div>";
                    $(head).appendTo('#calendar_header').enhanceWithin();
                    break;
                }
                case "two":
                {
                    var out = '<div><div data-role="navbar"><ul>';
                    var info = '<a href="#aboutanusham" data-icon="info" class="ui-link ui-btn-right ui-btn ui-icon-info ui-btn-icon-notext ui-shadow ui-corner-all" data-iconpos="notext">About</a>';
                    $(info).appendTo('#calendar_info').enhanceWithin();
                    head = head + data['main'][cat].option + '</h1>';
                    var cls = "";
                    var i = 1;
                    $.each(data['main'][cat]['content'], function (index, row) {
                        if (index === sub) {
                            cls = "ui-btn-active";
                        } else {
                            cls = "ui-btn";
                        }
                        out = out + '<li><a href="#calendar?cat=' + cat + '&sub=' + index + '" data-ajax="false" class="' + cls + '">' + index + '</a></li>';
                    });
                    out = out + '</ul></div>';
                    out = out + '<p class="align-center"><b>Anusham Calendar ' + sub + '</b></p>';
                    out = out + '<table data-role="table" data-mode="none" class="calendar">';
                    out = out + '<thead><tr><th>Date</th><th>Day</th></tr></thead>';
                    out = out + '<tboady>';
                    $.each(data['main'][cat]['content'][sub], function (index, row) {
                        var ddd = row.date;
                        var nn = ddd.split("-");
                        var now = new Date();
                        var time = now.getTime();
                        var dt = new Date(nn[0], parseInt(nn[1]) - 1, parseInt(nn[2]));
                        var tt = dt.getTime();
                        var _2_months = (60 * 60 * 24 * 60 * 1000);
                        if (now <= dt && i == 1 && tt < (time + _2_months)) {
                            out = out + "<tr class=\"upcoming\"><td>" + $.format.date(dt, "dd-MM-yyyy") + "</td><td>" + $.format.date(dt, "E") + "</td></tr>";
                            i = i + 1;
                        } else {
                            out = out + "<tr><td>" + $.format.date(dt, "dd-MM-yyyy") + "</td><td>" + $.format.date(dt, "E") + "</td></tr>";
                        }
                    });
                    out = out + "</tbody></table></div>";
                    $(head).appendTo('#calendar_header').enhanceWithin();
                    break;
                }
            }
        }
        $('#calendar_data').empty();
        $(out).appendTo('#calendar_data').enhanceWithin();
    }).fail(function (e) {
        console.log("Error reading file : " + e.statusText);
    });
}

function validForm() {
    var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if ($.trim($("#contact_name").val()).length < 3) {
        alert("Name must be 3 char");
        $("#contact_name").focus();
        return false;
    }
    if (!(re.test($("#contact_email").val()))) {
        alert("Please enter valid email");
        $("#contact_email").focus();
        return false;
    }
    if ($.trim($("#contact_message").val()).length < 20) {
        alert("message at least 20 char");
        $("#contact_message").focus();
        return false;
    }
    return true;
}

function onlyNum() {
    $("#contact_num").keypress(function (e) {
        if (e.which !== 8 && e.which !== 0 && (e.which < 48 || e.which > 57)) {
            $("#err_msg").html("Digits Only").show().fadeOut("slow");
            return false;
        }
    });
}

function receiveForm() {
    if (validForm()) {
        var name = $("#contact_name").val();
        var email = $("#contact_email").val();
        var phone = $("#contact_num").val();
        var message = $("#contact_message").val();
        var data = {"name": name, "email": email, "phone": phone, "message": message};
        $.ajax({
            type: "POST",
            url: "http://www.periyava.org/mail.php",
            data: data,
            cache: false,
            success: function (html) {
                alert(html);
            }
        });
    }
    return false;
}

function clearFields() {

}

function showFaq() {
    $.getJSON("data/faq.json", function (data) {
        var out = "";
        var im = '<div><h2>' + data['faq'].name + '</h2>';
        var socdata = data['faq']['source'];
        $.each(socdata, function (index, row) {
            im = im + '<div data-role="collapsibleset" data-theme="a" data-content-theme="b"><div data-role="collapsible"><h2>' + row.question + '</h2><ul><li style="list-style: none;">' + row.answer + '</li></ul></div></div>';
        });
        out = out + im + '</div>';
        $('#faq_data').empty();
        $(out).appendTo('#faq_data').enhanceWithin();
    }).fail(function (e) {
        console.log("Error reading file : " + e.statusText);
    });
}

function GooglePlusShare() {
    var url = "https://play.google.com/store/apps/details?id=com.coolappz.periyava";
    var fullurl = "https://plus.google.com/share?url=" + url;
    window.open(fullurl, '', "toolbar=0,location=0,height=450,width=550");
}

function FacebookShare() {
    var url = "https://play.google.com/store/apps/details?id=com.coolappz.periyava";
    var fullurl = "http://www.facebook.com/sharer/sharer.php?u=" + url;
    window.open(fullurl, '', "toolbar=0,location=0,height=450,width=650");
}

function TwitterShare() {
    var url = "https://play.google.com/store/apps/details?id=com.coolappz.periyava";
    var ttl = "Maha Periyava App";
    var fullurl = "https://twitter.com/share?original_referer=http://www.charing.com/&source=tweetbutton&text=" + ttl + "&url=" + url;
    window.open(fullurl, '', "menubar=1,resizable=1,width=450,height=350");
}

function rateUs() {
    var fullurl = "https://play.google.com/store/apps/details?id=com.coolappz.periyava";
    window.open(fullurl, '', "menubar=1,resizable=1,width=450,height=350");
}

function showApp() {
    $('#app_data').empty();
    $.get("data/about_app.html", function (data) {
        $(data).appendTo('#app_data').enhanceWithin();
    }).fail(function (e) {
        console.log("Error reading file : " + e.statusText);
    });
}

function showAboutAnusham() {
    $('#aboutanusham_data').empty();
    $.get("data/about_anusham.html", function (content) {
        $(content).appendTo('#aboutanusham_data').enhanceWithin();
    }).fail(function (e) {
        console.log("Error reading file : " + e.statusText);
    });
}

function showAboutPradosham() {
    $('#aboutpradosham_data').empty();
    $.get("data/about_prodasham.html", function (content) {
        $(content).appendTo('#aboutpradosham_data').enhanceWithin();
    }).fail(function (e) {
        console.log("Error reading file : " + e.statusText);
    });
}