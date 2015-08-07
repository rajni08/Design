'use strict';

// Angular Module

var homeng = angular.module('homeng', ['ngCookies', 'ngStorage','720kb.tooltips']);


//include Common menu in angular js
homeng.filter('cut', function () {
    return function (value, wordwise, max, tail) {
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace != -1) {
                value = value.substr(0, lastspace);
            }
        }

        return value + (tail || ' …');
    };
});



homeng.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'partials/home.html',
                controller: 'tabpagecntr'
            }).
            when('/products/:code', {
                templateUrl: 'partials/products.html',
                controller: 'productcontroller'
            }).
            when('/login', {
                templateUrl: 'partials/login.html',
                controller: 'logincontroller'
            }).

            when('/products/productdesc/:id', {
                templateUrl: 'partials/productdesc.html',
                controller: 'productdesccontroller'
            }).
            when('/tabpage', {
                templateUrl: 'partials/tabpage.html',
                controller: 'tabpagecntr'
            }).

            when('/checkout', {
                templateUrl: 'partials/checkout.html',
                controller: ''
            }).

            otherwise({

                redirectTo: '/'
            });
    }]);



// menu angular controller
homeng.controller('menucontroller', ['$scope', '$http', '$routeParams', '$cookies', '$cookieStore', '$localStorage',  function ($scope, $http, $routeParams, $cookieStore, $localStorage) {



    var config = {
        headers: {'STORE_LOCATOR_HEADER': 'f487bdb31ea311e59561fb44642aa5bc'}
    };

    $http.get('http://23.21.105.180/sm-shop/ecom/v0/category/f487bdb31ea311e59561fb44642aa5bc/en?access_token=c6516dc4-ade7-484c-aa12-a5072e055f19', config).success(function (data, status, headers, config) {
        $scope.menus = data;

    }).
        error(function (data, status, headers, config) {
            $scope.menus = 'Something Went Wrong';
        });
}]);

//Product Controller
homeng.controller('menumodify', ['$scope', function($scope) {
    $scope.templates =
        [ { name: 'horizontal', url: 'partials/menustyle1.html'},
            { name: 'left', url: 'partials/menustyle2.html'},
            { name: 'right', url: 'partials/menustyle3.html'}];
     $scope.template = $scope.templates[0];
}]);

homeng.controller('productcontroller', ['$scope', '$http', '$routeParams', '$cookies', '$cookieStore', '$localStorage',  function ($scope, $http, $routeParams, $cookieStore, $localStorage) {

    var code = $routeParams.code;

    var config = {
        headers: {'STORE_LOCATOR_HEADER': 'f487bdb31ea311e59561fb44642aa5bc'}
    };



    if(code != 'undefined' || code=='') {

       // alert(code);
    $http.get('http://23.21.105.180/sm-shop/ecom/v0/category/f487bdb31ea311e59561fb44642aa5bc/'+ code +'/en?access_token=c6516dc4-ade7-484c-aa12-a5072e055f19', config).success(function (data, status, headers, config) {
        $scope.categories = data;

    }).
        error(function (data, status, headers, config) {
            $scope.categories = 'Something Went Wrong';
        });
    }

    if(code!='undefined') {
        $http.get('http://23.21.105.180/sm-shop/ecom/v0/products/list/f487bdb31ea311e59561fb44642aa5bc/en/' + code + '?access_token=c6516dc4-ade7-484c-aa12-a5072e055f19', config).success(function (data, status, headers, config) {
            $scope.itemdatas = data;

        }).
            error(function (data, status, headers, config) {
                $scope.itemdatas = 'Something Went Wrong';
            });
    }


    $scope.click = function (name, quantity) {
        var productcarts = [];
        //var productcarts = $cookieStore.get(name);

        $localStorage.message = productcarts.push({
            id: name.id,
            quantity: quantity,
            price: name.price,
            name: name.productname,
            thumb: name.imageUrl,
            category: name.category
        });


        $scope.justons = $localStorage.message;

        console.log(justons);

        //$cookieStore.put(this.name, productcarts);

        //$scope.productcarts.push(name);


        //alert("You selected : " + name.productname + "price" + name.price);
    }


}]);



//Product description Controller
homeng.controller('productdesccontroller', function ($scope, $http, $routeParams) {



        var pid = $routeParams.id;



        var config = {
            headers: {'STORE_LOCATOR_HEADER': 'f487bdb31ea311e59561fb44642aa5bc'}
        };


        $http.get('http://23.21.105.180/sm-shop/ecom/v0/product/f487bdb31ea311e59561fb44642aa5bc/'+  pid +'?access_token=c6516dc4-ade7-484c-aa12-a5072e055f19', config).success(function (data, config, status, headers) {
            $scope.prodescdata = data;

        }).
            error(function (data, status, headers, config) {
                $scope.prodescdata = 'Something Went Wrong';
            });

        // alert(prodesc_url);

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
homeng.controller('checkoutcntr', function ($scope, $http) {

});
//Login Controller
homeng.controller('tabpagecntr', function ($scope, $http) {

});











