var app = angular.module("TrekApp", ['ngRoute', 'ionic', 'ngCordova']);
var storge_pedometer = "pedometer";
//assum a person is 1.7m and 60kg 
var height = 1.70; //cm
var weight = 60; //kg
var kcalPerStep = 0.040032025620496396;
var DistanceDivheight = 0.414;

var server_url = "allenps-it.wicp.net:37180";

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'login.html'
        })
        .when('/register', {
            templateUrl: 'register.html'
        })
        .when('/main', {
            templateUrl: 'main.html'
        })
        .when('/walk-path', {
            templateUrl: 'walk-path.html'
        })
        .when('/ribbon', {
            templateUrl: 'ribbon.html'
        })
        .when('/dashboard', {
            templateUrl: 'dashboard.html'
        })
        .when('/moment', {
            templateUrl: 'moment.html'
        })
        .when('/messages', {
            templateUrl: 'messages.html'
        })
        .when('/friends', {
            templateUrl: 'friends.html'
        })
        .when('/my-community', {
            templateUrl: 'my-community.html'
        })
        .when('/profile', {
            templateUrl: 'profile.html'
        })
        .when('/setting', {
            templateUrl: 'setting.html'
        });

});

app.directive('sideMenu', function() {
    return {
        template: 
            '<ion-side-menu side="left" class="sidebar-left"><ion-header-bar ng-class="headerClass"><h1 class="title">UQ Trek</h1></ion-header-bar><ion-content class="sidebar-left-content"><div class="list"><a class="item item-icon-left" href="#/main"><i class="icon ion-ios-home"></i>Home</a><a class="item item-icon-left" href="#/dashboard"><i class="icon ion-podium"></i>Dashboard</a><a class="item item-icon-left" href="#/ribbon"><i class="icon ion-trophy"></i>Ribbons</a><a class="item item-icon-left" href="#/moment"><i class="icon ion-social-instagram"></i>Moments</a><a class="item item-icon-left" href="#/messages"><i class="icon ion-chatbubble-working"></i>Messages</a>  <a class="item item-icon-left" href="#/friends"> <i class="icon ion-android-happy"></i>Friends</a><a class="item item-icon-left" href="#/my-community"><i class="icon ion-android-contacts"></i>Teams</a><a class="item item-icon-left" href="#/profile"><i class="icon ion-android-person"></i>My Profile</a><a class="item item-icon-left" href="#/setting"><i class="icon ion-gear-a"></i>Settings</a><a class="item item-icon-left" ng-click="exitApp();"><i class="icon ion-log-out"></i>Sign Out</a></div></ion-content></ion-side-menu>'
    };
});


app.controller('TrekController', function ($scope, $ionicSideMenuDelegate, $cordovaToast) {
    $scope.step = 0;
    $scope.kCal = 0;

    $scope.init = function () {
        $scope.slideHasChanged(0);
        var pedometerStepCount = localStorage.getItem(storge_pedometer);
        if (pedometerStepCount && $scope.isNumeric(pedometerStepCount)) {
            $scope.step = pedometerStepCount;
        } else {
            $scope.step = 6800;
            localStorage.setItem(storge_pedometer, $scope.step);
        }
        $scope.calulateCal();
    }

    $scope.calulateCal=function() {
        $scope.kCal = ($scope.step * kcalPerStep).toFixed(2);
    }

    $scope.showToastStepCount = function () {
        $cordovaToast.showLongBottom($scope.step).then(function (success) {
        }, function (error) {
        });
    }

    $scope.loadWow = function () {
        var $wow = $(".wow");
        if ($wow.length > 0) {
            new WOW().init();
        }
    }

    $scope.toggleLeftSideMenu = function () {
        $ionicSideMenuDelegate.toggleLeft();
    };

    $scope.initCircliful = function () {
        var $circlestat = $('.circlestat');
        if ($circlestat.length > 0) {
            setTimeout(function () {
                $scope.initPedometerCircle($circlestat.eq(0), 1.0);
                $scope.initCalCircle($circlestat.eq(1), 1.0);
                $circlestat.eq(0).on("click", function () {
                    $scope.step++;
                    $scope.calulateCal();
                    $scope.$apply();

                    $scope.initCalCircle($circlestat.eq(1),0);
                    $scope.initPedometerCircle($(this), 0);

                    localStorage.setItem(storge_pedometer, $scope.step);
//                    $scope.showToastStepCount();
                });
            }, 1);
        }
    }
    $scope.footerSlide = 1;
    $scope.headerClass = "bg-purple";
    $scope.slideHasChanged = function ($index) {
        if ($index === 0) {
            $scope.headerClass = "bg-purple";
        }
        else if ($index === 1) {
            $scope.headerClass = "footer-pink-bg";
        }
        else {
            $scope.headerClass = "bg-purple";
        }
    };

    $scope.isNumeric = function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    $scope.back = function () {
        console.log("back");
        window.history.back();
    }

    $scope.exitApp = function () {
        console.log("exit");
        navigator.app.exitApp();
    }

    $scope.getDistance = function () {
        var distance = $scope.step * height * DistanceDivheight;
        if (distance >= 1000) {
            return (distance / 1000).toFixed(2) + "km";
        }
        return distance.toFixed(0) + "m";
    }

    $scope.$watch('step', function () {
        $scope.distance = $scope.getDistance();
    }, true);

    $scope.postRequest = function (url, json, successCallback) {
        $.post(url, json, successCallback);
    }

    $scope.initPedometerCircle = function ($obj, animationstep) {
        $obj.empty();
        $obj.circliful({
            // These are the defaults.
            startdegree: 0,
            fgcolor: "#A36CC1",
            bgcolor: "#F5F5F5",
            fill: "#F5F5F5",
            width: 30,
            dimension: 330,
            fontsize: 42,
            percent: $scope.step / 12000 * 100,
            animationstep: animationstep,
            iconsize: '20px',
            iconcolor: '#999',
            border: 'default',
            complete: null,
            bordersize: 10
        });
        $obj.data('text', $scope.step);
        $obj.find(".circle-text").text($scope.step);
    }

    $scope.initCalCircle = function ($obj, animationstep) {
        $obj.empty();
        $obj.circliful({
            // These are the defaults.
            startdegree: 0,
            fgcolor: "#FF7392",
            bgcolor: "#F5F5F5",
            fill: "#F5F5F5",
            width: 30,
            dimension: 330,
            fontsize: 42,
            percent: $scope.kCal / 500 * 100,
            animationstep: animationstep,
            iconsize: '20px',
            iconcolor: '#999',
            border: 'default',
            complete: null,
            bordersize: 10
        });
        $obj.data('text', $scope.kCal);
        $obj.find(".circle-text").text($scope.kCal);
    }
});
