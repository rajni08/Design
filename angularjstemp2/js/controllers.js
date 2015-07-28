'use strict';

// Angular Module

var homeng = angular.module('homeng', ['ngCookies', 'ngStorage', '720kb.tooltips', 'ngSanitize', 'ui.bootstrap']);


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
homeng.controller('menucontroller', ['$scope', '$http', '$routeParams', '$cookies', '$cookieStore', '$localStorage', function ($scope, $http, $routeParams, $cookieStore, $localStorage) {


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
homeng.controller('menumodify', ['$scope', function ($scope) {
    $scope.templates =
        [{name: 'horizontal', url: 'partials/menustyle1.html'},
            {name: 'left', url: 'partials/menustyle2.html'}];
    //{ name: 'right', url: 'partials/menustyle3.html'}];
    $scope.template = $scope.templates[0];
}]);

//Home Featured product Controller
homeng.controller('featured', function ($scope, $http, $routeParams) {


    var config = {
        'STORE_LOCATOR_HEADER': 'f487bdb31ea311e59561fb44642aa5bc'
    };

    var feat_url = 'http://23.21.105.180/sm-shop/ecom/v0/featuredproduct/en/f487bdb31ea311e59561fb44642aa5bc?access_token=acc063fa-9df8-4a65-9401-332909d929f1';


    $http.get(feat_url, config).success(function (data, config, status, headers) {
        $scope.featuredpros = data;

        console.log(data);

    }).
        error(function (data, status, headers, config) {
            $scope.featuredpros = 'Something Went Wrong';
        });


    $scope.addProduct = function (prodsku, noofitems) {
        //$scope.code = code;
        $scope.id = prodsku;
        $scope.noofitems = noofitems;
        //$scope.incartproducts = [];

        $scope.dataObj =
        {
            "quantity": $scope.noofitems,
            "productId": $scope.id
        };

        var moredata = angular.toJson($scope.dataObj);

        $http.post('http://23.21.105.180/sm-shop/ecom/v0/cart/add/f487bdb31ea311e59561fb44642aa5bc/en?access_token=acc063fa-9df8-4a65-9401-332909d929f1', moredata, config).success(function (data, config, status, headers) {

            $scope.addingtoCart = data;

        });


    };

    // alert(prodesc_url);

});

homeng.controller('productcontroller', ['$scope', '$http', '$routeParams', '$cookies', '$cookieStore', '$localStorage', function ($scope, $http, $routeParams, $cookieStore, $localStorage) {

    var code = $routeParams.code;

    var config = {
        headers: {'STORE_LOCATOR_HEADER': 'f487bdb31ea311e59561fb44642aa5bc'}
    };


    if (code != 'undefined' || code == '') {

        // alert(code);
        $http.get('http://23.21.105.180/sm-shop/ecom/v0/category/f487bdb31ea311e59561fb44642aa5bc/' + code + '/en?access_token=acc063fa-9df8-4a65-9401-332909d929f1', config).success(function (data, status, headers, config) {
            $scope.categories = data;

        }).
            error(function (data, status, headers, config) {
                $scope.categories = 'Something Went Wrong';
            });
    }

    if (code != 'undefined') {
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
homeng.controller('productdesccontroller', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {


    var pid = $routeParams.id;


    var config = {
        headers: {'STORE_LOCATOR_HEADER': 'f487bdb31ea311e59561fb44642aa5bc'}
    };


    $http.get('http://23.21.105.180/sm-shop/ecom/v0/product/f487bdb31ea311e59561fb44642aa5bc/' + pid + '?access_token=acc063fa-9df8-4a65-9401-332909d929f1', config).success(function (data, config, status, headers) {
        $scope.prodescdata = data;


    }).
        error(function (data, status, headers, config) {
            $scope.prodescdata = 'Something Went Wrong';
        });


    // alert(prodesc_url);

}]);

//Search Controller
homeng.controller('searchccontroller', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
    var config = {
        headers: {'STORE_LOCATOR_HEADER': 'f487bdb31ea311e59561fb44642aa5bc'}
    };
    var pname = $routeParams.pname;


    $scope.keyPress = function (keyCode) {
        var keycode = keyCode;

        $http.get('http://23.21.105.180/sm-shop/ecom/v0/search/f487bdb31ea311e59561fb44642aa5bc/en/autocomplete?access_token=acc063fa-9df8-4a65-9401-332909d929f1&q=' + keycode, config).success(function (data, config, status, headers) {
            $scope.titles = data;

        }).
            error(function (data, status, headers, config) {
                $scope.titles = 'Something Went Wrong';
            });

    };
    $scope.clickitem = function (searchkey) {
        if (searchkey == "") {
            var searchkey = document.getElementById(searchvalue);

        }
        $http.get('http://23.21.105.180/sm-shop/ecom/v0/search/f487bdb31ea311e59561fb44642aa5bc/en/1/5?access_token=acc063fa-9df8-4a65-9401-332909d929f1&q=' + searchkey, config).success(function (data, config, status, headers) {
            $scope.searcheditems = data;


            console.log(data);

        }).
            error(function (data, status, headers, config) {
                $scope.searcheditems = 'Something Went Wrong';
            });

    };

}]);
homeng.controller('searchrescontroller', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
    var config = {
        headers: {'STORE_LOCATOR_HEADER': 'f487bdb31ea311e59561fb44642aa5bc'}
    };


    var pname = $routeParams.pname;
    alert(pname);
    if (pname == "" || pname == null) {
        pname = document.getElementById(searchvalue);
        alert(pname);

    }

    var url = 'http://23.21.105.180/sm-shop/ecom/v0/search/f487bdb31ea311e59561fb44642aa5bc/en/1/5?access_token=acc063fa-9df8-4a65-9401-332909d929f1&q=' + pname;


    $http.get(url, config).success(function (data, config, status, headers) {
        $scope.searched = data.products;
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
    $scope.doRegister = function(){
        var config = {
            headers: {'STORE_LOCATOR_HEADER': 'f487bdb31ea311e59561fb44642aa5bc'}
        };

        $scope.dataInfo=  {

            "emailAddress" : $scope.r_username,
            "billing" : {
                "firstName" : $scope.rb_firstname,
                "lastName" : $scope.rb_lastname,
                "bilstateOther" : $scope.rb_bilstateother,
                "company" : $scope.rb_company,
                "phone" : $scope.rb_phone,
                "address" : $scope.rb_address,
                "city" : $scope.rb_city,
                "postalCode" : $scope.rb_postalCode,
                "stateProvince" : $scope.rb_stateprovince,
                "billingAddress" : $scope.rb_isitbill,
                "zone" : "QC",
                "country" : "CA"
            },
            "delivery" : {
                "firstName" : $scope.rd_firstname,
                "lastName" : $scope.rd_lastname,
                "bilstateOther" : $scope.rd_bilstateother,
                "company" : $scope.rd_company,
                "phone" : $scope.rd_phone,
                "address" : $scope.rd_address,
                "city" : $scope.rd_city,
                "postalCode" : $scope.rd_postcode,
                "stateProvince" : $scope.rd_stateProvince,
                "billingAddress" : $scope.rd_isitbill,
                "zone" : "QC",
                "country" : "CA"
            },
            "gender" : $scope.identify.gender,
            "language" : "en",
            "firstName" : $scope.r_firstname,
            "lastName" : $scope.r_lastname,
            "encodedPassword" : null,
            "clearPassword" : $scope.r_password,
            "storeCode" : null,
            "userName" : $scope.r_username,
            "attributes" : null
        };

       var moredata = angular.toJson($scope.dataInfo);


        $http.post('http://23.21.105.180/sm-shop/ecom/v0/customer?access_token=acc063fa-9df8-4a65-9401-332909d929f1', moredata, config).success(function (data, config, status, headers) {
            console.log(data);
            $scope.registered = data;

            $scope.r_username="";
            //$scope.rb_firstname="";
            //$scope.rb_lastname="";
            //$scope.rb_bilstateother="";
            //$scope.rb_company="";
            //$scope.rb_phone="";
            //$scope.rb_address="";
            //$scope.rb_city="";
            //$scope.rb_postalCode="";
            //$scope.rb_stateprovince="";
            //$scope.rb_isitbill="";
            //
            //$scope.rd_firstname="";
            //$scope.rd_lastname="";
            //$scope.rd_bilstateother="";
            //$scope.rd_company="";
            //$scope.rd_phone="";
            //$scope.rd_address="";
            //$scope.rd_city="";
            //$scope.rd_postcode="";
            //$scope.rd_stateProvince="";
            //$scope.rd_isitbill="";
            //
            //$scope.identify.gender="";
            //$scope.r_firstname="";
            //$scope.r_lastname="";
            //$scope.r_password="";



        });


    }
});
//Login Controller
homeng.controller('checkoutcntr', function ($scope, $http) {

});
//Login Controller
homeng.controller('tabpagecntr', function ($scope, $http) {


});











