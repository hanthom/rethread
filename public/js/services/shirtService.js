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

});