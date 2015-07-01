//Product Controller


homeng.controller('productcontroller',['$scope','$http','$cookieStore','$localStorage', function($scope,$http,$cookieStore,$localStorage){

    $http.get('client/product.json').success(function(data){
        $scope.productdata=data;

    });

    var productcarts=[];

    $scope.click = function (name,quantity) {

        //var productcarts = $cookieStore.get(name);



        productcarts.push({
            id          :   name.id,
            quantity    :   quantity,
            price       :   name.price,
            name        :   name.productname,
            thumb       :   name.imageUrl,
            category    :   name.category
        });



        // Setting a cookie
        $cookieStore.put('myFavorite', productcarts);


        //var js=  JSON.stringify(productcarts,null,"    ");
        //
        //  alert(name.productname +" "+ quantity);

        //$cookieStore.put(this.name, productcarts);

        //$scope.productcarts.push(name);

        //alert("You selected : " + name.productname + "price" + name.price);
        var favoriteCookie = $cookieStore.get('myFavorite');


        return favoriteCookie;
    }


}]);