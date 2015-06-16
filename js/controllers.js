'use strict';
// Angular Module

    var homeng=angular.module('homeng',[]);
//include Common menu in angular js

// menu angular controller

    homeng.controller('menungcnt', function($scope,$http){
        $http.get('client/menu.json').success(function(data){
            $scope.mainmenus=data;

        });
    });

//Combo box 1 values

    homeng.controller('combocnt1', function($scope,$http){
        $http.get('client/combo1s.json').success(function(data){
          $scope.combo1s=data;
        });
    });

//Combo box 2 values

homeng.controller('combocnt2', function($scope,$http){
    $http.get('client/combo2s.json').success(function(data){
        $scope.combo2s=data;
    });
});
//Combo box 3 values

homeng.controller('combocnt3', function($scope,$http){
    $http.get('client/combo3s.json').success(function(data){
        $scope.combo3s=data;
    });
});

// configure our routes
homeng.config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : 'index.html',
            controller  : 'cereals'
        })

        // route for the about page
        .when('/about', {
            templateUrl : 'cartpage.html',
            controller  : 'bread'
        })

        // route for the contact page
        .when('/contact', {
            templateUrl : 'pages/contact.html',
            controller  : 'contactController'
        });
});
