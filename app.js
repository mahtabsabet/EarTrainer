var EarTrainerApp = angular.module('EarTrainerApp', ['ngRoute']);
//TODO: routing
EarTrainerApp.config(function($routeProvider){
  $routeProvider
  .when('/', {
    controller: 'ApplicationController',
    templateUrl: 'modules/application/app.html'
  })
  .otherwise({
    redirectTo: '/'
  });
});
