angular
    .module('ideas', ['firebase'])
    .constant('FIREBASE_URI','https://fiery-torch-3896.firebaseio.com')
    .controller('IdeasController', ['$scope', 'FIREBASE_URI', '$firebaseObject', function($scope, FIREBASE_URI, $firebaseObject) {
        // $scope.items = IdeasService.getIdeas();
             
        var ref = new Firebase(FIREBASE_URI);
        var ideas = $firebaseObject(ref);
        
        
        ideas.$bindTo($scope, 'items');
        
        ideas.$loaded().then(function() {
            console.log('ideas loaded!');
            // console.log(ideas)
            // $scope.ideas['id_4'] = {'title' : 'this is title 4', 'message' : 'this is message 4'}; 
        });
        
        
    }]);
    