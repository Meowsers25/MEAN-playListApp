//code to connect the 2 files (controller.js and index.html)
var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http',
function($scope, $http) {
    console.log("Hello from controller");

//adding refresh function
var refresh = function () {
    $http.get('/contactlist').then(function (response) {
        $scope.contactlist = response.data;
        $scope.contact = {};
        //*
    }, function (error) {
    });

}
    refresh();

       //**define and test addContact function
       $scope.addContact = function() {
        console.log($scope.contact);
        //use .then instead of .success
        $http.post('/contactlist', $scope.contact).then(function(response) {
            console.log(response);
            refresh();
        }, function (error) {

        });
    }
$scope.remove = function(id) {
    console.log(id);
    $http.delete('/contactlist/' + id).then(function(response) {
        refresh();
    }, function (error) {
    });
}

$scope.edit = function(id) {
    console.log(id);
    $http.get('/contactlist/' + id).then(function(response) {
        $scope.contact = response.data;
    },function(error) {
    });
}

$scope.update = function() {
    console.log($scope.contact._id);
    $http.put('/contactlist/' + $scope.contact._id, $scope.contact).then(function(response) {
        console.log(response.data);
        refresh();
    }, function(error) {
    });
}

$scope.clear = function() {
    $scope.contact = {};
}

}]);
