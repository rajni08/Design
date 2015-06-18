'use strict';
// Angular Module

    var homeng=angular.module('homeng',[]);
//include Common menu in angular js

// menu angular controller

    homeng.controller('menungcnt', function($scope,$http){
        $http.get('client/menu.json').success(function(data){
            $scope.mainmenus=data;
            $scope.links = data.links;

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

