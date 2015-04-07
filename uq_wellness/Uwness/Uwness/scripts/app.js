var app = angular.module('main', ['ionic']);
app.controller('mainCtrl', function ($scope, $ionicSideMenuDelegate) {
    $scope.toggleLeftSideMenu = function () {
        $ionicSideMenuDelegate.toggleLeft();
    };
});