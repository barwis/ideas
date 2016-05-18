angular
    .module('ideas', ['firebase'])
    .constant('FIREBASE_URI','https://fiery-torch-3896.firebaseio.com/')
    .controller('IdeasController', ['$scope','FIREBASE_URI', '$firebaseArray', function($scope,  FIREBASE_URI, $firebaseArray) {
        $scope.title = "Ideas..."
        $scope.myIdeas = [];
        
        var ref = new Firebase(FIREBASE_URI);
        
        var list = $firebaseArray(ref);


        $scope.myIdeas = list;


        $scope.save = function(e, id) {
            console.log('saving ', id,  '...');
            console.log(e.target.parentNode.getElementsByClassName('status'));
            var $t = $(e.target.parentNode.getElementsByClassName('status'));
            $t.text('saving...').css('opacity', 1);
            list.$save(id).then(function(ref) {
                console.log('saved!')
                $t.text('done!').delay(200).animate({ opacity: 0}, 500, function() {})
            })
        }

        $scope.remove = function(id) {
            console.log('removing ', id, '...');
            list.$remove(id).then(function(ref) {
                console.log('removed!', ref);
            })
        }

        $scope.add = function() {
            console.log('adding new entry...');
            var newIdea = {
                'title' : '',
                'message' : '',
                'created' : new Date().toISOString().slice(0, 10)
            }
            $scope.myIdeas.$add(newIdea);
        }

    }])
    .directive('setFocus', function(){
      return{
          scope: {setFocus: '='},
          link: function(scope, element){
             if(scope.setFocus) {
                console.log('focus here!', element[0].childNodes[3])
                element[0].childNodes[3].focus();             
                }
          }
      };
    });
    