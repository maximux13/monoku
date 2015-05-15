angular.module("app.artist", ['ngResource', 'ngSanitize'])
    .controller("ArtistController",['$scope', '$routeParams', '$sce', 'ArtistService', function($scope, $routeParams, $sce ,ArtistService){
        $scope.artist = ArtistService.get({ artist: $routeParams.name },function(data){
            $scope.artist.artist.bio.summary = $sce.trustAsHtml($scope.artist.artist.bio.summary);
        });

    }])
    .factory('ArtistService', [ '$resource', 'API', function($resource, API){
        return $resource('http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=:artist&api_key=:api_key&format=json',{
            "callback"  : "JSON_CALLBACK",
            "api_key"   : API.key,
            "artist"    : "@artist"
        },{
            get: {
                method: "JSONP"
            }
        });
    }]);
