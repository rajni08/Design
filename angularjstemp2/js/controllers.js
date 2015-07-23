'use strict';

// Angular Module

var homeng = angular.module('homeng', ['ngCookies', 'ngStorage','720kb.tooltips','ngSanitize','ui.bootstrap']);


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
            when('/searchresults/:pname', {
                templateUrl: 'partials/searchpage.html',
                controller: 'searchrescontroller'
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

    $http.get('http://23.21.105.180/sm-shop/ecom/v0/category/f487bdb31ea311e59561fb44642aa5bc/en?access_token=acc063fa-9df8-4a65-9401-332909d929f1', config).success(function (data, status, headers, config) {
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
            { name: 'left', url: 'partials/menustyle2.html'}];
            //{ name: 'right', url: 'partials/menustyle3.html'}];
     $scope.template = $scope.templates[0];
}]);

//Home Featured product Controller
homeng.controller('featured', function ($scope, $http, $routeParams) {


    var config ={
         'STORE_LOCATOR_HEADER': 'f487bdb31ea311e59561fb44642aa5bc'
        };


    $http.get('http://23.21.105.180/sm-shop/ecom/v0/featuredproduct/en/f487bdb31ea311e59561fb44642aa5bc?access_token=acc063fa-9df8-4a65-9401-332909d929f1', config).success(function (data, config, status, headers) {
        $scope.featuredpros = data;

    }).
    error(function (data, status, headers, config) {
        $scope.featuredpros = 'Something Went Wrong';
    });


    $scope.addProduct=function(prodsku,noofitems){
        $scope.prodsku = prodsku;
        $scope.noofitems = noofitems;
        //$scope.incartproducts = [];

        var dataObj = {

            quantity : $scope.noofitems,
            productId : $scope.prodsku

        };

    console.log(dataObj);
        //$http({
        //    url: 'http://23.21.105.180/sm-shop/ecom/v0/cart/add/f487bdb31ea311e59561fb44642aa5bc/en?access_token=acc063fa-9df8-4a65-9401-332909d929f1',
        //    method: "POST",
        //    data: dataObj
        //
        //}).success(function (data) {
        //    $scope.persons = data; // assign  $scope.persons here as promise is resolved here
        //}).error(function (data, status) {
        //    $scope.status = status;
        //});


        $http.post('http://23.21.105.180/sm-shop/ecom/v0/cart/add/f487bdb31ea311e59561fb44642aa5bc/en?access_token=acc063fa-9df8-4a65-9401-332909d929f1',dataObj, config ).success(function (data, config, status, headers) {
        console.log(data);
        $scope.addingtoCart = data;

        }).
            error(function (data, status, headers, config) {
                $scope.addingtoCart = alert('Something Went Wrong'+ JSON.stringify({data: data}));
            });

    };

    // alert(prodesc_url);

});

homeng.controller('productcontroller', ['$scope', '$http', '$routeParams', '$cookies', '$cookieStore', '$localStorage',  function ($scope, $http, $routeParams, $cookieStore, $localStorage) {

    var code = $routeParams.code;

    var config = {
        headers: {'STORE_LOCATOR_HEADER': 'f487bdb31ea311e59561fb44642aa5bc'}
    };



    if(code != 'undefined' || code=='') {

       // alert(code);
    $http.get('http://23.21.105.180/sm-shop/ecom/v0/category/f487bdb31ea311e59561fb44642aa5bc/'+ code +'/en?access_token=acc063fa-9df8-4a65-9401-332909d929f1', config).success(function (data, status, headers, config) {
        $scope.categories = data;

    }).
        error(function (data, status, headers, config) {
            $scope.categories = 'Something Went Wrong';
        });
    }

    if(code!='undefined') {
        $http.get('http://23.21.105.180/sm-shop/ecom/v0/products/list/f487bdb31ea311e59561fb44642aa5bc/en/' + code + '?access_token=acc063fa-9df8-4a65-9401-332909d929f1', config).success(function (data, status, headers, config) {
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
homeng.controller('productdesccontroller',[ '$scope',  '$http', '$routeParams', function ($scope, $http, $routeParams) {



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

}]);

//Search Controller
homeng.controller('searchccontroller',[ '$scope','$http','$routeParams', function ($scope,$http,$routeParams) {
    var config = {
        headers: {'STORE_LOCATOR_HEADER': 'f487bdb31ea311e59561fb44642aa5bc'}
    };
    var pname = $routeParams.pname;


    $scope.keyPress = function(keyCode) {
        var keycode = keyCode;

        $http.get('http://23.21.105.180/sm-shop/ecom/v0/search/f487bdb31ea311e59561fb44642aa5bc/en/autocomplete?access_token=acc063fa-9df8-4a65-9401-332909d929f1&q='+ keycode , config).success(function (data, config, status, headers) {
            $scope.titles = data;


        }).
            error(function (data, status, headers, config) {
                $scope.titles = 'Something Went Wrong';
            });

    };
    $scope.clickitem=function(searchkey){


            $http.get('http://23.21.105.180/sm-shop/ecom/v0/search/f487bdb31ea311e59561fb44642aa5bc/en/1/5?access_token=acc063fa-9df8-4a65-9401-332909d929f1&q='+searchkey, config).success(function (data, config, status, headers) {
                $scope.searcheditems = data;

                alert(data)
                console.log(data);

            }).
                error(function (data, status, headers, config) {
                    $scope.searcheditems = 'Something Went Wrong';
                });

    };

}]);
homeng.controller('searchrescontroller',[ '$scope','$http','$routeParams', function ($scope,$http,$routeParams) {
    var config = {
        headers: {'STORE_LOCATOR_HEADER': 'f487bdb31ea311e59561fb44642aa5bc'}
    };


    var pname = $routeParams.pname;

    alert(pname);



    var url='http://23.21.105.180/sm-shop/ecom/v0/search/f487bdb31ea311e59561fb44642aa5bc/en/1/5?access_token=acc063fa-9df8-4a65-9401-332909d929f1&q='+pname;
        alert(url);

        $http.get(url, config).success(function (data, config, status, headers) {
            $scope.searched = data;
            console.log(data);

        }).
            error(function (data, status, headers, config) {
                $scope.searched = 'Something Went Wrong';
            });


}]);

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











