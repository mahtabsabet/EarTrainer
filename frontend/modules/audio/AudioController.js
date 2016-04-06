EarTrainerApp
.controller( 'AudioController', function AudioController( $scope, $filter ) {
  console.log('Entering AudioController');
  $scope.options = {
    playlist: ['assets/sound/P4.mp3'],
    loop: true
  };

});
