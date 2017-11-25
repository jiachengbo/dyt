(function () {
  'use strict';

  angular
    .module('core.services')
    .factory('partybuildService', partybuildService);

  partybuildService.$inject = ['$resource', '$log'];

  function partybuildService($resource, $log) {
    var partybuild = $resource('/api/partybuildlist');
    return partybuild;
  }
}());
