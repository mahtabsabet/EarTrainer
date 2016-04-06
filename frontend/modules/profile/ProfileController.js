angular.module( 'EarTrainerApp')
.controller( 'ProfileController', function ProfileController( $scope, auth, $http, $location, store ) {

  $scope.auth = auth;

});
