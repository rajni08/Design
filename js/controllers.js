'use strict';
// Angular Module

    var homeng=angular.module('homeng',['ngCookies']);

//include Common menu in angular js


homeng.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.

            when('/', {
                templateUrl: 'includes/home.html',
                controller: 'homecontroller'
            }).
            when('/home', {
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
                controller: 'productcontroller'
            }).
            when('/tabpage', {
                templateUrl: 'includes/tabpage.html',
                controller: 'tabpagecntr'
            }).

            when('/checkout', {
                templateUrl: 'includes/checkout.html',
                controller: ''
            }).

            when('/products/:productdesc', {
                templateUrl: 'includes/productdesc.html',
                controller: ''
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


        $scope.sliders={
            "slider":[{
                "id" : 1,
                "img"    : "http://farm9.staticflickr.com/8042/7918423710_e6dd168d7c_b.jpg",
                "title"  : "Beady little eyes",
                "expert" : "Little birds pitch by my doorstep"
            },

                {
                    "id" : 2,
                    "img"    : "http://farm9.staticflickr.com/8449/7918424278_4835c85e7a_b.jpg",
                    "title"  : "Beady little eyes",
                    "expert" : "Little birds pitch by my doorstep"
                },

                {
                    "id" : 3,
                    "img"    : "http://farm9.staticflickr.com/8457/7918424412_bb641455c7_b.jpg",
                    "title"  : "Beady little eyes",
                    "expert" : "Little birds pitch by my doorstep"
                },

                {
                    "id" : 4,
                    "img"    : "http://farm9.staticflickr.com/8179/7918424842_c79f7e345c_b.jpg",
                    "title"  : "Beady little eyes",
                    "expert" : "Little birds pitch by my doorstep"
                }

            ]}


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

//Product Controller


    homeng.controller('productcontroller',['$scope','$http','$cookies','$cookieStore', function($scope,$http,$cookieStore){

        $http.get('client/product.json').success(function(data){
            $scope.productdata=data;

        });


        $scope.click = function (name,quantity) {
            var productcarts=[];
            //var productcarts = $cookieStore.get(name);



            productcarts.push({
                id          :   name.id,
                quantity    :   quantity,
                price       :   name.price,
                name        :   name.productname,
                thumb       :   name.imageUrl,
                category    :   name.category
            });



            alert(name.productname +" "+ quantity);

            //$cookieStore.put(this.name, productcarts);

            //$scope.productcarts.push(name);


             //alert("You selected : " + name.productname + "price" + name.price);
        }


    }]);




//Login Controller
    homeng.controller('logincontroller', function($scope,$http){

    });
//Login Controller
    homeng.controller('checkoutcntr', function($scope,$http){

    });
//Login Controller
    homeng.controller('tabpagecntr', function($scope,$http){

    });











