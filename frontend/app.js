var EarTrainerApp = angular.module( 'EarTrainerApp', [
  'auth0',
  'ngRoute',
  'EarTrainerApp.home',
  'angular-storage',
  'angular-jwt',
  'ngAudio'
])
.config( function myAppConfig ( $routeProvider, authProvider, $httpProvider, $locationProvider,
  jwtInterceptorProvider) {
  $routeProvider
    .when( '/', {
      controller: 'HomeController',
      templateUrl: 'modules/home/home.html',
      requiresLogin: true
    })
    .when( '/login', {
      controller: 'LoginController',
      templateUrl: 'modules/login/login.html',
      pageTitle: 'Login'
    })
    .when( '/profile', {
      controller: 'ProfileController',
      templateUrl: 'modules/profile/profile.html',
      pageTitle: 'Profile',
      requiresLogin: true
    })
    .when( '/audio', {
      controller: 'AudioController',
      templateUrl: 'modules/audio/audio.html',
      pageTitle: 'Audio',
      requiresLogin: false
    })
    .when('/quiz', {
      controller: 'QuizController',
      templateUrl: 'modules/quiz/quiz.html',
      pageTitle: 'Quiz'
    });



  authProvider.init({
    domain: 'eartrainer.auth0.com',
    clientID: 'Lf4om7Yg6KFgFlZkhxX6N5mHZik4NH85',
    loginUrl: '/login'
  });

  authProvider.on('loginSuccess', function($location, profilePromise, idToken, store) {
    console.log("Login Success");
    profilePromise.then(function(profile) {
      store.set('profile', profile);
      store.set('token', idToken);
    });
    $location.path('/');
  });

  authProvider.on('loginFailure', function() {
    alert("Error");
  });

  authProvider.on('authenticated', function($location) {
    console.log("Authenticated");

  });

  jwtInterceptorProvider.tokenGetter = function(store) {
    return store.get('token');
  }

  // Add a simple interceptor that will fetch all requests and add the jwt token to its authorization header.
  // NOTE: in case you are calling APIs which expect a token signed with a different secret, you might
  // want to check the delegation-token example
  $httpProvider.interceptors.push('jwtInterceptor');
}).run(function($rootScope, auth, store, jwtHelper, $location) {
  $rootScope.$on('$locationChangeStart', function() {

    var token = store.get('token');
    if (token) {
      if (!jwtHelper.isTokenExpired(token)) {
        if (!auth.isAuthenticated) {
          auth.authenticate(store.get('profile'), token);
        }
      } else {
        // Either show the login page or use the refresh token to get a new idToken
        $location.path('/');
      }
    }

  });
})
.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
  $scope.$on('$routeChangeSuccess', function(e, nextRoute){
    if ( nextRoute.$$route && angular.isDefined( nextRoute.$$route.pageTitle ) ) {
      $scope.pageTitle = nextRoute.$$route.pageTitle + ' | Auth0 Sample' ;
    }
  });
});
