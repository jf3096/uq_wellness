var registerUrl = "register.html";

var initCircliful = function () {
    var $circlestat = $('.circlestat');
    if ($circlestat.length > 0) {
        $circlestat.circliful();
        $circlestat.on("click", function () {
        });
    }
};

var iniWOW = function () {
    var $wow = $(".wow");
    if ($wow.length > 0) {
        new WOW().init();
    }
}

//var redirect2Register = function() {
//    $("#register").click(function() {
//        redirect2Url(registerUrl);
//        return false;
//    });
//};

var redirect2Url=function($url) {
    location.href = $url;
}

$(function () {
    initCircliful();
    iniWOW();
    //redirect2Register();
});

