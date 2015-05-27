var app = angular.module("TrekApp", ['ngRoute', 'ionic', 'ngCordova']);
var storge_pedometer = "pedometer";
var height = 1.70;
var DistanceDivheight = 0.414;

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
        });

});



app.controller('TrekController', function ($scope, $ionicSideMenuDelegate, $cordovaToast) {
    $scope.step = 5214;
    $scope.init = function () {
        $scope.slideHasChanged(0);
        var pedometerStepCount = localStorage.getItem(storge_pedometer);
        if (pedometerStepCount && $scope.isNumeric(pedometerStepCount)) {
            $scope.step = pedometerStepCount;
        }
    }

    $scope.showToastStepCount = function () {
        $cordovaToast.showLongBottom($scope.pedometerStepCount).then(function (success) {
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
                $circlestat.circliful();
                $circlestat.on("click", function () {
                    var $circleText = $(this).find(".circle-text");
                    $scope.step++;
                    $scope.$apply();
                    $circleText.text($scope.step);
                    localStorage.setItem(storge_pedometer, $scope.step);
                    $scope.showToastStepCount();
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
});
