
var initCircliful = function () {
    var $circlestat = $('.circlestat');
    if ($circlestat.length > 0) {
        $circlestat.context.circliful();
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

$(function () {
    initCircliful();
    iniWOW();
});