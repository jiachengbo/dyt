(function () {
  'use strict';

  angular
    .module('core.services')
    .factory('partydtService', partydtService);

  partydtService.$inject = ['$resource', '$log'];
  function partydtService($resource, $log) {
    var partyDT = $resource('/api/partyDT');
    return partyDT;
  }
}());
