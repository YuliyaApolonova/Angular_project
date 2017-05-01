/**
 * Created by jull on 30.04.2017.
 */

var myLocalStorage = JSON.parse(localStorage.getItem('AngularProject')) || {};
var app = angular.module('myApp', ['ngRoute', 'smoothScroll', 'scrollSpyModule', 'countUpModule'])
            .config(function ($routeProvider) {
               $routeProvider
                     .when('/', {
                        templateUrl: './Templates/main.html'
                     })
                     //передача параметров через адресную строку
                     .when('/news/:id', {

                        templateUrl: './Templates/new_template.html',
                        controller: 'newModelCtrl'
                     })
                     .otherwise({
                        redirectTo: '/'
                     })
            })

            .controller('homeCtrl', function($scope,smoothScroll){
               $scope.show = function (id) {
                  var element = document.getElementById(id);
                  var options = {
                     offset: 70
                  }
                  smoothScroll(element, options);
               }

            })
            .controller('servicesCtrl', function($scope){
               $scope.services = [
                  {name: 'web design', src: 'images/Icon_2.png', dataClick: 'web-service'},
                  {name: 'graphic design', src: 'images/Icon_1.png', dataClick: 'graphic-service'},
                  {name: 'programming', src: 'images/Icon_0.png', dataClick: 'programming-service'},
                  {name: 'photography', src: 'images/Icon.png', dataClick: 'photography-service'}
               ]
               $scope.displayValue = 'web-service';
               $scope.showServiceInf = function(dataClick){
                  switch (dataClick){
                     case 'web-service':
                        $scope.displayValue = 'web-service';
                        break;
                     case 'graphic-service':
                        $scope.displayValue = 'graphic-service';
                        break;
                     case 'programming-service':
                        $scope.displayValue = 'programming-service';
                        break;
                     case 'photography-service':
                        $scope.displayValue = 'photography-service';
                        break;
                     default:
                        $scope.displayValue = 'web-service';
                  }
               }
            })
            .controller('responsiveCtrl', function($scope, smoothScroll){
               $scope.show = function (id) {
                  var element = document.getElementById(id);
                  var options = {
                     offset: 70
                  }
                  smoothScroll(element, options);
               }
            })
            .directive('aboutUs', function(){
               return{
                  restrict: 'E',
                  templateUrl: './Templates/about_us_template.html',
                  link: function (scope, el, attr) {
//                     console.log('scope', scope);
//                     console.log('el', el);
//                     console.log('attr', attr);
                  }
               }
            })
            .controller('aboutCtrl', function($scope){
               $scope.members = [
                  {name: 'John Doe', speciality: 'Graphic Designer', skills: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do', src: 'images/team1.jpg'},
                  {name: 'Jenny Doe', speciality: 'Web Designer', skills: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do', src: 'images/team1.jpg'},
                  {name: 'Jennifer Doe', speciality: 'Programmer', skills: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do', src: 'images/team1.jpg'},
                  {name: 'Jason Doe', speciality: 'Photographer', skills: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do', src: 'images/team1.jpg'}
               ]
            })
            .controller('portfolioCtrl', function($scope){
               $scope.images = [
                  {category: 'web', src: 'images/WEB.png'},
                  {category: 'graphics', src: 'images/graphics.jpg'},
                  {category: 'photography', src: 'images/photo.png'},
                  {category: 'web', src: 'images/WEB.png'},
                  {category: 'photography', src: 'images/photo.png'},
                  {category: 'graphics', src: 'images/graphics.jpg'},
                  {category: 'photography', src: 'images/photo.png'},
                  {category: 'graphics', src: 'images/graphics.jpg'},
                  {category: 'photography', src: 'images/photo.png'},
                  {category: 'web', src: 'images/WEB.png'},
                  {category: 'graphics', src: 'images/graphics.jpg'},
                  {category: 'web', src: 'images/WEB.png'}
               ]
               $scope.searchValue = 'all';
               $scope.visibleAll = true;
               $scope.setFilter = function(category) {
                  $scope.searchValue = category;
                  if ($scope.searchValue == 'all') {
                     $scope.visibleAll = true;
                  }
                  else {
                     $scope.visibleAll = false;
                  }
               }
               $scope.filterFunc = function (item) {
                  if (item.category === $scope.searchValue) {
                     return item;
                  }
               }
            })
            .controller('newsCtrl', function($scope, $route, $http){
               $scope.monthsList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

               $scope.getNews = function(){
                  $http.get("data.json").success(function (response) {
                     $scope.newsArr = response; //получили массив новостей, из которого можно
                     $scope.newsArr.map(function (newModel) {
                        var parseData = newModel.date.split('/');
                        newModel.day = parseData[1];
                        newModel.month = $scope.monthsList[parseInt(parseData[0])-1];
                        newModel.year = parseData[2];
                     });
                     myLocalStorage.newsArr = $scope.newsArr;
                     localStorage.setItem('AngularProject', JSON.stringify(myLocalStorage));
                  })

               };
               $scope.getNews();
               $scope.newId = $route.current.params.id || 0;


            })
            .controller('newModelCtrl', function ($scope, $route, $http) {
               $scope.monthsList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
               $scope.newId = $route.current.params.id || 0;
               $scope.getNews = function(){
                  $http.get("data.json").success(function (response) {
                     $scope.newsArr = response; //получили массив новостей, из которого можно
                     $scope.newsArr.map(function (newModel) {
                        var parseData = newModel.date.split('/');
                        newModel.day = parseData[1];
                        newModel.month = $scope.monthsList[parseInt(parseData[0])-1];
                        newModel.year = parseData[2];
                     });
                     myLocalStorage.newsArr = $scope.newsArr;
                     localStorage.setItem('AngularProject', JSON.stringify(myLocalStorage));
                  })
               };
               $scope.parseData = parseData;
               if(typeof myLocalStorage.newsArr != 'undefined'){
                  $scope.newsArr = myLocalStorage.newsArr;
                  $scope.parseData();
                  $scope.newModel = $scope.newsArr[$scope.newId] || $scope.newsArr[0];
               }
               else{
                  $scope.getNews();
                  $scope.parseData();
                  $scope.newModel = $scope.newsArr[$scope.newId];
               }
               function parseData(){
                  $scope.parseData = []; //для каждого объекта новым свойством парсдата может быть массив
                  for(var i=0; i<$scope.newsArr.length; i++){
                     $scope.newsArr[i].parseData = $scope.newsArr[i].date.split('/');
                     console.log($scope.newsArr[i].parseData);
                  }
               }
            })
            .controller('contactCtrl', function($scope){
               $scope.mailErr = 'Invalid email!';
               $scope.userNameErr = 'Invalid userName!';
               $scope.messageErr = 'So short message!';
               $scope.mailReg = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]+$/;
               $scope.nameReg = /^[a-zA-Z]+$/;
               $scope.messageReg = /^.{20,}$/;
               $scope.showError = function(err){
                  if (angular.isDefined(err)) {
                     if (err.required) {
                        return 'no data entered!';
                     }
                  }
               }
            })
      .controller('headerCtrl', function($scope, smoothScroll){
         $scope.show = function (id) {
            var element = document.getElementById(id);
            var options = {
               offset: 70
            }
            smoothScroll(element, options);
         }

      })
      .controller('footerCtrl', function($scope, smoothScroll){
         $scope.show = function (id) {
            var element = document.getElementById(id);
            var options = {
               offset: 70
            }
            smoothScroll(element, options);
         }

      })
      .controller('CounterCtrl', function ($scope, $document) {
//          window.odometerOptions = {
//             auto: false, // Don't automatically initialize everything with class 'odometer'
//             selector: '.counter-number', // Change the selector used to automatically find things to be animated
//             format: '(ddd).dd', // Change how digit groups are formatted, and how many digits are shown after the decimal point
//             duration: 3000, // Change how long the javascript expects the CSS animation to take
//             theme: 'default', // Specify the theme (if you have more than one theme css file on the page)
//             animation: 'count' // Count is a simpler animation method which just increments the value,
// // use it when you're looking for something more subtle.
//          };
//          $scope.counters = [
//             {
//                icon: 'briefcase',
//                value: 3054,
//                text: 'Completed Projects'
//             },{
//                icon: 'mouse-pointer',
//                value: 7234873,
//                text: 'Click Pressed'
//             },{
//                icon: 'envelope-o',
//                value: 4670,
//                text: 'Mails Sented & Received'
//             },{
//                icon: 'commenting',
//                value: 939,
//                text: 'Jokes Tolds'
//             }
//          ];

      })