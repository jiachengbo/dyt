(function () {
  'use strict';

  angular
    .module('core.services')
    .factory('JoinUsService', JoinUsService);

  JoinUsService.$inject = ['$resource', '$log'];

  function JoinUsService($resource, $log) {
    var joinus = $resource('/api/joinus');
    return joinus;
  }
}());
