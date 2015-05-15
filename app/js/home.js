angular.module("app.home", ['ngResource'])
    .controller("HomeController",['$scope', 'ArtistsService', function($scope, ArtistsService){
        $scope.artist = {};
        $scope.artist.search = "";
        $scope.search = function(){
            $scope.artist.data = ArtistsService.get({ search: $scope.artist.search });
        };

    }])
    .factory('ArtistsService', [ '$resource', 'API', function($resource, API){
        return $resource('http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=:search&api_key=:api_key&format=json',{
            "callback"  : "JSON_CALLBACK",
            "api_key"   : API.key,
            "search"    : "@search"
        },{
            get: {
                method: "JSONP"
            }
        });
    }]);
