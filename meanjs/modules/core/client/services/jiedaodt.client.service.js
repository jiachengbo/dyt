(function () {
  'use strict';

  angular
    .module('core.services')
    .factory('jiedaodtService', jiedaodtService);

  jiedaodtService.$inject = ['$resource', '$log'];
  function jiedaodtService($resource, $log) {
    var jiedaoDT = $resource('/api/jiedaoDT');
    return jiedaoDT;
  }
}());
