'use strict';

// Angular Module

var homeng = angular.module('homeng', ['ngCookies', 'ngStorage']);


//include Common menu in angular js


homeng.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.

            when('/', {
                templateUrl: 'partials/home.html',
                controller: 'homecontroller'
            }).
            when('/home', {
                templateUrl: 'partials/home.html',
                controller: 'homecontroller'
            }).
            when('/about', {
                templateUrl: 'partials/about.html',
                controller: 'aboutcontroller'
            }).
            when('/login', {
                templateUrl: 'partials/login.html',
                controller: 'logincontroller'
            }).
            when('/search', {
                templateUrl: 'partials/searchpage.html',
                controller: 'searchpagecontroller'
            }).
            otherwise({

                redirectTo: '/'
            });
    }]);

// menu angular controller

//home page controller


homeng.controller('homecontroller', function ($scope, $http) {

    $scope.menus = [
            {menuname: "menu 1",
            path: "home"},

            {menuname: "menu 2",
            path: "about"},

            {menuname: "menu 3",
                path: "search"},

            {menuname: "login",
                path: "login"}
    ];


    var config = {
        headers: {'STORE_LOCATOR_HEADER': 'f487bdb31ea311e59561fb44642aa5bc'}
    };


    $http.get('http://23.21.105.180/sm-shop/ecom/v0/location/states/IN?access_token=acc063fa-9df8-4a65-9401-332909d929f1', config).success(function (data, status, headers, config) {
        $scope.states = data;
    }).
        error(function (data, status, headers, config) {
            $scope.states = 'Something Went Wrong';
        });


    $scope.getstatecode = function () {

        var code = document.getElementById("state").value;

        var get_city_url = 'http://23.21.105.180/sm-shop/ecom/v0/location/states/' + code + '/cities?access_token=acc063fa-9df8-4a65-9401-332909d929f1';


        $http.get(get_city_url, config).success(function (data, status, headers, config) {
            $scope.cities = data;
        });
    };

    $scope.getareacode = function () {

        var mycity = document.getElementById("mycity").value;

        var get_area_url = 'http://23.21.105.180/sm-shop/ecom/v0/location/states/cities/' + mycity + '?access_token=acc063fa-9df8-4a65-9401-332909d929f1';


        $http.get(get_area_url, config).success(function (data, status, headers, config) {
            $scope.areas = data;
        });
    };
});


function slideShowController($scope, $timeout) {
    var slidesInSlideshow = 4;
    var slidesTimeIntervalInMs = 5000;

    $scope.slideshow = 1;
    var slideTimer =
        $timeout(function interval() {
            $scope.slideshow = ($scope.slideshow % slidesInSlideshow) + 1;
            slideTimer = $timeout(interval, slidesTimeIntervalInMs);
        }, slidesTimeIntervalInMs);
}


//Login Controller
homeng.controller('logincontroller', function ($scope, $http) {

});
//Login Controller
homeng.controller('searchpagecontroller', function ($scope, $http) {

});
//Login Controller
homeng.controller('aboutcontroller', function ($scope, $http) {

    var config = {
        headers: {'STORE_LOCATOR_HEADER': 'f487bdb31ea311e59561fb44642aa5bc'}
    };


    $http.get('http://23.21.105.180/sm-shop/ecom/v0/location/states/IN?access_token=acc063fa-9df8-4a65-9401-332909d929f1', config).success(function (data, status, headers, config) {
        $scope.states = data;
    }).
        error(function (data, status, headers, config) {
            $scope.states = 'Something Went Wrong';
        });


    $scope.getstatecode = function () {

        var code = document.getElementById("state").value;

        var get_city_url = 'http://23.21.105.180/sm-shop/ecom/v0/location/states/' + code + '/cities?access_token=acc063fa-9df8-4a65-9401-332909d929f1';


        $http.get(get_city_url, config).success(function (data, status, headers, config) {
            $scope.cities = data;
        });
    };

    $scope.getareacode = function () {

        var mycity = document.getElementById("mycity").value;

        var get_area_url = 'http://23.21.105.180/sm-shop/ecom/v0/location/states/cities/' + mycity + '?access_token=acc063fa-9df8-4a65-9401-332909d929f1';


        $http.get(get_area_url, config).success(function (data, status, headers, config) {
            $scope.areas = data;
        });
    };

});











