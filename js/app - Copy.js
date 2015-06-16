var sliderApp=angular.module('sliderApp',['ngAnimate']);

sliderApp.controller('SliderController', function($scope) {
    $scope.images=[{src:'http://extremecss.com/demos/slider/img/img2.jpg',title:'Pic 1'},{src:'http://www.extremecss.com/demos/slider/img/img1.png',title:'Pic 2'},{src:'http://www.extremecss.com/demos/slider/img/img4.png',title:'Pic 3'},{src:'http://www.extremecss.com/demos/slider/img/img1.png',title:'Pic 4'},{src:'http://www.extremecss.com/demos/slider/img/img5.png',title:'Pic 5'}];
});
 
sliderApp.directive('slider', function ($timeout) {
  return {
    restrict: 'AE',
	replace: true,
	scope:{
		images: '='
	},
    link: function (scope, elem, attrs) {
	
		scope.currentIndex=0;

		scope.next=function(){
			scope.currentIndex<scope.images.length-1?scope.currentIndex++:scope.currentIndex=0;
		};
		
		scope.prev=function(){
			scope.currentIndex>0?scope.currentIndex--:scope.currentIndex=scope.images.length-1;
		};
		
		scope.$watch('currentIndex',function(){
			scope.images.forEach(function(image){
				image.visible=false;
			});
			scope.images[scope.currentIndex].visible=true;
		});
		
		/* Start: For Automatic slideshow*/
		
		var timer;
		
		var sliderFunc=function(){
			timer=$timeout(function(){
				scope.next();
				timer=$timeout(sliderFunc,5000);
			},5000);
		};
		
		sliderFunc();
		
		scope.$on('$destroy',function(){
			$timeout.cancel(timer);
		});
		
		/* End : For Automatic slideshow*/
		
    },
	templateUrl:'templates/templateurl.html'
  }
});