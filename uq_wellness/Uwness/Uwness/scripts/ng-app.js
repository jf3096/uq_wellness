var app = angular.module("TrekApp", ['ngRoute', 'ionic', 'ngCordova']);
var storge_pedometer = "pedometer";


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
        });

});
app.controller('TrekController', function ($scope, $ionicSideMenuDelegate, $cordovaToast) {
    $scope.init = function () {
        var pedometerStepCount = localStorage.getItem(storge_pedometer);
        $scope.pedometerStepCount = pedometerStepCount;
        if (pedometerStepCount && $scope.isNumeric(pedometerStepCount)) {
            var $circlestat = $('.circlestat');
            //$circlestat.eq(0).data("text", "1000");
            if ($circlestat.length > 0) {
                var $circleText = $(this).find(".circle-text");
                $circleText.text(pedometerStepCount);
            }
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
            $circlestat.circliful();
            debugger;
            $circlestat.on("click", function () {
                var $circleText = $(this).find(".circle-text");
                $circleText.text((Number($circleText.text()) + 1) + "");

                $scope.showToastStepCount();

            });
        }
    }
    $scope.footerSlide = 1;
    $scope.headerClass = "bg-purple";
    $scope.slideHasChanged = function ($index) {
        if ($index === 0) {
            $scope.headerClass = "bg-purple";
        }
        else if ($index === 1) {
            $scope.headerClass = "footer-blue-bg";
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
});