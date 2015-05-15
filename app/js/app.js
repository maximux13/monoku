angular.module("app", ['ngRoute','app.home','app.artist'])
    .constant("API",{ "key": "8821d67314138b77e5e66ec1ea5bf51a"})
    .config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when("/",{
                templateUrl : 'home.tpl.html',
                controller  : 'HomeController'
            })
            .when("/:name", {
                templateUrl : 'artist.tpl.html',
                controller  : 'ArtistController'
            })
            .otherwise({
                redirectTo: '/404'
            });
    }]);