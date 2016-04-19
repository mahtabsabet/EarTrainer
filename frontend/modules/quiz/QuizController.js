EarTrainerApp.controller('QuizController', function QuizController ($scope, $http){

  $scope.formData = {};

  $scope.loadQuiz = function(file){
    $http.get(file).success(function(data) {
      $scope.questions = data;
      $scope.getQuestion();
    });
  }

  $scope.start = function() {
    $scope.id = 0;
    $scope.score = 0;
    $scope.quizOver = false;
    $scope.inProgress = true;
    // $scope.form.options.$setPristine();
  }

  $scope.reset = function() {
    $scope.start();
    $scope.getQuestion();
  }

  $scope.getQuestion = function(){
    if ($scope.id < $scope.questions.length) {
      $scope.question = $scope.questions[$scope.id];
      $scope.answerMode = true;
    }
    else{
      $scope.quizOver = true;
    }
  }

  $scope.nextQuestion = function(){
    $scope.id++;
    $scope.getQuestion();
    $scope.formData = {};
  }

  $scope.checkAnswer = function(question){
    correctAnswer = question.options[question.answer];
    givenResponse = $('input[name=answer]:checked').val();
    if (correctAnswer == givenResponse){
      $scope.score++;
      $scope.correctAns = true;
    }
    else{
      $scope.correctAns = false;
    }

    $scope.answerMode = false;
  }

  $scope.start();
  $scope.loadQuiz('/modules/quiz/quizQuestions.js');

});
