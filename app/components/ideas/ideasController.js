angular
    .module('ideas', ['firebase'])
    .constant('FIREBASE_URI','https://fiery-torch-3896.firebaseio.com/')
    .controller('IdeasController', ['$scope','FIREBASE_URI', '$firebaseArray', function($scope,  FIREBASE_URI, $firebaseArray) {
        $scope.title = "Ideas..."
        $scope.myIdeas = [];
        $scope.sortBy = { 'field': 'title', 'ascending': false }
        
        var ref = new Firebase(FIREBASE_URI);
        
        var list = $firebaseArray(ref);


        $scope.myIdeas = list;


        $scope.save = function(e, id) {
            console.log('saving ', id,  '...');
            var $t = $(e.target.parentNode.getElementsByClassName('status'));
            $t.text('saving...').css('opacity', 1);
            list.$save(id).then(function(ref) {
                $t.text('done!').delay(200).animate({ opacity: 0}, 500, function() {})
            })
        }

        $scope.remove = function(id) {
            list.$remove(id).then(function(ref) {
                
            })
        }

        $scope.add = function() {
            var newDate = new Date();
            var newIdea = {
                'title' : '',
                'message' : '',
                'created' : newDate.today() + ", " + newDate.timeNow()
            }
            $scope.myIdeas.$add(newIdea);
        }

        $scope.sort = function(by) {
            if ( by == 'title') {
                $scope.sortBy = { 'field': 'title', 'ascending': false }
            } else {
                $scope.sortBy = { 'fiels': 'created', 'ascending': true }

            }
            console.log(by, $scope.sortBy)
        }

    }])
    .directive('setFocus', function(){
      return{
          scope: {setFocus: '='},
          link: function($scope, element, attrs){
             if($scope.setFocus) {
                if ( $scope.$parent.item.title === '') {
                    element[0].childNodes[3].focus();       
                }      
            }
          }
      };
    })

    .filter('orderObjectBy', function() {
      return function(items, field, reverse) {
        var filtered = [];
        angular.forEach(items, function(item) {
          filtered.push(item);
        });
        filtered.sort(function (a, b) {
          return (a[field] > b[field] ? 1 : -1);
        });
        if(reverse) filtered.reverse();
        return filtered;
      };
    });
    





    // For todays date;
Date.prototype.today = function () { 
    return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
}

// For the time now
Date.prototype.timeNow = function () {
     return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}