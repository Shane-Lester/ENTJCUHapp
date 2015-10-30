angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})


.controller('TodoListController',["$scope","NoteStore",function($scope,NoteStore){

    
    $scope.notes= NoteStore.list();
    
    $scope.remove = function(noteId){
      NoteStore.remove(noteId);  
    };
    
}])

.controller('EditListController',["$scope", "NoteStore", "$state", "$stateParams", function($scope,NoteStore, $state, $stateParams){
    
    
    var ID=$stateParams.noteId;
    $scope.note = angular.copy(NoteStore.get(ID));
    
    $scope.save =function(){
        NoteStore.update($scope.note);
        $state.go('app.todolist')
    };
    

}])

.controller('AddListController',["$scope", "$state", "NoteStore", function($scope, $state , NoteStore){
    $scope.note = {
        id: new Date().getTime().toString(),
        title: '',
        description: ''
        };
    
    $scope.save =function(){
        NoteStore.create($scope.note);
        $state.go('app.todolist')
    };
}])



.controller('ListController',["$scope", "$http", "$state", "$stateParams", function($scope, $http, $state, $stateParams){
    
    $scope.data={
        hideImage: true,
        showReorder: false
    }
  
    $http.get('js/clinical.json')
        .success(function(data){
            $scope.clinicals=data.clinical;
            $scope.whichCondition=$stateParams.aId;

            $scope.admin=data.admin;


    });
    

}]);


//
//var notes=[];
//
//function getNote(noteId){
//    for (var i=0; i<notes.length; i++){
//        if (notes[i].id === noteId){
//            return notes[i];
//        }
//    }
//    return undefined;
//};
//
//function updateNote(note){
//    for (var i=0; i<notes.length; i++){
//        if (notes[i].id === note.id){
//            notes[i]=note;
//            return;
//        }
//    }
//};
//
//function createNote(note){
//    notes.push(note);
//};