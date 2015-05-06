var app = angular.module('main', ['ionic']);
app.controller('mainCtrl', function ($scope, $ionicSideMenuDelegate, $ionicSlideBoxDelegate) {
    $scope.toggleLeftSideMenu = function () {
        $ionicSideMenuDelegate.toggleLeft();
    };

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
});