'use strict';

// Angular Module

var homeng = angular.module('homeng', ['ngCookies', 'ngStorage']);


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
                templateUrl: 'partials/tabpage.html',
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



//Product Controller


homeng.controller('productcontroller', ['$scope', '$http', '$routeParams', '$cookies', '$cookieStore', '$localStorage',  function ($scope, $http, $routeParams, $cookieStore, $localStorage) {

    var code = $routeParams.code;

    var config = {
        headers: {'STORE_LOCATOR_HEADER': 'f487bdb31ea311e59561fb44642aa5bc'}
    };


    $http.get('http://23.21.105.180/sm-shop/ecom/v0/category/f487bdb31ea311e59561fb44642aa5bc/en?access_token=acc063fa-9df8-4a65-9401-332909d929f1', config).success(function (data, status, headers, config) {
        $scope.menus = data;

    }).
        error(function (data, status, headers, config) {
            $scope.menus = 'Something Went Wrong';
        });

    $http.get('http://23.21.105.180/sm-shop/ecom/v0/category/f487bdb31ea311e59561fb44642aa5bc/'+ code +'/en?access_token=acc063fa-9df8-4a65-9401-332909d929f1', config).success(function (data, status, headers, config) {
        $scope.categories = data;

    }).
        error(function (data, status, headers, config) {
            $scope.categories = 'Something Went Wrong';
        });

   $http.get('http://23.21.105.180/sm-shop/ecom/v0/products/list/f487bdb31ea311e59561fb44642aa5bc/en/'+ code +'?access_token=acc063fa-9df8-4a65-9401-332909d929f1', config).success(function (data, status, headers, config) {
        $scope.itemdatas = data;

    }).
        error(function (data, status, headers, config) {
            $scope.itemdatas = 'Something Went Wrong';
        });


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


        $http.get('http://23.21.105.180/sm-shop/ecom/v0/product/f487bdb31ea311e59561fb44642aa5bc/'+  pid +'?access_token=acc063fa-9df8-4a65-9401-332909d929f1', config).success(function (data, config, status, headers) {
            $scope.prodescdata = data;

        }).
            error(function (data, status, headers, config) {
                $scope.prodescdata = 'Something Went Wrong';
            });

        // alert(prodesc_url);

});



//Login Controller
homeng.controller('logincontroller', function ($scope, $http) {

});
//Login Controller
homeng.controller('checkoutcntr', function ($scope, $http) {

});
//Login Controller
homeng.controller('tabpagecntr', function ($scope, $http) {

});











