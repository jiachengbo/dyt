(function () {
  'use strict';

  angular
    .module('core.services')
    .factory('GetKeyWorkService', GetKeyWorkService);

  GetKeyWorkService.$inject = ['$resource', '$log'];

  function GetKeyWorkService($resource, $log) {
    var keyWork = $resource('/api/keywork');
    return keyWork;
  }
}());
