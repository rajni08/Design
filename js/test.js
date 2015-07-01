/**
 * Created by user1 on 6/29/2015.
 */

'use strict';

var giftShopApp = angular.module('giftShopApp', []);

giftShopApp.factory('storeFactory', function($http) {
    return {
        getProducts : function(callback) {
            //$http.get('php/db.php?action=products').success(callback);
            $http.post('php/db.php', { 'action' : 'products' }).success(callback);
        },
        getProductCategories: function(callback) {
            $http.post('php/db.php', {'action': 'product_categories'}).success(callback);
        },
        getProductSuppliers: function(callback) {
            $http.post('php/db.php', {'action': 'product_suppliers'}).success(callback);
        },
        addProduct: function(product, callback) {
            $http.post('php/db.php', {'action': 'addProduct', 'params': product}).success(callback);
        },
        updateProduct: function(callback) {
            $http.post('php/db.php', {'action': 'updateProduct'}).success(callback);
        },
    }
});

giftShopApp.factory('cartFactory', function($http) {
    return {
        getCartItems : function(callback) {
            $http.post('php/db.php', {'action' : 'getCartItems' }).success(callback);
        },
        clearItems : function(callback) {
            $http.post('php/db.php', {'action' : 'clearCart' }).success(callback);
        },
        addItemToCart: function(params, callback) {
            $http.post('php/db.php', {'action': 'addItemToCart', 'params' : params}).success(callback);
        }
    }

});

giftShopApp.controller('StoreController', function($scope, storeFactory, cartFactory) {
    storeFactory.getProducts(function(results) {
        $scope.products = results.products;
    });
    $scope.addToCart = function(id, price, qty){
        //TBD: Check stock level on PHP side
        console.info('qty');
        console.log(qty);
        var params = {'product_id': id, 'qty': qty, 'price': price};
        cartFactory.addItemToCart(params, (function(results) {
            //TBD : update the cartController view, how??
            if (results.success) {
                console.log('update cart');
            }
        }));
    };
});

giftShopApp.controller('CartController', function($scope, cartFactory) {
    $scope.cart_total = 0;
    cartFactory.getCartItems(function(results) {
        var items = results.rows;
        var cart_total = 0;
        $scope.total_amount = 0;
        $scope.items = items;
        items.forEach(function(o){
            cart_total += parseInt(o.total_amount,10);
        });
        $scope.cart_total = cart_total;
    });
    //checkout
    //increase qty
    //decrease qty
    $scope.clearItems = function() {
        //$scope.items = [];
    }
});
