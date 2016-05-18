angular
    .module('ideas', ['firebase'])
    .constant('FIREBASE_URI','https://fiery-torch-3896.firebaseio.com/')
    .controller('IdeasController', ['$scope', 'FIREBASE_URI', '$firebaseArray', function($scope, FIREBASE_URI, $firebaseArray) {
        $scope.title = "title"
        $scope.myIdeas = ["asd"];
        
        var ref = new Firebase(FIREBASE_URI);
        
        var list = $firebaseArray(ref);


        $scope.myIdeas = list;


        $scope.save = function(id) {
            console.log('saving ', id,  '...');
            list.$save(id).then(function(ref) {
                console.log('saved!')
            })
        }

        $scope.remove = function(id) {
            console.log('removing ', id, '...');
            list.$remove(id).then(function(ref) {
                console.log('removed!', ref);
            })
        }

    }]);
    