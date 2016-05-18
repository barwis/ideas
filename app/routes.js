angular
	.module("ideasApp", ['ngRoute', 'ideas'])
    .config(['$routeProvider', function($routeProvider) {
         $routeProvider
            .when('/home', {
                templateUrl: 'app/components/ideas/ideasView.html',
                controller: 'IdeasController',
                controllerAs: 'ideas'
            })
            // .when('/login', {
            //     templateUrl: 'app/components/creator/loginView.html',
            //     controller: 'LoginCtrl',
            //     controllerAs: 'creator'
            // })
            .otherwise({
                redirectTo: '/home'
            });
    }]);