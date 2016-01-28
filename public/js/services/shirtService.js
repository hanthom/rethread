angular.module('rethread').service('shirtService', function($http, $q){

  this.getShirts = function(){
    var dfd = $q.defer();
    $http({
      method: 'GET',
      url: '/api/shirts'
    }).then(function(result) {
      console.log(result);
      dfd.resolve(result.data);
    });
    return dfd.promise;
  };
  this.getOneShirt = function(id) {
    console.log("Service", id);
    var dfd = $q.defer();
    $http({
      method: 'GET',
      url: '/api/shirt/' + id
    }).then(function(result) {
      console.log(result);
      dfd.resolve(result);
    });
    return dfd.promise;
  };

});