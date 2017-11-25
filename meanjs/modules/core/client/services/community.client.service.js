(function () {
  'use strict';

  angular
    .module('core.services')
    .factory('communityService', communityService);

  communityService.$inject = ['$resource', '$log'];

  function communityService($resource, $log) {
    var community = $resource('/api/community');
    return community;
  }
}());
