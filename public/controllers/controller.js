var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http',
function($scope, $http) {
  console.log("hello world from controller");
//}]);

var refresh = function() {
$http.get('/playlist').then(function (response) {
  console.log("I got the data I requested");
  $scope.playlist = response.data; //needed to add .data
  $scope.artist = null; //null clears the input boxes
  });
};

refresh();

$scope.addArtist = function() {
  console.log($scope.artist);
  $http.post('/playlist', $scope.artist).then(function (response) {
    console.log(response);
    refresh();
  });
};

$scope.remove = function(id) {
  console.log(id);
  $http.delete('/playlist/' + id).then(function (response) {
    refresh();
  });
};

$scope.edit = function(id) {
  console.log(id);
  $http.get('/playlist/' + id).then(function (response) {
    $scope.artist = response.data;//add .data
  });
};

$scope.update = function() {
  console.log($scope.artist._id);
  $http.put('/playlist/' + $scope.artist._id, $scope.artist).then(function (response) {
    refresh();
  });
};

$scope.deselect = function() {
  $scope.artist = null;
}

}]);
