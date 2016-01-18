var personalWebsite = angular.module('personalDashboard', ['ui.router']);
var apiUrl = 'http://localhost:3000';

personalWebsite.controller('apiCtrl', function ($scope, $http) {
  // get personal info
  // init data
  $scope.loaded = {'me': false, 'music': false, 'walking': false, 'github':false, 'beer':false, 'gaming':false};

  $scope.markLoaded = function(endpoint, success) {
    $scope.loaded[endpoint] = true;
  };

  $scope.date = new Date();

  $http.get(apiUrl + '/v1/').success(function(data) {
    $scope.me = data;
    $scope.me.age = $scope.me.age;
  }).then($scope.markLoaded('me'));

  $http.get(apiUrl + '/v1/music').success(function(data) {
    $scope.song = data.recent[0];
    $scope.music = data;
  }).then($scope.markLoaded('music'));

  // convert decimal to hour
  function formatHour(hoursD) {
    hours = Math.floor(hoursD);
    minutes = hoursD - hours;
    minutes = Math.round(minutes * 60);
    // have to add leading zero for minutes
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    return hours + ":" + minutes;
  }

  function dateDiffInDays(a, b) {
    var _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

  $http.get(apiUrl + '/v1/github').success(function(data) {
    $scope.github = data;
  }).then($scope.markLoaded('github'));

  $http.get(apiUrl + '/v1/beer').success(function(data) {
    $scope.beer = data;
  }).then($scope.markLoaded('beer'));

  $http.get(apiUrl + '/v1/music').success(function(data) {
    $scope.music = data;
  }).then($scope.markLoaded('music'));

  $http.get(apiUrl + '/v1/gaming').success(function(data) {
    $scope.gaming = data;
  }).then($scope.markLoaded('gaming'));

  //$http.get(apiUrl + '/v1/fitness').success(function(data) {
  //  $scope.fitness = data;
  //}).then($scope.markLoaded('fitness'));


});

personalWebsite.config(function($stateProvider, $urlRouterProvider){

  // For any unmatched url, send to /route1
  $urlRouterProvider.otherwise("/")

  $stateProvider
    .state('index', {
      url: "",
      templateUrl: "templates/main.html"
    })
    .state('music', {
      url: "/music",
      templateUrl: "templates/music.html"
      //controller: function($scope){
      //  $scope.items = ["A", "List", "Of", "Items"];
      //}
    });
});
