'use strict';
// Angular Module

    var homeng=angular.module('homeng',[]);

//include Common menu in angular js


homeng.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.

            when('/', {
                templateUrl: 'includes/home.html',
                controller: 'homecontroller'
            }).
            when('/products', {
                templateUrl: 'includes/products.html',
                controller: 'productcontroller'
            }).
            when('/login', {
                templateUrl: 'includes/login.html',
                controller: 'logincontroller'
            }).
            when('/search', {
                templateUrl: 'includes/searchpage.html',
                controller: 'search'
            }).
            otherwise({

                redirectTo: '/'
            });
    }]);

// menu angular controller

//home page controller

    homeng.controller('homecontroller', function($scope,$http){
        $http.get('client/menu.json').success(function(data){

            $scope.menus =data;

           });


        $scope.countries = {
            'usa': {
                'San Francisco': ['SOMA', 'Richmond', 'Sunset'],
                'Los Angeles': ['Burbank', 'Hollywood']
            },
            'canada': {
                'People dont live here': ['igloo', 'cave']
            }
        };

        ////Combo box 1 values
        //$http.get('client/combo1s.json').success(function(data){
        //    $scope.combo1s=data;
        //});
        //
        ////Combo box 2 values
        //$http.get('client/combo2s.json').success(function(data){
        //    $scope.combo2s=data;
        //});
        ////Combo box 3 values
        //$http.get('client/combo3s.json').success(function(data){
        //    $scope.combo3s=data;
        //});


    });

//Product Controller

    homeng.controller('productcontroller', function($scope,$http){
        $http.get('client/product.json').success(function(data){
            $scope.productdata=data;


        });
    });

//Login Controller
    homeng.controller('logincontroller', function($scope,$http){

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





