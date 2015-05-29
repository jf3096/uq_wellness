var _url_login = "http://localhost/MvcApplication4/";

var app = angular.module('AdminApp', []);

app.controller('LoginController', function ($scope, loginService) {
    $scope.login = {};

    $scope.loginSubmit = function (isValid) {
        if (isValid) {
            loginService.login($.param($scope.login));
        }
    };
    $scope.isDirtyNotNull = function ($field) {
        return $field.$dirty && $field.$invalid;
    };

    $scope.getClassIfIsDirtyNotNull = function ($field, errClassName) {
        return $scope.isDirtyNotNull($field) ? errClassName : "";
    };
});

app.service("loginService", function ($http, $q) {
    function handleError(response) {
        if (
            !angular.isObject(response.data) ||
            !response.data.message
            ) {
            return ($q.reject("An unknown error occurred."));
        }
        return ($q.reject(response.data.message));
    }

    function handleSuccess(response) {
        return (response.data);
    }

    function login(loginSerizedData) {
        var request = $http({
            method: "post",
            url: _url_login,
            data: loginSerizedData
        });
        return (request.then(handleSuccess, handleError));
    }
    return ({
        login: login
    });
});